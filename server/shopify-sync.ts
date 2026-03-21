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

/** Recursively extracts plain text from Shopify rich text JSON nodes */
function extractRichText(node: unknown, bullets = true): string {
  if (!node || typeof node !== "object") return "";
  const n = node as Record<string, unknown>;
  if (n.type === "text") return String(n.value || "");
  const children = Array.isArray(n.children) ? n.children : [];
  if (n.type === "list-item") return children.map(c => extractRichText(c, false)).join("").trim();
  if (n.type === "list") {
    return children
      .map((c, i) => {
        const text = extractRichText(c, false).trim();
        return text ? (bullets && n.listType !== "ordered" ? `• ${text}` : `${i + 1}. ${text}`) : "";
      })
      .filter(Boolean)
      .join("\n");
  }
  return children.map(c => extractRichText(c, bullets)).filter(Boolean).join(n.type === "paragraph" ? " " : "\n");
}

function formatMetafieldValue(val: string): string | null {
  // Boolean strings (case-insensitive)
  const lower = val.trim().toLowerCase();
  if (lower === "true") return "Yes";
  if (lower === "false") return "No";

  // Filter out GID references
  if (val.includes("gid://shopify/")) {
    try {
      const arr = JSON.parse(val);
      if (Array.isArray(arr) && arr.every(v => typeof v === "string" && String(v).includes("gid://"))) return null;
    } catch {}
    if (val.includes("gid://shopify/")) return null;
  }

  // Try to parse JSON for arrays/objects
  try {
    const parsed = JSON.parse(val);

    // Shopify rich text document root
    if (parsed && typeof parsed === "object" && (parsed as Record<string, unknown>).type === "root") {
      const text = extractRichText(parsed).trim();
      return text || null;
    }

    if (Array.isArray(parsed)) {
      if (parsed.length === 0) return null;
      // Dimension objects [{value, unit}]
      if (parsed[0] && typeof parsed[0] === "object" && "value" in parsed[0] && "unit" in parsed[0]) {
        return parsed
          .map((d: { value: number; unit: string }) => `${d.value}${d.unit === "CENTIMETERS" ? "cm" : d.unit === "INCHES" ? "in" : d.unit === "GRAMS" ? "g" : d.unit === "KILOGRAMS" ? "kg" : ` ${d.unit}`}`)
          .join(" × ");
      }
      // Filter GIDs from string arrays
      const clean = parsed.filter((v: unknown) => typeof v === "string" && !String(v).includes("gid://"));
      if (clean.length === 0) return null;
      return clean.length === 1 ? String(clean[0]) : clean.join(", ");
    }

    // Measurement object {value, unit}
    if (parsed && typeof parsed === "object" && "value" in parsed && "unit" in parsed) {
      const u = String((parsed as { unit: string }).unit);
      const v = (parsed as { value: number }).value;
      const unitLabel = u === "GRAMS" ? "g" : u === "KILOGRAMS" ? "kg" : u === "CENTIMETERS" ? "cm" : ` ${u}`;
      return `${v}${unitLabel}`;
    }
  } catch {}

  return val.trim() || null;
}

// Maps raw metafield key → canonical display label (title-case, human-readable)
const SPEC_FIELD_MAP: Record<string, string> = {
  // Physical / Dimensions
  "dimension": "Dimensions",
  "dimensions": "Dimensions",
  "product weight": "Product Weight",
  "weight": "Weight",
  "material composition": "Material",
  "material": "Material",
  "material composition]": "Material",
  "composition": "Material Composition",
  "size": "Size",
  "capacity": "Capacity",
  // Product details
  "target age group": "Target Age Group",
  "target_age_group": "Target Age Group",
  "target age": "Target Age Group",
  "age group": "Target Age Group",
  "whats in the box": "What's in the Box",
  "what s in the box": "What's in the Box",
  "what's in the box": "What's in the Box",
  "whats_in_the_box": "What's in the Box",
  "in the box": "What's in the Box",
  "box contents": "What's in the Box",
  "supervision required": "Supervision Required",
  "supervision_required": "Supervision Required",
  "supervision": "Supervision Required",
  // Care & Safety
  "care safety information": "Care & Safety Information",
  "care and safety": "Care & Safety Information",
  "care_and_safety": "Care & Safety Information",
  "care instructions": "Care Instructions",
  "care_instructions": "Care Instructions",
  "care guide": "Care Instructions",
  "care_guide": "Care Instructions",
  "washing instructions": "Care Instructions",
  "safety warning": "Safety Warning",
  "safety_warning": "Safety Warning",
  "warning": "Safety Warning",
  "safety information": "Safety Information",
  "safety_information": "Safety Information",
  "safety certifications": "Safety Certifications",
  "safety_certifications": "Safety Certifications",
  "certifications": "Safety Certifications",
  "certificate": "Safety Certifications",
  // Usage / extras
  "target users": "Suitable For",
  "target_users": "Suitable For",
  "usage instructions": "Usage Instructions",
  "usage_instructions": "Usage Instructions",
  "usage environment": "Usage Environment",
  "usage_environment": "Usage Environment",
};

const SPEC_KEYWORDS = [
  "dimension", "weight", "material", "composition", "size", "capacity",
  "target", "age", "what.*box", "whats", "supervision",
  "care", "safety", "warning", "certif", "instruction", "wash",
];

function canonicalLabel(rawKey: string): string {
  const k = rawKey.split(".").pop()?.replace(/[_\]]/g, " ").trim().toLowerCase() || rawKey.toLowerCase();
  return SPEC_FIELD_MAP[k] || k.replace(/\b\w/g, c => c.toUpperCase());
}

function metafieldsToSpecs(mf: MetafieldMap): string | null {
  const specsObj: Record<string, string> = {};

  // Check for a pre-formatted spec blob and merge it in (don't early-return — we still add extended fields)
  const SPEC_EXACT_KEYS = ["custom.specifications", "specs.value", "product.specifications"];
  for (const k of SPEC_EXACT_KEYS) {
    if (mf[k]) {
      try { Object.assign(specsObj, JSON.parse(mf[k])); } catch { specsObj["Specifications"] = mf[k]; }
      break;
    }
  }

  // Keyword-based extraction for standard spec fields
  for (const [key, val] of Object.entries(mf)) {
    const keyLower = key.toLowerCase();
    const matches = SPEC_KEYWORDS.some(kw => new RegExp(kw).test(keyLower));
    if (matches) {
      const formatted = formatMetafieldValue(val);
      if (formatted) {
        const label = canonicalLabel(key);
        if (!specsObj[label]) specsObj[label] = formatted;
      }
    }
  }

  // Extended metafields for rich product page data (stored verbatim for the frontend to render)
  const EXTENDED_FIELD_MAP: Record<string, string> = {
    "custom.problem_statement":           "Problem Statement",
    "custom.product_demo_video":          "Demo Video URL",
    "custom.sensory_profile_primary":     "Sensory Profile Primary",
    "custom.sensory_profile_secondary":   "Sensory Profile Secondary",
    "custom.therapist_recommended":       "Therapist Recommended",
    "custom.warranty_details":            "Warranty",
    "custom.shipping_notes":              "Shipping Notes",
    "custom.sensory_characteristics":     "Sensory Characteristics",
    "custom.behavior_support":            "Behavior Support",
    "custom.product_tier":                "Product Tier",
    "custom.trust_badges":                "Trust Badges",
    "custom.target_users":                "Target Users",
    "custom.use_cases":                   "Use Cases",
    "custom.best_used_in":               "Best Used In",
    "custom.short_product_highlights_list": "Short Highlights",
    "custom.key_benefits":                "Key Benefits",
    "custom.usage_instructions":          "Usage Instructions Rich",
    "custom.comparison_features":         "Comparison Features",
    "custom.what_s_in_the_box":           "What's in the Box",
    "custom.safety_certifications":       "Safety Certifications",
    "custom.supervision_required":        "Supervision Required",
    "custom.care_instructions":           "Care Instructions Rich",
    "custom.safety_warning":              "Safety Warning Rich",
    "custom.target_age_group":            "Target Age Group",
    "custom.product_highlights":          "Product Highlights",
  };
  for (const [mfKey, label] of Object.entries(EXTENDED_FIELD_MAP)) {
    if (mf[mfKey] && !specsObj[label]) specsObj[label] = mf[mfKey];
  }

  return Object.keys(specsObj).length > 0 ? JSON.stringify(specsObj) : null;
}

function metafieldsToFeatures(mf: MetafieldMap): string[] {
  const FEATURE_KEYS = [
    "custom.product_highlights",
    "custom.short_product_highlights_list",
    "custom.key_features", "custom.features", "custom.key_feature",
    "product.features", "descriptors.features",
  ];
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
            metafields(first: 50) {
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
    defaultVariantId: shopifyVariants[0]?.id || null,
    productType: sp.productType || null,
    vendor: sp.vendor || null,
    sku: firstVariantNode?.sku || null,
    isActive: isAvailable,
  };
}

// Only products published on "Ableys Headless" channel are synced to this app.
const HEADLESS_PUBLICATION_GID = "gid://shopify/Publication/183329587459";

async function fetchHeadlessProducts(): Promise<ShopifyProduct[]> {
  const allProducts: ShopifyProduct[] = [];
  let cursor: string | null = null;
  let hasNext = true;
  let page = 0;

  while (hasNext && page < 20) {
    page++;
    const afterClause = cursor ? `, after: "${cursor}"` : "";
    const query = `{
      publication(id: "${HEADLESS_PUBLICATION_GID}") {
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
              status
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
                    price
                    compareAtPrice
                    selectedOptions { name value }
                    image { url altText }
                  }
                }
              }
            }
          }
        }
      }
    }`;

    try {
      const data = await shopifyAdminGraphQL(query) as any;
      const edges = data?.data?.publication?.products?.edges || [];
      const pageInfo = data?.data?.publication?.products?.pageInfo;

      if (!data?.data?.publication) {
        console.error("[shopify-sync] Publication not found or Admin API error:", JSON.stringify(data?.errors || data));
        break;
      }

      for (const edge of edges) {
        const node = edge.node as any;
        // Normalise Admin API product to match the ShopifyProduct interface.
        // Admin API: price is a Money scalar (string); Storefront API: price is {amount, currencyCode}.
        // Admin API: no top-level availableForSale — derive from status + variant availability.
        const anyVariantAvail = node.variants?.edges?.some((e: any) => e.node.availableForSale) ?? false;
        const normalised: ShopifyProduct = {
          handle: node.handle,
          title: node.title,
          vendor: node.vendor,
          productType: node.productType,
          descriptionHtml: node.descriptionHtml,
          tags: node.tags ?? [],
          availableForSale: node.status === "ACTIVE" && anyVariantAvail,
          collections: node.collections,
          images: node.images,
          variants: {
            edges: (node.variants?.edges ?? []).map((e: any) => ({
              ...e,
              node: {
                ...e.node,
                price: { amount: String(e.node.price ?? "0"), currencyCode: "INR" },
                compareAtPrice: e.node.compareAtPrice
                  ? { amount: String(e.node.compareAtPrice), currencyCode: "INR" }
                  : null,
              },
            })),
          },
        };
        allProducts.push(normalised);
        cursor = edge.cursor as string;
      }

      hasNext = pageInfo?.hasNextPage || false;
    } catch (err) {
      console.error("[shopify-sync] Failed to fetch headless products:", err);
      break;
    }
  }

  return allProducts;
}

export async function syncShopifyProducts(): Promise<{ added: number; updated: number; total: number }> {
  console.log("[shopify-sync] Starting Shopify product sync (Ableys Headless channel only)...");

  const shopifyProducts = await fetchHeadlessProducts();
  if (shopifyProducts.length === 0) {
    console.log("[shopify-sync] No products fetched from Ableys Headless channel");
    return { added: 0, updated: 0, total: 0 };
  }

  console.log(`[shopify-sync] Fetched ${shopifyProducts.length} products from Ableys Headless channel`);

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
      // Always update product data (name, price, images, etc.)
      // Pinned products: preserve manually-set categorySlug — sync must not override admin curation
      if (existing.b2bPinned && existing.categorySlug !== dbProduct.categorySlug) {
        console.log(`[shopify-sync] Preserving category for pinned ${existing.slug}: DB="${existing.categorySlug}" Shopify="${dbProduct.categorySlug}"`);
      }
      const updateSet: Record<string, unknown> = {
        name: dbProduct.name,
        ...(existing.b2bPinned ? {} : { categorySlug: dbProduct.categorySlug }),
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
        defaultVariantId: dbProduct.defaultVariantId,
        productType: dbProduct.productType,
        vendor: dbProduct.vendor,
        sku: dbProduct.sku,
      };
      // Non-pinned products are NEVER activated by sync — team controls visibility via pinning
      // Pinned products: sync only updates product data, never changes their isActive
      await db
        .update(productsTable)
        .set(updateSet as any)
        .where(eq(productsTable.slug, dbProduct.slug));
      updated++;
    } else {
      // New products from Shopify are always activated and pinned automatically.
      // isActive/b2bPinned are forced true so publishing on Shopify = instantly live on the B2B app.
      // OOS products still render correctly with the "Out of Stock" badge via variant availableForSale.
      await db.insert(productsTable).values({ ...dbProduct, isActive: true, b2bPinned: true });
      console.log(`[shopify-sync] Auto-listed new product: ${dbProduct.slug}`);
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
    .select({ slug: productsTable.slug, shopifyHandle: productsTable.shopifyHandle, isActive: productsTable.isActive, b2bPinned: productsTable.b2bPinned })
    .from(productsTable);

  // Build the set of handles on the headless channel for deactivation checks.
  const headlessHandles = new Set(shopifyProducts.map(sp => sp.handle));

  let deactivated = 0;
  for (const dbProd of allDbProducts) {
    const onHeadlessChannel = dbProd.shopifyHandle ? headlessHandles.has(dbProd.shopifyHandle) : false;

    // Products no longer on the Headless channel are always deactivated and unpinned,
    // regardless of their pinned status — the channel is the source of truth.
    if (!onHeadlessChannel) {
      if (dbProd.isActive || dbProd.b2bPinned) {
        await db
          .update(productsTable)
          .set({ isActive: false, b2bPinned: false })
          .where(eq(productsTable.slug, dbProd.slug));
        deactivated++;
        console.log(`[shopify-sync] Deactivated ${dbProd.slug}: not on Ableys Headless channel`);
      }
      continue;
    }

    // Product is on the headless channel.
    // Pinned products: sync never overrides their visibility.
    if (dbProd.b2bPinned) continue;

    const shopifyIsAvailable = shopifyAvailability.get(dbProd.shopifyHandle!);
    if (shopifyIsAvailable === false && dbProd.isActive) {
      await db
        .update(productsTable)
        .set({ isActive: false })
        .where(eq(productsTable.slug, dbProd.slug));
      deactivated++;
      console.log(`[shopify-sync] Deactivated ${dbProd.slug}: out of stock on Shopify`);
    }
    // Non-pinned products are never auto-reactivated by sync;
    // team controls visibility manually. New products are inserted as active above.
  }

  const summary = `${added} added, ${updated} updated, ${deactivated} deactivated, ${shopifyProducts.length} total from Shopify`;
  console.log(`[shopify-sync] Sync complete: ${summary}`);
  return { added, updated, total: shopifyProducts.length };
}

let syncInterval: ReturnType<typeof setInterval> | null = null;

export function startPeriodicSync(intervalMs: number = 10 * 60 * 1000, onComplete?: () => void) {
  syncInterval = setInterval(() => {
    syncShopifyProducts()
      .then(() => { if (onComplete) onComplete(); })
      .catch(err => console.error("[shopify-sync] Periodic sync failed:", err));
  }, intervalMs);

  console.log(`[shopify-sync] Periodic sync started (every ${intervalMs / 60000} minutes)`);
}

export function stopPeriodicSync() {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
  }
}
