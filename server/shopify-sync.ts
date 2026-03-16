import { db } from "./db";
import { products as productsTable, categories as categoriesTable } from "@shared/schema";
import { eq, isNotNull } from "drizzle-orm";
import { shopifyAdminGraphQL } from "./shopify-admin";

const SHOPIFY_COLLECTION_TO_CATEGORY: Record<string, string> = {
  // Swings (most specific — must win over generic deep-pressure)
  "swings-movement": "swings",
  "movement-swings": "swings",

  // Visual / sensory room
  "sensory-room-equipment": "visual",
  "visual-calming": "visual",

  // Mats / flooring
  "sensory-mats-for-kids": "mats",
  "sensory-mats-flooring": "mats",

  // Movement & balance
  "sensory-active-motor-skill-toys": "movement-balance",
  "balance-coordination": "movement-balance",
  "movement-balance": "movement-balance",
  "the-active-seeker": "movement-balance",
  "constant-movement-seeking": "movement-balance",
  "for-movement-energy": "movement-balance",
  "overactive-restless": "movement-balance",

  // Deep pressure / weighted
  "weighted-sensory-products-for-kids": "deep-pressure",
  "weighted-vests-for-sensory-processing": "deep-pressure",
  "weighted-compression": "deep-pressure",
  "calming-comfort-v2": "deep-pressure",
  "the-focused-calmer": "deep-pressure",
  "the-sleep-transition-support-seeker": "deep-pressure",
  "bedtime-struggles": "deep-pressure",

  // ADL kit / OT tools
  "fidgets-for-sensory-needs": "adl-kit",
  "fidget-boxes-for-sensory-needs": "adl-kit",
  "fidgets-focus-tools": "adl-kit",
  "chew-necklaces": "adl-kit",
  "chewing-oral-needs": "adl-kit",
  "chewing-mouthing": "adl-kit",
  "therapy-putty-for-hand-exercises": "adl-kit",
  "ot-equipments": "adl-kit",
  "ot-equipment": "adl-kit",
  "the-oral-explorer": "adl-kit",
  "the-general-foundational-explorer": "adl-kit",
  "fine-motor-learning": "adl-kit",
  "for-chewing-oral-needs": "adl-kit",
  "for-independence-life-skills": "adl-kit",
  "for-communication-learning": "adl-kit",
  "needs-help-daily-tasks": "adl-kit",
  "clinical-assessment-tools": "adl-kit",
  "classroom-bulk-packs": "adl-kit",
};

// Priority order: most specific physical categories first so they beat generic fallbacks
const CATEGORY_PRIORITY = [
  "swings", "ballpool", "climbing", "mats", "therapy-balls",
  "visual", "deep-pressure", "movement-balance", "adl-kit",
];

export interface ShopifyVariant {
  id: string;
  title: string;
  sku: string;
  availableForSale: boolean;
  price: number;
  compareAtPrice: number | null;
  options: Array<{ name: string; value: string }>;
  image: string | null;
}

interface ShopifyProduct {
  handle: string;
  title: string;
  vendor: string;
  productType: string;
  descriptionHtml: string;
  tags: string[];
  availableForSale: boolean;
  collections: { edges: Array<{ node: { handle: string; title: string } }> };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        sku: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
        compareAtPrice: { amount: string; currencyCode: string } | null;
        selectedOptions: Array<{ name: string; value: string }>;
        image: { url: string; altText: string | null } | null;
      };
    }>;
  };
}

type MetafieldMap = Record<string, string>;

function decodeHtmlEntities(s: string): string {
  return s
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    // strip leftover emoji-text artifacts like 🏫 🧠 ✓ 🎯 at end
    .replace(/\s+[🏫🧠✓🎯✨🎉🌟]\s*$/u, "")
    .trim();
}

function extractFeaturesFromHtml(html: string): string[] {
  const matches: string[] = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let m: RegExpExecArray | null;
  while ((m = liRegex.exec(html)) !== null) {
    const raw = decodeHtmlEntities(m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
    if (raw.length >= 8 && raw.length <= 300) matches.push(raw);
  }
  return matches.slice(0, 12);
}

function formatMetafieldValue(val: string): string | null {
  // Filter out GID references
  if (val.includes("gid://shopify/")) {
    try {
      const arr = JSON.parse(val);
      if (Array.isArray(arr) && arr.every(v => typeof v === "string" && v.includes("gid://"))) return null;
    } catch {}
    if (val.includes("gid://shopify/")) return null;
  }
  // Try to parse JSON for arrays/objects
  try {
    const parsed = JSON.parse(val);
    if (Array.isArray(parsed)) {
      if (parsed.length === 0) return null;
      // Check if it's dimension objects [{value, unit}]
      if (parsed[0] && typeof parsed[0] === "object" && "value" in parsed[0] && "unit" in parsed[0]) {
        return parsed.map((d: { value: number; unit: string }) => `${d.value}${d.unit === "CENTIMETERS" ? "cm" : d.unit === "INCHES" ? "in" : d.unit === "GRAMS" ? "g" : d.unit === "KILOGRAMS" ? "kg" : ` ${d.unit}`}`).join(" × ");
      }
      // Filter GIDs
      const clean = parsed.filter((v: unknown) => typeof v === "string" && !String(v).includes("gid://"));
      if (clean.length === 0) return null;
      return clean.length === 1 ? String(clean[0]) : clean.join(", ");
    }
    if (parsed && typeof parsed === "object" && "value" in parsed && "unit" in parsed) {
      const u = String((parsed as { unit: string }).unit);
      const v = (parsed as { value: number }).value;
      const unitLabel = u === "GRAMS" ? "g" : u === "KILOGRAMS" ? "kg" : u === "CENTIMETERS" ? "cm" : ` ${u}`;
      return `${v}${unitLabel}`;
    }
  } catch {}
  return val.length > 0 ? val : null;
}

function metafieldsToSpecs(mf: MetafieldMap): string | null {
  const SPEC_KEYS = ["custom.specifications", "specs.value", "product.specifications"];
  for (const k of SPEC_KEYS) {
    if (mf[k]) return mf[k];
  }
  const specsObj: Record<string, string> = {};
  const SPEC_KEYWORDS = ["spec", "dimension", "weight", "material", "composition", "size", "capacity"];
  for (const [key, val] of Object.entries(mf)) {
    const keyLower = key.toLowerCase();
    if (SPEC_KEYWORDS.some(kw => keyLower.includes(kw))) {
      const formatted = formatMetafieldValue(val);
      if (formatted) {
        const label = key.split(".").pop()?.replace(/[_\]]/g, " ").trim() || key;
        specsObj[label] = formatted;
      }
    }
  }
  return Object.keys(specsObj).length > 0 ? JSON.stringify(specsObj) : null;
}

function metafieldsToFeatures(mf: MetafieldMap): string[] {
  const FEATURE_KEYS = ["custom.key_features", "custom.features", "custom.key_feature", "product.features", "descriptors.features"];
  for (const k of FEATURE_KEYS) {
    if (mf[k]) {
      try {
        const parsed = JSON.parse(mf[k]);
        if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
      } catch {}
      return mf[k].split(/\n|;|,/).map(s => s.replace(/^[-•*]\s*/, "").trim()).filter(s => s.length > 3);
    }
  }
  return [];
}

function metafieldsToApplications(mf: MetafieldMap): string[] {
  const APP_KEYS = ["custom.suitable_for", "custom.suitable", "custom.who_is_it_for", "product.suitable_for"];
  for (const k of APP_KEYS) {
    if (mf[k]) {
      try {
        const parsed = JSON.parse(mf[k]);
        if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
      } catch {}
      return mf[k].split(/\n|;|,/).map(s => s.trim()).filter(Boolean);
    }
  }
  return [];
}

async function fetchAllAdminMetafields(): Promise<Map<string, MetafieldMap>> {
  const result = new Map<string, MetafieldMap>();
  let cursor: string | null = null;
  let hasNext = true;
  let page = 0;

  while (hasNext && page < 10) {
    page++;
    const afterClause = cursor ? `, after: "${cursor}"` : "";
    const query = `{
      products(first: 50${afterClause}) {
        pageInfo { hasNextPage }
        edges {
          cursor
          node {
            handle
            metafields(first: 30) {
              edges { node { namespace key value type } }
            }
          }
        }
      }
    }`;
    try {
      const data = await shopifyAdminGraphQL(query) as any;
      const edges = data?.data?.products?.edges || [];
      const pageInfo = data?.data?.products?.pageInfo;
      for (const edge of edges) {
        const handle = edge.node.handle as string;
        const mfEdges = edge.node.metafields?.edges || [];
        const mfMap: MetafieldMap = {};
        for (const mfEdge of mfEdges) {
          const { namespace, key, value } = mfEdge.node;
          if (value) mfMap[`${namespace}.${key}`] = value as string;
        }
        if (Object.keys(mfMap).length > 0) result.set(handle, mfMap);
        cursor = edge.cursor as string;
      }
      hasNext = pageInfo?.hasNextPage || false;
    } catch (err) {
      console.warn("[shopify-sync] Admin metafield fetch failed:", err);
      hasNext = false;
    }
  }
  return result;
}

function resolveCategory(product: ShopifyProduct): string {
  // Collect all category matches from the product's collections
  const matched = new Set<string>();
  for (const edge of product.collections.edges) {
    const cat = SHOPIFY_COLLECTION_TO_CATEGORY[edge.node.handle];
    if (cat) matched.add(cat);
  }
  // Return the highest-priority category, so specific physical categories
  // (swings, mats, visual…) win over generic fallbacks (deep-pressure, adl-kit)
  for (const cat of CATEGORY_PRIORITY) {
    if (matched.has(cat)) return cat;
  }
  return "adl-kit";
}

function extractShortDescription(html: string): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const firstSentence = text.match(/^.+?[.!?](?:\s|$)/);
  if (firstSentence && firstSentence[0].length >= 20) {
    return firstSentence[0].trim().slice(0, 200);
  }
  return text.slice(0, 200);
}

function shopifyToDbProduct(sp: ShopifyProduct, metafields: MetafieldMap = {}) {
  const firstVariantNode = sp.variants.edges[0]?.node;
  const basePrice = firstVariantNode ? Math.round(parseFloat(firstVariantNode.price.amount)) : 0;
  const comparePrice = firstVariantNode?.compareAtPrice
    ? Math.round(parseFloat(firstVariantNode.compareAtPrice.amount))
    : null;

  const images = sp.images.edges.map(e => e.node.url);
  const categorySlug = resolveCategory(sp);
  const shortDesc = extractShortDescription(sp.descriptionHtml);

  const shopifyVariants: ShopifyVariant[] = sp.variants.edges.map(e => ({
    id: e.node.id,
    title: e.node.title,
    sku: e.node.sku || "",
    availableForSale: e.node.availableForSale,
    price: Math.round(parseFloat(e.node.price.amount)),
    compareAtPrice: e.node.compareAtPrice
      ? Math.round(parseFloat(e.node.compareAtPrice.amount))
      : null,
    options: e.node.selectedOptions,
    image: e.node.image?.url || null,
  }));

  const isSingleDefaultVariant =
    shopifyVariants.length === 1 &&
    shopifyVariants[0].title === "Default Title";

  // A product is available if Shopify says availableForSale AND at least one variant is available.
  // This ensures OOS products (where Shopify hides them from its storefront) are also hidden here.
  const anyVariantAvailable = shopifyVariants.some(v => v.availableForSale);
  const isAvailable = sp.availableForSale && anyVariantAvailable;

  return {
    slug: sp.handle,
    name: sp.title,
    categorySlug,
    shortDescription: shortDesc,
    longDescription: sp.descriptionHtml,
    basePrice,
    comparePrice,
    stock: isAvailable ? null : 0,
    images: JSON.stringify(images),
    specifications: metafieldsToSpecs(metafields),
    features: (() => {
      const mfFeatures = metafieldsToFeatures(metafields);
      if (mfFeatures.length > 0) return JSON.stringify(mfFeatures);
      const htmlFeatures = extractFeaturesFromHtml(sp.descriptionHtml);
      if (htmlFeatures.length > 0) return JSON.stringify(htmlFeatures);
      return JSON.stringify(sp.tags.filter(t => !t.startsWith("need:") && !t.startsWith("product:")));
    })(),
    applications: (() => {
      const mfApps = metafieldsToApplications(metafields);
      if (mfApps.length > 0) return JSON.stringify(mfApps);
      return JSON.stringify(sp.tags.filter(t => t.startsWith("need:") || t.startsWith("product:")).map(t => t.replace(/^(need:|product:)/, "")));
    })(),
    configOptions: null as string | null,
    shopifyHandle: sp.handle,
    shopifyUrl: `https://www.ableys.in/products/${sp.handle}`,
    shopifyVariants: isSingleDefaultVariant ? null : JSON.stringify(shopifyVariants),
    productType: sp.productType || null,
    vendor: sp.vendor || null,
    sku: firstVariantNode?.sku || null,
    isActive: isAvailable,
  };
}

async function fetchAllShopifyProducts(): Promise<ShopifyProduct[]> {
  const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontToken = process.env.SHOPIFY_STOREFRONT_TOKEN;

  if (!storeDomain || !storefrontToken) {
    console.log("[shopify-sync] Shopify not configured, skipping sync");
    return [];
  }

  const allProducts: ShopifyProduct[] = [];
  let cursor: string | null = null;
  let hasNext = true;

  while (hasNext) {
    const afterClause = cursor ? `, after: "${cursor}"` : "";
    const query = `{
      products(first: 50${afterClause}) {
        pageInfo { hasNextPage }
        edges {
          cursor
          node {
            handle
            title
            vendor
            productType
            descriptionHtml
            tags
            availableForSale
            collections(first: 10) {
              edges { node { handle title } }
            }
            images(first: 20) {
              edges { node { url altText } }
            }
            variants(first: 30) {
              edges {
                node {
                  id
                  title
                  sku
                  availableForSale
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
                  selectedOptions { name value }
                  image { url altText }
                }
              }
            }
          }
        }
      }
    }`;

    const resp = await fetch(`https://${storeDomain}/api/2024-10/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontToken,
      },
      body: JSON.stringify({ query }),
    });

    if (!resp.ok) {
      console.error("[shopify-sync] Shopify API error:", resp.status);
      break;
    }

    const data = await resp.json() as any;
    const edges = data?.data?.products?.edges || [];
    const pageInfo = data?.data?.products?.pageInfo;

    for (const edge of edges) {
      allProducts.push(edge.node);
      cursor = edge.cursor;
    }

    hasNext = pageInfo?.hasNextPage || false;
  }

  return allProducts;
}

export async function syncShopifyProducts(): Promise<{ added: number; updated: number; total: number }> {
  console.log("[shopify-sync] Starting Shopify product sync...");

  const shopifyProducts = await fetchAllShopifyProducts();
  if (shopifyProducts.length === 0) {
    console.log("[shopify-sync] No products fetched from Shopify");
    return { added: 0, updated: 0, total: 0 };
  }

  console.log(`[shopify-sync] Fetched ${shopifyProducts.length} products from Shopify`);

  // Fetch metafields via Admin API (Specifications, Key Features, Suitable For)
  let adminMetafields = new Map<string, MetafieldMap>();
  try {
    adminMetafields = await fetchAllAdminMetafields();
    console.log(`[shopify-sync] Fetched metafields for ${adminMetafields.size} products via Admin API`);
  } catch (err) {
    console.warn("[shopify-sync] Admin metafield fetch skipped:", err);
  }

  let added = 0;
  let updated = 0;

  for (const sp of shopifyProducts) {
    const metafields = adminMetafields.get(sp.handle) || {};
    const dbProduct = shopifyToDbProduct(sp, metafields);

    const [existing] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.slug, dbProduct.slug));

    if (existing) {
      await db
        .update(productsTable)
        .set({
          name: dbProduct.name,
          categorySlug: dbProduct.categorySlug,
          shortDescription: dbProduct.shortDescription,
          longDescription: dbProduct.longDescription,
          basePrice: dbProduct.basePrice,
          comparePrice: dbProduct.comparePrice,
          stock: dbProduct.stock,
          images: dbProduct.images,
          specifications: dbProduct.specifications,
          features: dbProduct.features,
          applications: dbProduct.applications,
          shopifyHandle: dbProduct.shopifyHandle,
          shopifyUrl: dbProduct.shopifyUrl,
          shopifyVariants: dbProduct.shopifyVariants,
          productType: dbProduct.productType,
          vendor: dbProduct.vendor,
          sku: dbProduct.sku,
          isActive: dbProduct.isActive, // Respect Shopify availability — OOS products become inactive
        })
        .where(eq(productsTable.slug, dbProduct.slug));
      if (!dbProduct.isActive) {
        console.log(`[shopify-sync] Deactivated OOS product: ${dbProduct.slug} (availableForSale=false on Shopify)`);
      }
      updated++;
    } else {
      await db.insert(productsTable).values(dbProduct);
      added++;
    }
  }

  const existingCategories = await db.select().from(categoriesTable);
  const existingSlugs = new Set(existingCategories.map(c => c.slug));

  const neededCategories = new Set(shopifyProducts.map(sp => resolveCategory(sp)));
  for (const slug of neededCategories) {
    if (!existingSlugs.has(slug)) {
      console.log(`[shopify-sync] Category "${slug}" needed but not found in DB — products will use it anyway`);
    }
  }

  // Enforce Shopify as single source of truth:
  // Products not in Shopify (unpublished / seeded catalogue) → deactivated.
  // Products in Shopify but OOS (availableForSale=false) → deactivated (already handled in update loop above).
  // Products that were OOS and are now back in stock → reactivated only if Shopify says available.
  const shopifyAvailability = new Map(
    shopifyProducts.map(sp => {
      const anyVariantAvailable = sp.variants.edges.some(e => e.node.availableForSale);
      return [sp.handle, sp.availableForSale && anyVariantAvailable] as [string, boolean];
    })
  );
  const allDbProducts = await db
    .select({ slug: productsTable.slug, shopifyHandle: productsTable.shopifyHandle, isActive: productsTable.isActive })
    .from(productsTable);

  let deactivated = 0;
  let reactivated = 0;
  for (const dbProd of allDbProducts) {
    const shopifyIsAvailable = dbProd.shopifyHandle ? shopifyAvailability.get(dbProd.shopifyHandle) : undefined;
    // undefined = not in Shopify at all (unpublished or seeded product with no Shopify handle)
    const shouldBeActive = shopifyIsAvailable === true;
    const shouldBeInactive = shopifyIsAvailable === false || shopifyIsAvailable === undefined;

    if (shouldBeInactive && dbProd.isActive) {
      await db
        .update(productsTable)
        .set({ isActive: false })
        .where(eq(productsTable.slug, dbProd.slug));
      deactivated++;
      const reason = shopifyIsAvailable === false ? "out of stock on Shopify" : "not published on Shopify";
      console.log(`[shopify-sync] Deactivated ${dbProd.slug}: ${reason}`);
    } else if (shouldBeActive && !dbProd.isActive) {
      await db
        .update(productsTable)
        .set({ isActive: true })
        .where(eq(productsTable.slug, dbProd.slug));
      reactivated++;
      console.log(`[shopify-sync] Reactivated back-in-stock product: ${dbProd.slug}`);
    }
  }

  const summary = `${added} added, ${updated} updated, ${deactivated} deactivated, ${reactivated} reactivated, ${shopifyProducts.length} total from Shopify`;
  console.log(`[shopify-sync] Sync complete: ${summary}`);
  return { added, updated, total: shopifyProducts.length };
}

let syncInterval: ReturnType<typeof setInterval> | null = null;

export function startPeriodicSync(intervalMs: number = 10 * 60 * 1000) {
  syncInterval = setInterval(() => {
    syncShopifyProducts().catch(err =>
      console.error("[shopify-sync] Periodic sync failed:", err)
    );
  }, intervalMs);

  console.log(`[shopify-sync] Periodic sync started (every ${intervalMs / 60000} minutes)`);
}

export function stopPeriodicSync() {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
  }
}
