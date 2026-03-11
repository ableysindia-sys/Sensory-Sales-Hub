import { db } from "./db";
import { products as productsTable, categories as categoriesTable } from "@shared/schema";
import { eq, isNotNull } from "drizzle-orm";

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

function shopifyToDbProduct(sp: ShopifyProduct) {
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

  return {
    slug: sp.handle,
    name: sp.title,
    categorySlug,
    shortDescription: shortDesc,
    longDescription: sp.descriptionHtml,
    basePrice,
    comparePrice,
    stock: null as number | null,
    images: JSON.stringify(images),
    specifications: null as string | null,
    features: JSON.stringify(sp.tags.filter(t => !t.startsWith("need:") && !t.startsWith("product:"))),
    applications: JSON.stringify(sp.tags.filter(t => t.startsWith("need:") || t.startsWith("product:")).map(t => t.replace(/^(need:|product:)/, ""))),
    configOptions: null as string | null,
    shopifyHandle: sp.handle,
    shopifyUrl: `https://www.ableys.in/products/${sp.handle}`,
    shopifyVariants: isSingleDefaultVariant ? null : JSON.stringify(shopifyVariants),
    productType: sp.productType || null,
    vendor: sp.vendor || null,
    sku: firstVariantNode?.sku || null,
    isActive: true,
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

  let added = 0;
  let updated = 0;

  for (const sp of shopifyProducts) {
    const dbProduct = shopifyToDbProduct(sp);

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
          images: dbProduct.images,
          features: dbProduct.features,
          applications: dbProduct.applications,
          shopifyHandle: dbProduct.shopifyHandle,
          shopifyUrl: dbProduct.shopifyUrl,
          shopifyVariants: dbProduct.shopifyVariants,
          productType: dbProduct.productType,
          vendor: dbProduct.vendor,
          sku: dbProduct.sku,
          isActive: true,
        })
        .where(eq(productsTable.slug, dbProduct.slug));
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
  // Only products that are currently published on Shopify should be active.
  // This covers both Shopify-synced products (with shopifyHandle) and seeded
  // catalogue products (no shopifyHandle) that have no Shopify counterpart.
  const fetchedHandles = new Set(shopifyProducts.map(sp => sp.handle));
  const allDbProducts = await db
    .select({ slug: productsTable.slug, shopifyHandle: productsTable.shopifyHandle, isActive: productsTable.isActive })
    .from(productsTable);

  let deactivated = 0;
  let reactivated = 0;
  for (const dbProd of allDbProducts) {
    // A product is "in Shopify" if its shopifyHandle matches a fetched handle
    const isInShopify = !!(dbProd.shopifyHandle && fetchedHandles.has(dbProd.shopifyHandle));

    if (!isInShopify) {
      if (dbProd.isActive) {
        await db
          .update(productsTable)
          .set({ isActive: false })
          .where(eq(productsTable.slug, dbProd.slug));
        deactivated++;
        console.log(`[shopify-sync] Deactivated non-published product: ${dbProd.slug}`);
      }
    } else if (!dbProd.isActive) {
      await db
        .update(productsTable)
        .set({ isActive: true })
        .where(eq(productsTable.slug, dbProd.slug));
      reactivated++;
      console.log(`[shopify-sync] Reactivated re-published product: ${dbProd.slug}`);
    }
  }

  const summary = `${added} added, ${updated} updated, ${deactivated} deactivated, ${reactivated} reactivated, ${shopifyProducts.length} total from Shopify`;
  console.log(`[shopify-sync] Sync complete: ${summary}`);
  return { added, updated, total: shopifyProducts.length };
}

let syncInterval: ReturnType<typeof setInterval> | null = null;

export function startPeriodicSync(intervalMs: number = 30 * 60 * 1000) {
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
