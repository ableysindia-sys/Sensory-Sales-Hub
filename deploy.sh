#!/usr/bin/env bash
# deploy.sh — One-shot setup + deploy for Sensory Sales Hub
# Firebase Hosting (frontend) + Cloud Run (backend) + Cloud SQL (PostgreSQL)
#
# Usage:
#   chmod +x deploy.sh
#   ./deploy.sh
#
# Prerequisites:
#   gcloud CLI authenticated:  gcloud auth login
#   Firebase CLI installed:    npm install -g firebase-tools
#   Firebase authenticated:    firebase login

set -euo pipefail

# ── Configuration ──────────────────────────────────────────────────────────────
PROJECT_ID="${GCP_PROJECT_ID:-rehab-ba713}"
REGION="asia-south1"
SERVICE="sensory-sales-hub"
REPO="sensory-sales-hub"
DB_INSTANCE="sensory-sales-hub-db"
DB_NAME="sensory_sales_hub"
DB_USER="appuser"
IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/${SERVICE}"

# ── Helpers ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
info()    { echo -e "${GREEN}[deploy]${NC} $*"; }
warn()    { echo -e "${YELLOW}[warn]${NC}   $*"; }
die()     { echo -e "${RED}[error]${NC}  $*" >&2; exit 1; }

# ── Pre-flight ──────────────────────────────────────────────────────────────────
# PROJECT_ID defaults to rehab-ba713 (the existing Firebase project)
command -v gcloud      &>/dev/null || die "gcloud CLI not found. Install from https://cloud.google.com/sdk"
command -v firebase    &>/dev/null || die "firebase CLI not found. Run: npm install -g firebase-tools"
command -v docker      &>/dev/null || die "docker not found."

info "Project : $PROJECT_ID"
info "Region  : $REGION"
info "Service : $SERVICE"
echo ""

# ── 1. Enable required GCP APIs ────────────────────────────────────────────────
info "Enabling GCP APIs..."
gcloud services enable \
  run.googleapis.com \
  sqladmin.googleapis.com \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  secretmanager.googleapis.com \
  firebase.googleapis.com \
  --project="$PROJECT_ID"

# ── 2. Create Artifact Registry repo ───────────────────────────────────────────
info "Creating Artifact Registry repository..."
gcloud artifacts repositories create "$REPO" \
  --repository-format=docker \
  --location="$REGION" \
  --project="$PROJECT_ID" 2>/dev/null \
  && info "Repository created." \
  || warn "Repository already exists, skipping."

# ── 3. Create Cloud SQL instance + database ────────────────────────────────────
info "Creating Cloud SQL instance (PostgreSQL 16)..."
gcloud sql instances create "$DB_INSTANCE" \
  --database-version=POSTGRES_16 \
  --tier=db-f1-micro \
  --region="$REGION" \
  --project="$PROJECT_ID" \
  --storage-auto-increase \
  --backup \
  --no-deletion-protection 2>/dev/null \
  && info "Cloud SQL instance created." \
  || warn "Cloud SQL instance already exists, skipping."

info "Creating database and user..."
gcloud sql databases create "$DB_NAME" \
  --instance="$DB_INSTANCE" \
  --project="$PROJECT_ID" 2>/dev/null || true

DB_PASSWORD="$(openssl rand -base64 24)"
gcloud sql users create "$DB_USER" \
  --instance="$DB_INSTANCE" \
  --password="$DB_PASSWORD" \
  --project="$PROJECT_ID" 2>/dev/null \
  && info "DB user created. Password: $DB_PASSWORD (save this!)" \
  || warn "DB user already exists — password unchanged. Update DATABASE_URL secret manually if needed."

# Build Cloud SQL connection string (Unix socket format for Cloud Run)
CLOUD_SQL_CONNECTION_NAME="${PROJECT_ID}:${REGION}:${DB_INSTANCE}"
DATABASE_URL="postgres://${DB_USER}:${DB_PASSWORD}@/${DB_NAME}?host=/cloudsql/${CLOUD_SQL_CONNECTION_NAME}"

# ── 4. Store secrets in Secret Manager ────────────────────────────────────────
info "Storing DATABASE_URL in Secret Manager..."
echo -n "$DATABASE_URL" | gcloud secrets create DATABASE_URL \
  --data-file=- \
  --project="$PROJECT_ID" 2>/dev/null \
  || echo -n "$DATABASE_URL" | gcloud secrets versions add DATABASE_URL \
       --data-file=- \
       --project="$PROJECT_ID"

# Prompt for remaining secrets
store_secret() {
  local name="$1" prompt="$2"
  local existing
  existing=$(gcloud secrets list --filter="name:${name}" --format="value(name)" --project="$PROJECT_ID" 2>/dev/null)
  if [[ -n "$existing" ]]; then
    warn "Secret $name already exists. Skipping (update manually if needed)."
    return
  fi
  read -rsp "$prompt: " value; echo ""
  [[ -z "$value" ]] && warn "Skipping empty secret $name." && return
  echo -n "$value" | gcloud secrets create "$name" --data-file=- --project="$PROJECT_ID"
  info "Secret $name stored."
}

echo ""
info "Storing remaining secrets (press Enter to skip any)..."
store_secret ADMIN_PASSWORD        "ADMIN_PASSWORD (admin panel login)"
store_secret GEMINI_API_KEY        "GEMINI_API_KEY"
store_secret SHOPIFY_STORE_DOMAIN  "SHOPIFY_STORE_DOMAIN (e.g. 2feec0-4.myshopify.com)"
store_secret SHOPIFY_STOREFRONT_TOKEN "SHOPIFY_STOREFRONT_TOKEN"
store_secret SHOPIFY_CLIENT_SECRET "SHOPIFY_CLIENT_SECRET"
store_secret RAZORPAY_KEY_ID       "RAZORPAY_KEY_ID"
store_secret RAZORPAY_KEY_SECRET   "RAZORPAY_KEY_SECRET"
store_secret FIREBASE_TOKEN        "FIREBASE_TOKEN (run: firebase login:ci)"

# ── 5. Grant Cloud Run SA access to secrets + Cloud SQL ───────────────────────
info "Configuring IAM permissions..."
PROJECT_NUMBER=$(gcloud projects describe "$PROJECT_ID" --format="value(projectNumber)")
CR_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${CR_SA}" \
  --role="roles/secretmanager.secretAccessor" \
  --quiet

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
  --member="serviceAccount:${CR_SA}" \
  --role="roles/cloudsql.client" \
  --quiet

# ── 6. Build Docker image + push ───────────────────────────────────────────────
info "Building Docker image..."
gcloud auth configure-docker "${REGION}-docker.pkg.dev" --quiet
docker build -t "${IMAGE}:latest" .
docker push "${IMAGE}:latest"

# ── 7. Deploy to Cloud Run ─────────────────────────────────────────────────────
info "Deploying to Cloud Run..."
gcloud run deploy "$SERVICE" \
  --image="${IMAGE}:latest" \
  --region="$REGION" \
  --platform=managed \
  --allow-unauthenticated \
  --add-cloudsql-instances="${CLOUD_SQL_CONNECTION_NAME}" \
  --set-secrets="DATABASE_URL=DATABASE_URL:latest,ADMIN_PASSWORD=ADMIN_PASSWORD:latest,GEMINI_API_KEY=GEMINI_API_KEY:latest,SHOPIFY_STORE_DOMAIN=SHOPIFY_STORE_DOMAIN:latest,SHOPIFY_STOREFRONT_TOKEN=SHOPIFY_STOREFRONT_TOKEN:latest,SHOPIFY_CLIENT_SECRET=SHOPIFY_CLIENT_SECRET:latest,RAZORPAY_KEY_ID=RAZORPAY_KEY_ID:latest,RAZORPAY_KEY_SECRET=RAZORPAY_KEY_SECRET:latest" \
  --min-instances=0 \
  --max-instances=10 \
  --memory=512Mi \
  --cpu=1 \
  --port=8080 \
  --timeout=60 \
  --project="$PROJECT_ID"

# ── 8. Run DB migrations ───────────────────────────────────────────────────────
info "Running DB schema push via Cloud SQL proxy..."
warn "Skipping auto-migration — run manually after installing Cloud SQL Auth Proxy:"
warn "  cloud-sql-proxy ${CLOUD_SQL_CONNECTION_NAME} &"
warn "  DATABASE_URL='postgres://${DB_USER}:<password>@localhost:5432/${DB_NAME}' npm run db:push"

# ── 9. Build frontend + deploy to Firebase Hosting ────────────────────────────
info "Building frontend..."
npm run build

info "Deploying frontend to Firebase Hosting..."
firebase deploy --only hosting --project "$PROJECT_ID"

# ── 10. Wire custom domain ─────────────────────────────────────────────────────
CLOUD_RUN_URL=$(gcloud run services describe "$SERVICE" \
  --region="$REGION" \
  --project="$PROJECT_ID" \
  --format="value(status.url)")

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
info "DEPLOYMENT COMPLETE"
echo ""
echo "  Cloud Run URL   : $CLOUD_RUN_URL"
echo "  Firebase Hosting: https://${PROJECT_ID}.web.app"
echo ""
echo "  To add rehab.ableys.in:"
echo "  1. Firebase Console → Hosting → Add custom domain → rehab.ableys.in"
echo "  2. Add the provided TXT + A records to your DNS"
echo ""
echo "  DB Migration (first time):"
echo "  cloud-sql-proxy ${CLOUD_SQL_CONNECTION_NAME} &"
echo "  DATABASE_URL='${DATABASE_URL}' npm run db:push"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
