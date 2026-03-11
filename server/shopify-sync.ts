import { db } from "./db";
import { products as productsTable, categories as categoriesTable } from "@shared/schema";
import { eq } from "drizzle-orm";

const SHOPIFY_COLLECTION_TO_CATEGORY: Record<string, string> = {
  "weighted-sensory-products-for-kids": "deep-pressure",
  "weighted-vests-for-sensory-processing": "deep-pressure",
  "weighted-compression": "deep-pressure",
  "calming-comfort-v2": "deep-pressure",
  "sensory-room-equipment": "visual",
  "fidgets-for-sensory-needs": "adl-kit",
  "fidget-boxes-for-sensory-needs": "adl-kit",
  "sensory-active-motor-skill-toys": "movement-balance",
  "balance-coordination": "movement-balance",
  "chew-necklaces": "adl-kit",
  "chewing-oral-needs": "adl-kit",
  "therapy-putty-for-hand-exercises": "adl-kit",
  "sensory-mats-for-kids": "mats",
  "the-active-seeker": "movement-balance",
  "the-focused-calmer": "deep-pressure",
  "the-oral-explorer": "adl-kit",
  "the-sleep-transition-support-seeker": "deep-pressure",
  "the-general-foundational-explorer": "adl-kit",
};

interface ShopifyProduct {
  handle: string;
  title: string;
  descriptionHtml: string;
  tags: string[];
  collections: { edges: Array<{ node: { handle: string; title: string } }> };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        compareAtPrice: { amount: string; currencyCode: string } | null;
      };
    }>;
  };
}

function resolveCategory(product: ShopifyProduct): string {
  for (const edge of product.collections.edges) {
    const mapped = SHOPIFY_COLLECTION_TO_CATEGORY[edge.node.handle];
    if (mapped) return mapped;
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
  const variant = sp.variants.edges[0]?.node;
  const priceInPaise = variant ? Math.round(parseFloat(variant.price.amount)) : 0;
  const comparePrice = variant?.compareAtPrice
    ? Math.round(parseFloat(variant.compareAtPrice.amount))
    : null;

  const images = sp.images.edges.map(e => e.node.url);
  const categorySlug = resolveCategory(sp);
  const shortDesc = extractShortDescription(sp.descriptionHtml);

  return {
    slug: sp.handle,
    name: sp.title,
    categorySlug,
    shortDescription: shortDesc,
    longDescription: sp.descriptionHtml,
    basePrice: priceInPaise,
    comparePrice,
    stock: null as number | null,
    images: JSON.stringify(images),
    specifications: null as string | null,
    features: JSON.stringify(sp.tags.filter(t => !t.startsWith("need:") && !t.startsWith("product:"))),
    applications: JSON.stringify(sp.tags.filter(t => t.startsWith("need:") || t.startsWith("product:")).map(t => t.replace(/^(need:|product:)/, ""))),
    configOptions: null as string | null,
    shopifyHandle: sp.handle,
    shopifyUrl: `https://www.ableys.in/products/${sp.handle}`,
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
            descriptionHtml
            tags
            collections(first: 10) {
              edges { node { handle title } }
            }
            images(first: 10) {
              edges { node { url altText } }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price { amount currencyCode }
                  compareAtPrice { amount currencyCode }
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

  console.log(`[shopify-sync] Sync complete: ${added} added, ${updated} updated, ${shopifyProducts.length} total from Shopify`);
  return { added, updated, total: shopifyProducts.length };
}

let syncInterval: ReturnType<typeof setInterval> | null = null;

export function startPeriodicSync(intervalMs: number = 30 * 60 * 1000) {
  syncShopifyProducts().catch(err =>
    console.error("[shopify-sync] Initial sync failed:", err)
  );

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
