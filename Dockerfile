# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ── Stage 2: Runtime ──────────────────────────────────────────────────────────
FROM node:24-slim AS runner

WORKDIR /app

# Only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy compiled server + built frontend (fallback static serving)
COPY --from=builder /app/dist ./dist

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "dist/index.cjs"]
