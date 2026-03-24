import { db } from "./db";
import { products as productsTable, categories as categoriesTable } from "@shared/schema";
import { eq, isNotNull } from "drizzle-orm";
import { shopifyAdminGraphQL } from "./shopify-admin";

const SHOPIFY_COLLECTION_TO_CATEGORY: Record<string, string> = {
  "swings-movement": "swings",
  "movement-swings": "swings",
  "sensory-swings": "swings",

  "sensory-room-equipment": "visual",
  "visual-calming": "visual",
  "sensory-room-lighting": "visual",

  "sensory-mats-for-kids": "mats",
  "sensory-mats-flooring": "mats",

  "sensory-active-motor-skill-toys": "movement-balance",
  "balance-coordination": "movement-balance",
  "movement-balance": "movement-balance",
  "the-active-seeker": "movement-balance",
  "constant-movement-seeking": "movement-balance",
  "for-movement-energy": "movement-balance",
  "overactive-restless": "movement-balance",

  "weighted-sensory-products-for-kids": "deep-pressure",
  "weighted-vests-for-sensory-processing": "deep-pressure",
  "weighted-compression": "deep-pressure",
  "calming-comfort-v2": "deep-pressure",
  "the-focused-calmer": "deep-pressure",
  "the-sleep-transition-support-seeker": "deep-pressure",
  "bedtime-struggles": "deep-pressure",

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

  "ball-pool": "ballpool",
  "ball-pools": "ballpool",
  "ballpool": "ballpool",
  "ball-pit": "ballpool",

  "climbing-equipment": "climbing",
  "climbing-frames": "climbing",
  "climbing": "climbing",

  "therapy-balls": "therapy-balls",
  "therapy-ball": "therapy-balls",
  "exercise-balls": "therapy-balls",
};

const TAG_TO_CATEGORY: Record<string, string> = {
  "product:swings-movement": "swings",
  "swing": "swings",
  "product:balance-coordination": "movement-balance",
  "product:ball-pool": "ballpool",
  "ballpool": "ballpool",
  "product:climbing": "climbing",
};

const CATEGORY_PRIORITY = [
  "swings", "ballpool", "climbing", "mats", "therapy-balls",
  "visual", "deep-pressure", "movement-balance", "adl-kit",
];

const TITLE_CATEGORY_PATTERNS: Array<[RegExp, string]> = [
  [/\b(swing|bolster swing|platform swing|disc swing|t-swing|lycra swing|tyre.*swing|monkey swing)\b/i, "swings"],
  [/\b(ball\s*pool|ball\s*pit|pit\s*balls)\b/i, "ballpool"],
  [/\b(climbing\s*frame|climbing\s*ladder|wooden\s*ladder)\b/i, "climbing"],
  [/\b(crash\s*mat|therapy\s*mat|interlocking\s*mat|foam\s*mat|foldable\s*mat|eva\s*foam|ramp\s*and\s*stairs)\b/i, "mats"],
  [/\b(gym\s*ball|peanut\s*ball|medicine\s*ball|exercise\s*ball|therapy\s*ball|bosu\s*ball)\b/i, "therapy-balls"],
  [/\b(fiber\s*optic|bubble\s*tube|led\s*panel|hexagon.*light|touch.*light|projector)\b/i, "visual"],
  [/\b(weighted\s*(blanket|vest|lap\s*pad|plush|bunny|compression)|body\s*sock|ankle\s*weight)\b/i, "deep-pressure"],
  [/\b(barrel|balance\s*beam|stepping\s*stone|wobble\s*board|rocker\s*board|tunnel)\b/i, "movement-balance"],
  [/\b(busy\s*board|buckle.*pal|fidget|chew|sensory\s*pad|liquid\s*motion|putty)\b/i, "adl-kit"],
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
  id: string;
  handle: string;
  title: string;
  vendor: string;
  productType: string;
  descriptionHtml: string;
  tags: string[];
  availableForSale: boolean;
  updatedAt: string;
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
  const lower = val.trim().toLowerCase();
  if (lower === "true") return "Yes";
  if (lower === "false") return "No";

  if (val.includes("gid://shopify/")) {
    try {
      const arr = JSON.parse(val);
      if (Array.isArray(arr) && arr.every(v => typeof v === "string" && String(v).includes("gid://"))) return null;
    } catch {}
    if (val.includes("gid://shopify/")) return null;
  }

  try {
    const parsed = JSON.parse(val);

    if (parsed && typeof parsed === "object" && (parsed as Record<string, unknown>).type === "root") {
      const text = extractRichText(parsed).trim();
      return text || null;
    }

    if (Array.isArray(parsed)) {
      if (parsed.length === 0) return null;
      if (parsed[0] && typeof parsed[0] === "object" && "value" in parsed[0] && "unit" in parsed[0]) {
        return parsed
          .map((d: { value: number; unit: string }) => `${d.value}${d.unit === "CENTIMETERS" ? "cm" : d.unit === "INCHES" ? "in" : d.unit === "GRAMS" ? "g" : d.unit === "KILOGRAMS" ? "kg" : ` ${d.unit}`}`)
          .join(" × ");
      }
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

  return val.trim() || null;
}

const SPEC_FIELD_MAP: Record<string, string> = {
  "dimension": "Dimensions", "dimensions": "Dimensions",
  "product weight": "Product Weight", "weight": "Weight",
  "material composition": "Material", "material": "Material",
  "material composition]": "Material", "composition": "Material Composition",
  "size": "Size", "capacity": "Capacity",
  "target age group": "Target Age Group", "target_age_group": "Target Age Group",
  "target age": "Target Age Group", "age group": "Target Age Group",
  "whats in the box": "What's in the Box", "what s in the box": "What's in the Box",
  "what's in the box": "What's in the Box", "whats_in_the_box": "What's in the Box",
  "in the box": "What's in the Box", "box contents": "What's in the Box",
  "supervision required": "Supervision Required", "supervision_required": "Supervision Required",
  "supervision": "Supervision Required",
  "care safety information": "Care & Safety Information", "care and safety": "Care & Safety Information",
  "care_and_safety": "Care & Safety Information",
  "care instructions": "Care Instructions", "care_instructions": "Care Instructions",
  "care guide": "Care Instructions", "care_guide": "Care Instructions",
  "washing instructions": "Care Instructions",
  "safety warning": "Safety Warning", "safety_warning": "Safety Warning", "warning": "Safety Warning",
  "safety information": "Safety Information", "safety_information": "Safety Information",
  "safety certifications": "Safety Certifications", "safety_certifications": "Safety Certifications",
  "certifications": "Safety Certifications", "certificate": "Safety Certifications",
  "target users": "Suitable For", "target_users": "Suitable For",
  "usage instructions": "Usage Instructions", "usage_instructions": "Usage Instructions",
  "usage environment": "Usage Environment", "usage_environment": "Usage Environment",
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

  const SPEC_EXACT_KEYS = ["custom.specifications", "specs.value", "product.specifications"];
  for (const k of SPEC_EXACT_KEYS) {
    if (mf[k]) {
      try { Object.assign(specsObj, JSON.parse(mf[k])); } catch { specsObj["Specifications"] = mf[k]; }
      break;
    }
  }

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

  const EXTENDED_FIELD_MAP: Record<string, string> = {
    "custom.problem_statement": "Problem Statement",
    "custom.product_demo_video": "Demo Video URL",
    "custom.sensory_profile_primary": "Sensory Profile Primary",
    "custom.sensory_profile_secondary": "Sensory Profile Secondary",
    "custom.therapist_recommended": "Therapist Recommended",
    "custom.warranty_details": "Warranty",
    "custom.shipping_notes": "Shipping Notes",
    "custom.sensory_characteristics": "Sensory Characteristics",
    "custom.behavior_support": "Behavior Support",
    "custom.product_tier": "Product Tier",
    "custom.trust_badges": "Trust Badges",
    "custom.target_users": "Target Users",
    "custom.use_cases": "Use Cases",
    "custom.best_used_in": "Best Used In",
    "custom.short_product_highlights_list": "Short Highlights",
    "custom.key_benefits": "Key Benefits",
    "custom.usage_instructions": "Usage Instructions Rich",
    "custom.comparison_features": "Comparison Features",
    "custom.what_s_in_the_box": "What's in the Box",
    "custom.safety_certifications": "Safety Certifications",
    "custom.supervision_required": "Supervision Required",
    "custom.care_instructions": "Care Instructions Rich",
    "custom.safety_warning": "Safety Warning Rich",
    "custom.target_age_group": "Target Age Group",
    "custom.product_highlights": "Product Highlights",
  };
  for (const [mfKey, label] of Object.entries(EXTENDED_FIELD_MAP)) {
    if (mf[mfKey] && !specsObj[label]) specsObj[label] = mf[mfKey];
  }

  return Object.keys(specsObj).length > 0 ? JSON.stringify(specsObj) : null;
}

function metafieldsToFeatures(mf: MetafieldMap): string[] {
  const FEATURE_KEYS = [
    "custom.product_highlights", "custom.short_product_highlights_list",
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

const HEADLESS_PUBLICATION_GID = "gid://shopify/Publication/183329587459";

async function fetchHeadlessMetafields(): Promise<Map<string, MetafieldMap>> {
  const result = new Map<string, MetafieldMap>();
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
              metafields(first: 50) {
                edges { node { namespace key value type } }
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
      if (!data?.data?.publication) break;
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
      console.warn("[shopify-sync] Headless metafield fetch failed:", err);
      hasNext = false;
    }
  }
  return result;
}

function resolveCategory(product: ShopifyProduct): string {
  const matched = new Set<string>();
  for (const edge of product.collections.edges) {
    const cat = SHOPIFY_COLLECTION_TO_CATEGORY[edge.node.handle];
    if (cat) matched.add(cat);
  }

  for (const tag of product.tags) {
    const tagLower = tag.toLowerCase();
    const cat = TAG_TO_CATEGORY[tagLower];
    if (cat) matched.add(cat);
  }

  for (const cat of CATEGORY_PRIORITY) {
    if (matched.has(cat)) return cat;
  }

  for (const [pattern, cat] of TITLE_CATEGORY_PATTERNS) {
    if (pattern.test(product.title)) return cat;
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
    shopifyGid: sp.id,
    shopifyUpdatedAt: sp.updatedAt,
    shopifyUrl: `https://www.ableys.in/products/${sp.handle}`,
    shopifyVariants: isSingleDefaultVariant ? null : JSON.stringify(shopifyVariants),
    defaultVariantId: shopifyVariants[0]?.id || null,
    productType: sp.productType || null,
    vendor: sp.vendor || null,
    sku: firstVariantNode?.sku || null,
    isActive: isAvailable,
  };
}

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
              id
              handle
              title
              vendor
              productType
              descriptionHtml
              tags
              status
              updatedAt
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
        const anyVariantAvail = node.variants?.edges?.some((e: any) => e.node.availableForSale) ?? false;
        const normalised: ShopifyProduct = {
          id: node.id,
          handle: node.handle,
          title: node.title,
          vendor: node.vendor,
          productType: node.productType,
          descriptionHtml: node.descriptionHtml,
          tags: node.tags ?? [],
          availableForSale: node.status === "ACTIVE" && anyVariantAvail,
          updatedAt: node.updatedAt || new Date().toISOString(),
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

let syncLock = false;
let syncQueued = false;

export async function syncShopifyProducts(): Promise<{ added: number; updated: number; total: number }> {
  if (syncLock) {
    syncQueued = true;
    console.log("[shopify-sync] Sync already in progress — queued for re-run after completion");
    return { added: 0, updated: 0, total: 0 };
  }

  syncLock = true;
  try {
    return await _doSync();
  } finally {
    syncLock = false;
    if (syncQueued) {
      syncQueued = false;
      console.log("[shopify-sync] Running queued sync...");
      setTimeout(() => {
        syncShopifyProducts().catch(err => console.error("[shopify-sync] Queued sync failed:", err));
      }, 1000);
    }
  }
}

async function _doSync(): Promise<{ added: number; updated: number; total: number }> {
  console.log("[shopify-sync] Starting Shopify product sync (Ableys Headless channel only)...");

  const shopifyProducts = await fetchHeadlessProducts();
  if (shopifyProducts.length === 0) {
    console.log("[shopify-sync] No products fetched from Ableys Headless channel");
    return { added: 0, updated: 0, total: 0 };
  }

  console.log(`[shopify-sync] Fetched ${shopifyProducts.length} products from Ableys Headless channel`);

  let adminMetafields = new Map<string, MetafieldMap>();
  try {
    adminMetafields = await fetchHeadlessMetafields();
    console.log(`[shopify-sync] Fetched metafields for ${adminMetafields.size} products via Admin API (headless only)`);
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
        shopifyGid: dbProduct.shopifyGid,
        shopifyUpdatedAt: dbProduct.shopifyUpdatedAt,
        shopifyUrl: dbProduct.shopifyUrl,
        shopifyVariants: dbProduct.shopifyVariants,
        defaultVariantId: dbProduct.defaultVariantId,
        productType: dbProduct.productType,
        vendor: dbProduct.vendor,
        sku: dbProduct.sku,
      };
      await db
        .update(productsTable)
        .set(updateSet as any)
        .where(eq(productsTable.slug, dbProduct.slug));
      updated++;
    } else {
      await db.insert(productsTable).values({ ...dbProduct, isActive: false, b2bPinned: false });
      console.log(`[shopify-sync] Imported (hidden) new product: ${dbProduct.slug}`);
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

  const shopifyAvailability = new Map(
    shopifyProducts.map(sp => {
      const anyVariantAvailable = sp.variants.edges.some(e => e.node.availableForSale);
      return [sp.handle, sp.availableForSale && anyVariantAvailable] as [string, boolean];
    })
  );
  const allDbProducts = await db
    .select({ slug: productsTable.slug, shopifyHandle: productsTable.shopifyHandle, isActive: productsTable.isActive, b2bPinned: productsTable.b2bPinned })
    .from(productsTable);

  const headlessHandles = new Set(shopifyProducts.map(sp => sp.handle));

  let deactivated = 0;
  for (const dbProd of allDbProducts) {
    const onHeadlessChannel = dbProd.shopifyHandle ? headlessHandles.has(dbProd.shopifyHandle) : false;

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

    // Products still on the headless channel keep their admin-set isActive status.
    // Only products fully removed from the headless channel are deactivated (handled above).
  }

  const summary = `${added} added, ${updated} updated, ${deactivated} deactivated, ${shopifyProducts.length} total from Shopify`;
  console.log(`[shopify-sync] Sync complete: ${summary}`);
  return { added, updated, total: shopifyProducts.length };
}

export async function reconcileProducts(): Promise<{ synced: number; missing: number; stale: number }> {
  console.log("[reconcile] Starting nightly reconciliation...");

  const shopifyProducts = await fetchHeadlessProducts();
  if (shopifyProducts.length === 0) {
    console.log("[reconcile] No products from headless channel — skipping");
    return { synced: 0, missing: 0, stale: 0 };
  }

  const shopifyByHandle = new Map(shopifyProducts.map(sp => [sp.handle, sp]));

  const allDbProducts = await db
    .select({
      slug: productsTable.slug,
      shopifyHandle: productsTable.shopifyHandle,
      shopifyGid: productsTable.shopifyGid,
      shopifyUpdatedAt: productsTable.shopifyUpdatedAt,
    })
    .from(productsTable);

  const dbByHandle = new Map(allDbProducts.filter(p => p.shopifyHandle).map(p => [p.shopifyHandle!, p]));

  let missing = 0;
  let stale = 0;
  const needsSync: string[] = [];

  for (const [handle, sp] of shopifyByHandle) {
    const dbProd = dbByHandle.get(handle);
    if (!dbProd) {
      missing++;
      needsSync.push(handle);
      console.log(`[reconcile] MISSING in DB: ${handle}`);
      continue;
    }

    if (!dbProd.shopifyUpdatedAt || dbProd.shopifyUpdatedAt !== sp.updatedAt) {
      stale++;
      needsSync.push(handle);
      console.log(`[reconcile] STALE: ${handle} (DB: ${dbProd.shopifyUpdatedAt}, Shopify: ${sp.updatedAt})`);
    }
  }

  if (needsSync.length === 0) {
    console.log(`[reconcile] All ${shopifyProducts.length} products are up to date`);
    return { synced: 0, missing: 0, stale: 0 };
  }

  console.log(`[reconcile] ${needsSync.length} products need sync (${missing} missing, ${stale} stale) — triggering full sync`);
  await syncShopifyProducts();

  console.log(`[reconcile] Reconciliation complete`);
  return { synced: needsSync.length, missing, stale };
}

let syncInterval: ReturnType<typeof setInterval> | null = null;
let reconcileInterval: ReturnType<typeof setInterval> | null = null;

export function startPeriodicSync(intervalMs: number = 10 * 60 * 1000, onComplete?: () => void) {
  syncInterval = setInterval(() => {
    syncShopifyProducts()
      .then(() => { if (onComplete) onComplete(); })
      .catch(err => console.error("[shopify-sync] Periodic sync failed:", err));
  }, intervalMs);

  console.log(`[shopify-sync] Periodic sync started (every ${intervalMs / 60000} minutes)`);

  const RECONCILE_INTERVAL_MS = 6 * 60 * 60 * 1000;
  reconcileInterval = setInterval(() => {
    reconcileProducts().catch(err => console.error("[reconcile] Reconciliation failed:", err));
  }, RECONCILE_INTERVAL_MS);
  console.log(`[shopify-sync] Reconciliation scheduled (every 6 hours)`);
}

export function stopPeriodicSync() {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
  }
  if (reconcileInterval) {
    clearInterval(reconcileInterval);
    reconcileInterval = null;
  }
}
