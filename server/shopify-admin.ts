const SHOP = "2feec0-4.myshopify.com";
const CLIENT_ID = process.env.SHOPIFY_CLIENT_ID || "5fe3346c671b4ddd7d761e2f6a34b2fd";
const CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET;
const API_VERSION = "2024-10";

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;
let refreshTimer: ReturnType<typeof setTimeout> | null = null;

async function fetchNewToken(): Promise<string> {
  if (!CLIENT_SECRET) throw new Error("SHOPIFY_CLIENT_SECRET is not set");

  const res = await fetch(`https://${SHOP}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  });

  const data = await res.json() as { access_token?: string; expires_in?: number; error?: string };
  if (!data.access_token) throw new Error(`Token fetch failed: ${data.error}`);

  const expiresIn = data.expires_in ?? 86400;
  tokenCache = { token: data.access_token, expiresAt: Date.now() + expiresIn * 1000 };
  console.log(`[shopify-admin] Token refreshed. Expires in ${Math.round(expiresIn / 3600)}h`);

  // Auto-refresh 30 minutes before expiry
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    fetchNewToken().catch(err => console.error("[shopify-admin] Auto-refresh failed:", err));
  }, (expiresIn - 1800) * 1000);

  return data.access_token;
}

export async function getAdminToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.token;
  }
  return fetchNewToken();
}

export async function shopifyAdminFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const token = await getAdminToken();
  return fetch(`https://${SHOP}/admin/api/${API_VERSION}${path}`, {
    ...options,
    headers: {
      "X-Shopify-Access-Token": token,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers ?? {}),
    },
  });
}

export async function shopifyAdminGraphQL(query: string, variables?: Record<string, unknown>) {
  const token = await getAdminToken();
  const res = await fetch(`https://${SHOP}/admin/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });
  return res.json();
}

export async function initShopifyAdmin() {
  if (!CLIENT_SECRET) {
    console.warn("[shopify-admin] SHOPIFY_CLIENT_SECRET not set — Admin API disabled");
    return;
  }
  try {
    await fetchNewToken();
    console.log("[shopify-admin] Admin API ready ✓");
  } catch (err) {
    console.error("[shopify-admin] Failed to initialise:", err);
  }
}
