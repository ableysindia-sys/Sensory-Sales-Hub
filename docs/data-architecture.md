# rehab.ableys.in — Data Architecture & Flow Documentation

**Last updated:** March 2026  
**Platform:** B2B headless subdomain (rehab.ableys.in) backed by Shopify store (ableys.in / 2feec0-4.myshopify.com)  
**Stack:** Express.js · Drizzle ORM · PostgreSQL (Replit managed) · React + TanStack Query  

---

## 1. Database Infrastructure & Schema

### 1.1 Infrastructure

| Layer | Technology | Notes |
|---|---|---|
| Database engine | PostgreSQL (managed by Replit) | Single instance, no replicas |
| ORM | Drizzle ORM | Schema defined in `shared/schema.ts` |
| Migrations | `drizzle-kit push` | Schema-push model, no migration files |
| Hosting | Replit container | Prod and dev use **separate** database instances |

### 1.2 All Tables

| Table | Purpose |
|---|---|
| `products` | Main product catalogue — hybrid Shopify + local |
| `categories` | The 9 B2B taxonomy buckets |
| `collections` | Admin-curated custom groupings (local only) |
| `collection_products` | Many-to-many pivot: products ↔ collections |
| `leads` | B2B enquiry form submissions |
| `pages` | CMS pages (About, Policy, etc.) |
| `sample_requests` | Demo kit request submissions with Razorpay payment state |

### 1.3 `products` Table — Full Schema

```
id                serial PRIMARY KEY
slug              text UNIQUE NOT NULL          ← Shopify handle, used as URL key
name              text NOT NULL                 ← Shopify title
category_slug     text NOT NULL                 ← Resolved locally (see §2.3)
short_description text NOT NULL                 ← Extracted from descriptionHtml
long_description  text                          ← Full descriptionHtml from Shopify
base_price        integer NOT NULL              ← First variant price in paise (INR)
compare_price     integer                       ← First variant compareAtPrice
stock             integer                       ← null = unlimited; 0 = out of stock
images            text (JSON array)             ← Shopify CDN URLs
specifications    text (JSON object)            ← From Shopify metafields
features          text (JSON array)             ← From metafields → HTML → tags fallback
applications      text (JSON array)             ← From metafields or need:/product: tags
config_options    text (JSON)                   ← Manual only — multi-variant configurator
shopify_handle    text                          ← Shopify product handle
shopify_url       text                          ← https://ableys.in/products/{handle}
shopify_variants  text (JSON array)             ← All variants with price/SKU/images
default_variant_id text                         ← GID of first variant (for checkout)
product_type      text                          ← Shopify productType field
vendor            text                          ← Shopify vendor
sku               text                          ← First variant SKU
shopify_gid       text                          ← gid://shopify/Product/{numericId}
shopify_updated_at text                         ← ISO timestamp — used by reconciliation
is_active         boolean NOT NULL DEFAULT true ← LOCAL ONLY — controls storefront visibility
b2b_pinned        boolean NOT NULL DEFAULT false← LOCAL ONLY — protects category from sync
created_at        timestamp DEFAULT now()
```

**Field classification:**

| Owned by Shopify (synced on every update) | Owned locally (never overwritten by sync) |
|---|---|
| name, slug, long_description, short_description | is_active |
| base_price, compare_price, stock | b2b_pinned |
| images, specifications, features, applications | config_options |
| shopify_handle, shopify_url, shopify_variants | category_slug (when b2b_pinned = true) |
| default_variant_id, product_type, vendor, sku | All collection mappings |
| shopify_gid, shopify_updated_at | |

### 1.4 `collections` Table

```
id          serial PRIMARY KEY
title       text NOT NULL
slug        text UNIQUE NOT NULL
description text
image_url   text
is_active   boolean NOT NULL DEFAULT true
created_at  timestamp DEFAULT now()
```

> Collections are **entirely local** — they have no relationship to Shopify's native collections. There is no sync or conflict risk.

### 1.5 `collection_products` Pivot Table

```
id             serial PRIMARY KEY
collection_id  integer NOT NULL    ← References collections.id (app-level FK, no DB constraint)
product_id     integer NOT NULL    ← References products.id (app-level FK, no DB constraint)
```

> No DB-level `REFERENCES` constraints exist on this table. Referential integrity is enforced in application code: `deleteProduct()` deletes pivot rows first, and `deleteCollection()` deletes pivot rows first before removing the collection.

### 1.6 `categories` Table

```
id            serial PRIMARY KEY
slug          text UNIQUE NOT NULL   ← "swings", "ballpool", "visual", etc.
title         text NOT NULL
description   text NOT NULL
color         text NOT NULL          ← Tailwind gradient class
image         text                   ← URL or "__generated_category__:{slug}" token
display_order integer DEFAULT 0
is_active     boolean DEFAULT true
```

The 9 fixed categories are seeded at startup and never modified by the sync.

---

## 2. Shopify Synchronization Pipeline

### 2.1 Sync Triggers (Three-Layer Strategy)

| Trigger | Frequency | Description |
|---|---|---|
| **Webhook** | Real-time | Shopify fires on product create/update/delete and inventory change |
| **Periodic sync** | Every 5 minutes | Full re-pull of headless channel, in-process fallback if webhooks fail |
| **Reconciliation** | Every 6 hours | Timestamp comparison; triggers full sync only if drift is detected |

All three ultimately call `syncShopifyProducts()` — a single idempotent function protected by an in-memory `syncLock`.

### 2.2 Initial / Periodic Sync — How Products Are Fetched

```
fetchHeadlessProducts()
  → Shopify Admin GraphQL API
  → Publication filtered to: gid://shopify/Publication/183329587459 (Ableys Headless)
  → Cursor-based pagination: 50 products per page, up to 20 pages (1,000 max)
  → Each page: products(first: 50, after: $cursor) { pageInfo { hasNextPage } edges { cursor node { ... } } }
  → Fetches: id, handle, title, vendor, productType, descriptionHtml, tags, status,
             updatedAt, collections(first:10), images(first:20), variants(first:30)
```

After fetching product nodes, a second Admin API call fetches metafields (specs, features, applications) for all products in one batch, keyed by product handle.

### 2.3 Category Resolution (resolveCategory)

Products on Shopify don't map 1:1 to the 9 B2B categories. The sync resolves category via a three-pass waterfall:

1. **Shopify collection handle lookup** — `SHOPIFY_COLLECTION_TO_CATEGORY` maps ~50 Shopify collection handles to local slugs.
2. **Tag lookup** — `TAG_TO_CATEGORY` maps specific Shopify tags.
3. **Title regex** — `TITLE_CATEGORY_PATTERNS` — 9 regex patterns match product title keywords.
4. **Fallback** — `"adl-kit"` if no match.

If a product has `b2b_pinned = true`, its `category_slug` is preserved regardless of what Shopify says.

### 2.4 Webhook Event Handling

**Route:** `POST /api/webhooks/shopify`

All webhook events share the same handler. The handler:
1. Validates `x-shopify-hmac-sha256` using `crypto.createHmac("sha256", SHOPIFY_CLIENT_SECRET)` against the raw request body.
2. Immediately responds `200 OK` — Shopify gets its acknowledgement before any DB work begins.
3. Schedules `scheduleWebhookSync()` with a 2-second debounce, coalescing rapid bursts into one sync.

**Event actions:**

| Event | Local action |
|---|---|
| `products/create` | `syncShopifyProducts()` runs after debounce; new product inserted with `is_active: false, b2b_pinned: false` |
| `products/update` | Same sync; existing product's Shopify fields updated — `is_active` and `b2b_pinned` are never touched |
| `products/delete` | Same sync; product removed from headless channel is deactivated (`is_active: false, b2b_pinned: false`) |
| `inventory_levels/update` | Same sync; stock field updated via `isAvailable` flag on variant |

> **Note:** There is no hard-delete from the DB on `products/delete`. Products are soft-deactivated. The DB record and all its data are preserved.

### 2.5 Queueing & Timeout Strategy

| Concern | Implementation |
|---|---|
| Shopify 5-second timeout | Resolved: 200 OK returned before any processing |
| Concurrent sync prevention | In-memory `syncLock` boolean; second call queues and runs after first completes |
| Webhook burst coalescing | `webhookSyncTimer` — `clearTimeout` + `setTimeout(2000ms)` on every incoming webhook |
| Infrastructure queue (Redis/Bull) | **Not used** — debounce + in-process lock is the queue mechanism |

### 2.6 Upsert Logic (What Gets Written to DB)

For **existing** products, only these fields are updated by sync:

```
name, category_slug (unless b2b_pinned=true), short_description, long_description,
base_price, compare_price, stock, images, specifications, features, applications,
shopify_handle, shopify_gid, shopify_updated_at, shopify_url,
shopify_variants, default_variant_id, product_type, vendor, sku
```

Fields **never touched** by sync for existing products: `is_active`, `b2b_pinned`, `config_options`, `created_at`.

For **new** products, all fields from Shopify are written, but `is_active` is forced to `false` and `b2b_pinned` to `false`.

### 2.7 Deactivation Rules

A product is deactivated (`is_active: false`, `b2b_pinned: false`) **only** when it is no longer present in the headless publication channel — i.e., it has been unpublished from "Ableys Headless" in Shopify. Being out of stock does **not** deactivate a product.

### 2.8 Reconciliation (6-Hour)

`reconcileProducts()` fetches all headless products and compares `shopify_updated_at` timestamps against DB records. Any product that is missing in DB or has a stale timestamp triggers a full `syncShopifyProducts()`. This catches webhook delivery failures.

---

## 3. Local State Management & Source of Truth

### 3.1 Product Visibility — What Wins

The local `is_active` field is the **sole determinant** of storefront visibility. The decision tree:

```
1. Admin explicitly sets is_active = true in dashboard → product visible
2. Admin sets is_active = false → product hidden (overrides everything)
3. Shopify sync runs → is_active is NOT touched for existing products
4. Product removed from Shopify Headless publication → is_active forced false
```

Shopify's `availableForSale` (stock status) does **not** affect `is_active`. A sold-out product stays visible with an "Enquire" CTA.

### 3.2 Category Override — b2bPinned Flag

When `b2b_pinned = true`:
- The sync preserves the DB's `category_slug` even if Shopify resolves a different category.
- `b2b_pinned` is set by the admin (implicit on manual category change) and protects curatorial decisions.

### 3.3 Local Collections — Full CRUD Flow

Collections are entirely local. They have no Shopify counterpart. Operations:

| Action | Endpoint | DB effect |
|---|---|---|
| Create | `POST /api/admin/collections` | Inserts into `collections` |
| Edit | `PUT /api/admin/collections/:id` | Updates `collections` row |
| Delete | `DELETE /api/admin/collections/:id` | Deletes all `collection_products` rows first, then `collections` row |
| Assign products | `POST /api/admin/collections/:id/products` | Atomic transaction: deletes all existing pivot rows for this collection, inserts new set (deduped, validated) |
| Get product's collections | `GET /api/admin/products/:id/collections` | Returns `collectionIds[]` for a given product |
| Update product's collections | `POST /api/admin/products/:id/collections` | Updates pivot rows across all affected collections |

Shopify sync never reads or writes to `collections` or `collection_products`.

---

## 4. Frontend Data Consumption & Caching

### 4.1 API Layer

The frontend uses REST — no GraphQL on the client side.

| Endpoint | Consumer | Auth |
|---|---|---|
| `GET /api/products` | `ProductsProvider` — all catalogue pages | Public |
| `GET /api/categories` | `ProductsProvider` — navigation | Public |
| `GET /api/products/:slug` | Product detail page | Public, requires `b2b_pinned = true` |
| `GET /api/admin/*` | Admin dashboard | Requires `x-admin-token` header |
| `POST /api/shopify/checkout` | Cart → checkout redirect | Public, rate-limited |

The public `/api/products` endpoint calls `storage.getActiveProducts()` which queries `WHERE is_active = true`. No client-side Shopify state is consulted — the DB is the single source.

### 4.2 Caching Strategy

The frontend uses **TanStack Query v5** for all data fetching. There is no Redis, CDN, or ISR layer.

```typescript
// queryClient default configuration
{
  staleTime: Infinity,          // Data never goes stale on its own
  refetchInterval: false,       // No polling
  refetchOnWindowFocus: false,  // No refetch on tab focus
  retry: false,                 // No automatic retries on error
}
```

**Consequence:** Once data is loaded into the TanStack Query cache, it stays there until the session ends or an explicit `queryClient.invalidateQueries()` call is made. There is no background refresh.

### 4.3 Cache Invalidation — Exact Triggers

| Admin action | Queries invalidated |
|---|---|
| Toggle `is_active` on a product | `["/api/admin/products"]`, `["/api/products"]` |
| Save / update a product | `["/api/admin/products"]`, `["/api/admin/stats"]`, `["/api/products"]` |
| Delete a product | `["/api/admin/products"]`, `["/api/admin/stats"]`, `["/api/products"]` |
| Create / edit / delete a collection | `["/api/admin/collections"]` |
| Assign products to a collection | `["/api/admin/collections"]`, `["/api/admin/collections", id, "products"]` |
| Run manual Shopify sync | All admin queries invalidated; periodic sync does not invalidate frontend cache |

> The public storefront cache (`["/api/products"]`) is only invalidated when an admin explicitly saves or toggles a product. The 5-minute periodic background sync does **not** push cache invalidations to the frontend.

---

## 5. Error Handling, Logging & Known Vulnerabilities

### 5.1 Logging

All server-side logging is `console.log/warn/error` with bracketed namespace prefixes. No structured logging or external log aggregation service (e.g., Datadog, Sentry) is currently configured.

| Prefix | Emitted by | Captures |
|---|---|---|
| `[shopify-sync]` | `syncShopifyProducts()` | Added/updated/deactivated counts, pinned category preservation |
| `[reconcile]` | `reconcileProducts()` | Missing/stale product counts, timestamps |
| `[webhook]` | Webhook route | Topic, product GID/handle, HMAC failures |
| `[shopify-admin]` | Admin API client | Token refresh, API errors |
| `[express]` | Vite/Express | HTTP requests with method, path, status, latency |

HMAC failures log at `warn` level. DB errors surface through Express `500` responses and are caught/logged at `error` level.

### 5.2 Known Bottlenecks & Failure Points

| Scenario | Risk level | Detail |
|---|---|---|
| **Periodic sync doesn't invalidate public cache** | Medium | If sync changes product data (price, images, description), the storefront shows stale data until the admin explicitly toggles/saves the product. Workaround: admin can touch any field on the product to force invalidation. |
| **In-memory syncLock is process-scoped** | Low (single instance) | If the server process restarts mid-sync, the lock resets. In a multi-instance deploy, two servers could run concurrent syncs. Currently a single container deployment so this is not active risk. |
| **No DB-level FK on collection_products** | Low | App code enforces integrity (cleanup before delete), but a direct DB manipulation could create orphans. No cascade constraint in PostgreSQL schema. |
| **staleTime: Infinity on ProductsProvider** | Medium | Frontend `staleTime: 60000` in `ProductsProvider` means products/categories are refreshed every 60 seconds on remount — but this only triggers if the component remounts (e.g., page navigation). Deep linking directly to a category won't poll. |
| **Reconciliation triggers full sync** | Low | If a timestamp mismatch is detected for even one product, a full 150-product sync runs. This is not incremental. At current catalogue size it completes in ~10–15 seconds without issue. |
| **Metafield fetch is separate Admin API call** | Low | If the metafield batch call fails (line ~641), the sync continues with empty metafields and falls back to HTML/tag extraction. The failure is logged at `warn` level and does not abort the sync. |
| **Product visible in DB but not on storefront** | Root causes | `is_active = false` (check admin dashboard), product's `category_slug` doesn't match any active category, or TanStack Query cache hasn't been invalidated since last toggle (force by toggling `is_active` twice). |

### 5.3 Architectural Root Causes of Data Desyncs

Based on the code audit, the three most likely causes of a product existing in the DB but not rendering on the storefront:

1. **`is_active = false`** — Most common. Newly synced products default to hidden. Admin must explicitly activate.

2. **Category mismatch** — A product's `category_slug` resolves to a slug that doesn't exist in the `categories` table, or the category has `is_active = false`. The storefront filters by active categories.

3. **Stale frontend cache** — Admin toggled the product active, but the browser hasn't invalidated `["/api/products"]`. Navigating away and back forces a remount and a re-query if staleTime has elapsed (60s in ProductsProvider).
