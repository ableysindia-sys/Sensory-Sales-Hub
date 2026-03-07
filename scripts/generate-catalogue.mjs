import fs from 'fs';
import { execSync } from 'child_process';

function fetch(url) {
  const tmpFile = `/tmp/shopify_fetch_${Date.now()}.json`;
  execSync(`curl -sL "${url}" -o "${tmpFile}"`, { timeout: 30000 });
  const data = JSON.parse(fs.readFileSync(tmpFile, 'utf8'));
  fs.unlinkSync(tmpFile);
  return data;
}

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(p|div|li|h[1-6]|tr|td|th)[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/&rdquo;/g, '"')
    .replace(/&ldquo;/g, '"')
    .replace(/&ndash;/g, '–')
    .replace(/&mdash;/g, '—')
    .replace(/\p{Emoji_Presentation}|\p{Extended_Pictographic}/gu, '')
    .replace(/[✓✔✗✘✕✖•·●○■□▪▫★☆♦♣♠♥►▶◄◀↑↓←→↔↕⇒⇐⇔⇑⇓]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0)
    .join('\n')
    .trim();
}

function makeSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '').replace(/^-+/, '');
}

const CATEGORY_RULES = [
  {
    slug: 'swings',
    title: 'Swings & Vestibular',
    description: 'Professional therapy swings providing vestibular input, deep pressure, and calming sensory stimulation for children and adults.',
    color: 'from-blue-600 to-indigo-700',
    match: (p) => p.tags.some(t => t === 'swing' || t === 'product:swings-movement') || /swing|jhula/i.test(p.title),
  },
  {
    slug: 'mats-flooring',
    title: 'Mats & Flooring',
    description: 'Safety mats, sensory floor tiles, crash pads, and interlocking foam tiles for therapy rooms and play areas.',
    color: 'from-emerald-600 to-teal-700',
    match: (p) => p.tags.some(t => ['product:sensory-mats', 'flooring', 'sensory-mat'].includes(t)) || /\b(mat|crash pad|floor tile|flooring)\b/i.test(p.title),
  },
  {
    slug: 'deep-pressure',
    title: 'Deep Pressure & Weighted',
    description: 'Weighted vests, blankets, lap pads, compression garments, and body socks providing calming deep pressure input.',
    color: 'from-purple-600 to-violet-700',
    match: (p) => p.tags.some(t => ['product:weighted-compression', 'deep-pressure', 'weighted'].includes(t)) || /weighted|compression|body sock|lap pad/i.test(p.title),
  },
  {
    slug: 'fidgets-focus',
    title: 'Fidgets & Focus Tools',
    description: 'Pop tubes, fidget boxes, stress balls, stretchy strings, putty, and sensory toys designed to improve attention and self-regulation.',
    color: 'from-orange-500 to-amber-600',
    match: (p) => p.tags.some(t => ['product:fidgets-focus', 'fidget'].includes(t)) || /fidget|pop tube|putty|stress ball|slug/i.test(p.title),
  },
  {
    slug: 'oral-motor',
    title: 'Oral Motor & Chew Tools',
    description: 'Chewable necklaces, oral motor tools, chew tubes, and speech therapy aids for oral sensory needs.',
    color: 'from-rose-500 to-pink-600',
    match: (p) => p.tags.some(t => ['product:chew-oral', 'oral-motor', 'oral', 'chew'].includes(t)) || /chew|oral motor|tongue/i.test(p.title),
  },
  {
    slug: 'balance-movement',
    title: 'Balance & Movement',
    description: 'Stepping stones, balance boards, trampolines, scooter boards, and exercise equipment for motor skill development.',
    color: 'from-cyan-600 to-blue-600',
    match: (p) => p.tags.some(t => ['product:balance-coordination', 'balance', 'gross-motor', 'coordination'].includes(t)) || /balance|stepping stone|trampoline|scooter board|rocker|exercise band|medicine ball|gym ball|ankle weight/i.test(p.title),
  },
  {
    slug: 'visual-sensory',
    title: 'Visual & Calming',
    description: 'Fiber optic lamps, liquid motion timers, bubble tubes, sensory tents, and visual tools for relaxation and focus.',
    color: 'from-indigo-500 to-purple-600',
    match: (p) => p.tags.some(t => ['product:visual-calming', 'visual', 'lights'].includes(t)) || /lamp|bubble tube|liquid motion|light-up|fiber optic|visual timer|sensory tent/i.test(p.title),
  },
  {
    slug: 'communication-learning',
    title: 'Communication & Learning',
    description: 'AAC devices, visual communication cards, learning tools, flashcards, and educational aids for speech and cognitive development.',
    color: 'from-teal-500 to-emerald-600',
    match: (p) => p.tags.some(t => ['product:communication', 'communication', 'educational', 'learning'].includes(t)) || /communication|flashcard|aac|whisper phone|visual.*card|gel fidgets number/i.test(p.title),
  },
  {
    slug: 'daily-living',
    title: 'Daily Living & ADL',
    description: 'Adaptive utensils, drinking cups, toothbrushes, scissors, clothing, and daily living aids for independence.',
    color: 'from-amber-500 to-yellow-600',
    match: (p) => p.tags.some(t => ['independence', 'life-skills'].includes(t)) || /adaptive|utensil|cup|plate|scissor|toothbrush|buckle|table|headphone|sticker|bracelet.*puzzle/i.test(p.title),
  },
  {
    slug: 'tactile-sensory',
    title: 'Tactile & Sensory Brushes',
    description: 'Sensory brushes, textured bracelets, acupressure rings, and tactile tools for desensitization and sensory input.',
    color: 'from-lime-600 to-green-700',
    match: (p) => p.tags.some(t => ['tactile-defensiveness', 'desensitization'].includes(t)) || /sensory brush|therapressure|acupressure|spiky.*ring|fuzzy.*bracelet|silicone.*bracelet/i.test(p.title),
  },
  {
    slug: 'ball-pool-play',
    title: 'Ball Pool & Active Play',
    description: 'Therapeutic ball pools, play balls, and active play equipment for sensory-rich motor skill activities.',
    color: 'from-red-500 to-rose-600',
    match: (p) => /ball pool|ball pit|play ball/i.test(p.title),
  },
  {
    slug: 'therapy-balls',
    title: 'Therapy & Exercise Balls',
    description: 'Peanut balls, gym balls, and medicine balls for core strengthening, balance training, and therapeutic exercise.',
    color: 'from-sky-500 to-blue-600',
    match: (p) => /peanut ball|gym ball|medicine ball/i.test(p.title),
  },
  {
    slug: 'adaptive-clothing',
    title: 'Adaptive Clothing',
    description: 'Sensory-friendly shirts, pants, and clothing with hidden velcro closures and easy-open designs for independent dressing.',
    color: 'from-fuchsia-500 to-pink-600',
    match: (p) => /adaptive.*shirt|adaptive.*pant|adaptive.*clothing|velcro.*shirt|shoulder.*open/i.test(p.title),
  },
];

const COLLECTION_IMAGES = {
  'swings': 'https://www.ableys.in/cdn/shop/collections/1257x329_9ae5b2e4-3b64-4bb3-95e3-13f7c1fc2cd0.jpg?v=1766789920&width=600',
  'mats-flooring': 'https://www.ableys.in/cdn/shop/collections/1257x329_9c7b2e00-c88d-464b-b7b2-9d8c02459a65.jpg?v=1766789854&width=600',
  'deep-pressure': 'https://www.ableys.in/cdn/shop/collections/1257x329_5d2c2f0f-dc3b-40c0-94e0-27e66bc42e3b.jpg?v=1766789674&width=600',
  'fidgets-focus': 'https://www.ableys.in/cdn/shop/collections/1257x329_a14b5e0c-3d3d-47f2-8e03-e2e8e6da23eb.jpg?v=1766789750&width=600',
  'oral-motor': 'https://www.ableys.in/cdn/shop/collections/1257x329_12cc5a2d-5cb2-4e1e-9c98-05e5ed126c3e.jpg?v=1766789814&width=600',
  'balance-movement': 'https://www.ableys.in/cdn/shop/collections/1257x329_26bc1bf1-d95c-4c0b-8f5e-91fa2988b2b2.jpg?v=1766790092&width=600',
  'visual-sensory': 'https://www.ableys.in/cdn/shop/collections/1257x329_51bb4c5e-4c3b-4523-80a0-f96fba74c0a2.jpg?v=1766790029&width=600',
  'communication-learning': 'https://www.ableys.in/cdn/shop/collections/1257x329_08b86a3f-c1ca-4eb5-85d5-3a6d460b9dbb.jpg?v=1766789720&width=600',
  'daily-living': 'https://www.ableys.in/cdn/shop/collections/1257x329_d7cc19e2-a60d-490e-9a7a-97c9b19c4b90.jpg?v=1766789970&width=600',
  'tactile-sensory': 'https://www.ableys.in/cdn/shop/collections/1257x329_40a87cff-4a3b-49a2-879b-d5e8dea20d62.jpg?v=1766789894&width=600',
  'ball-pool-play': 'https://www.ableys.in/cdn/shop/collections/1257x329_11e1fa5b-e07c-43c9-ad89-fd30a2d2ba15.jpg?v=1766789637&width=600',
  'therapy-balls': 'https://www.ableys.in/cdn/shop/collections/1257x329_f6e6a68c-5af5-458c-8c7a-46b10e9a65b3.jpg?v=1766789943&width=600',
  'adaptive-clothing': 'https://www.ableys.in/cdn/shop/collections/1257x329.jpg?v=1767003940&width=600',
};

async function main() {
  console.log('Fetching products from ableys.in...');
  
  let allProducts = [];
  for (let page = 1; page <= 5; page++) {
    const data = await fetch(`https://www.ableys.in/products.json?limit=250&page=${page}`);
    if (!data.products || data.products.length === 0) break;
    allProducts = allProducts.concat(data.products);
    console.log(`  Page ${page}: ${data.products.length} products`);
    if (data.products.length < 250) break;
  }
  
  console.log(`Total products fetched: ${allProducts.length}`);

  const categorized = {};
  const uncategorized = [];

  for (const p of allProducts) {
    let placed = false;
    for (const rule of CATEGORY_RULES) {
      if (rule.match(p)) {
        if (!categorized[rule.slug]) categorized[rule.slug] = [];
        categorized[rule.slug].push(p);
        placed = true;
        break;
      }
    }
    if (!placed) {
      uncategorized.push(p);
    }
  }

  if (uncategorized.length > 0) {
    console.log('\nUncategorized products:');
    uncategorized.forEach(p => console.log(`  - ${p.title} [tags: ${(p.tags||[]).join(', ')}]`));
  }

  const categories = [];
  for (const rule of CATEGORY_RULES) {
    const prods = categorized[rule.slug] || [];
    if (prods.length === 0) continue;

    const seenHandles = new Set();
    const uniqueProds = prods.filter(p => {
      if (seenHandles.has(p.handle)) return false;
      seenHandles.add(p.handle);
      return true;
    });

    categories.push({
      slug: rule.slug,
      title: rule.title,
      description: rule.description,
      color: rule.color,
      image: COLLECTION_IMAGES[rule.slug] || '',
      products: uniqueProds.map(p => {
        const variant = p.variants[0];
        const price = parseFloat(variant?.price || '0');
        const comparePrice = variant?.compare_at_price ? parseFloat(variant.compare_at_price) : null;
        const images = (p.images || []).map(img => img.src);
        const desc = stripHtml(p.body_html);
        const lines = desc.split('\n').filter(l => l.length > 5);
        const shortDesc = lines[0] || p.title;
        
        const features = [];
        const applications = [];
        lines.forEach(line => {
          if (/^[-•*]/.test(line.trim())) {
            const clean = line.replace(/^[-•*]\s*/, '').trim();
            if (clean.length > 5 && clean.length < 200) {
              if (features.length < 8) features.push(clean);
            }
          }
        });

        const tags = p.tags || [];
        const specs = {};
        if (variant?.weight && variant.weight > 0) {
          specs.weight = `${variant.weight} ${variant.weight_unit || 'g'}`;
        }

        const variants = p.variants || [];
        const hasMultipleVariants = variants.length > 1 && variants.some(v => v.title !== 'Default Title');
        
        const configOptions = {};
        if (hasMultipleVariants) {
          configOptions.sizes = variants.map(v => ({
            name: v.title,
            priceModifier: parseFloat(v.price) - price,
          }));
        }

        return {
          id: p.handle,
          shopifyHandle: p.handle,
          name: p.title,
          categorySlug: rule.slug,
          shortDescription: shortDesc.substring(0, 200),
          description: desc.substring(0, 2000),
          specifications: specs,
          features: features.length > 0 ? features : [p.title],
          applications: tags.filter(t => !t.startsWith('product:') && !t.startsWith('age-') && !t.startsWith('need:') && !t.startsWith('challenge:')).slice(0, 6),
          basePrice: Math.round(price),
          comparePrice: comparePrice ? Math.round(comparePrice) : null,
          configOptions: Object.keys(configOptions).length > 0 ? configOptions : undefined,
          images,
          shopifyUrl: `https://www.ableys.in/products/${p.handle}`,
        };
      }),
    });
  }

  console.log('\nCategories:');
  let totalProds = 0;
  categories.forEach(c => {
    console.log(`  ${c.title}: ${c.products.length} products`);
    totalProds += c.products.length;
  });
  console.log(`Total categorized: ${totalProds}`);

  let ts = `export interface ProductSpec {
  dimensions?: string;
  material?: string;
  weightCapacity?: string;
  useCase?: string;
  weight?: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface VariantOption {
  name: string;
  priceModifier: number;
}

export interface AddonOption {
  name: string;
  price: number;
}

export interface ConfigOptions {
  colors?: ColorOption[];
  materials?: VariantOption[];
  sizes?: VariantOption[];
  addons?: AddonOption[];
}

export interface CatalogueProduct {
  id: string;
  shopifyHandle?: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  specifications: ProductSpec;
  features: string[];
  applications: string[];
  basePrice: number;
  comparePrice?: number | null;
  configOptions?: ConfigOptions;
  images?: string[];
  shopifyUrl?: string;
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  color: string;
  image?: string;
  products: CatalogueProduct[];
}

export const SITE_IMAGES = {
  hero: "https://www.ableys.in/cdn/shop/files/2752x1536.jpg?v=1767008990&width=1920",
  heroSecondary: "https://www.ableys.in/cdn/shop/files/Gemini_Generated_Image_64i3x864i3x864i3_343b5998-b75c-4f24-8b10-ca805fcce13d.png?v=1765174771&width=800",
  sensoryRoom: "https://www.ableys.in/cdn/shop/files/Focused_Floor_Play.png?v=1764649173&width=800",
  workshop: "https://www.ableys.in/cdn/shop/files/Abley_s_shop1.png?v=1764648560&width=800",
  getStarted: "https://www.ableys.in/cdn/shop/files/get_started.png?v=1764649172&width=800",
  diy: "https://www.ableys.in/cdn/shop/files/Diy.png?v=1764649029&width=800",
  weightedVest: "https://www.ableys.in/cdn/shop/files/weighted_vest_73931c9b-8820-43ea-8ef8-fdb268c0c949.png?v=1753190482&width=600",
  shopBanner: "https://www.ableys.in/cdn/shop/files/bley_s_India_Shop..png?v=1764648926&width=1500",
  adaptiveClothing: "https://www.ableys.in/cdn/shop/collections/1257x329.jpg?v=1767003940&width=1257",
  productShowcase: "https://www.ableys.in/cdn/shop/files/2048x2048.jpg?v=1767003806&width=1024",
};

`;

  ts += `export const categories: Category[] = ${JSON.stringify(categories, null, 2)};\n\n`;

  ts += `export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductBySlug(slug: string): CatalogueProduct | undefined {
  for (const cat of categories) {
    const product = cat.products.find((p) => p.id === slug);
    if (product) return product;
  }
  return undefined;
}

export function getProductCategory(product: CatalogueProduct): Category | undefined {
  return categories.find((c) => c.slug === product.categorySlug);
}

export function getAllProducts(): CatalogueProduct[] {
  return categories.flatMap((c) => c.products);
}

export function calculateProductPrice(
  product: CatalogueProduct,
  config?: { material?: string; size?: string; addons?: string[] }
): number {
  let price = product.basePrice;
  if (config && product.configOptions) {
    if (config.material && product.configOptions.materials) {
      const mat = product.configOptions.materials.find((m) => m.name === config.material);
      if (mat) price += mat.priceModifier;
    }
    if (config.size && product.configOptions.sizes) {
      const sz = product.configOptions.sizes.find((s) => s.name === config.size);
      if (sz) price += sz.priceModifier;
    }
    if (config.addons && product.configOptions.addons) {
      for (const addon of config.addons) {
        const ao = product.configOptions.addons.find((a) => a.name === addon);
        if (ao) price += ao.price;
      }
    }
  }
  return price;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
`;

  fs.writeFileSync('client/src/lib/catalogue-data.ts', ts);
  console.log('\nGenerated client/src/lib/catalogue-data.ts');
}

main().catch(console.error);
