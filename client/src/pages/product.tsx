import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "wouter";
import type { CatalogueProduct, ShopifyVariant } from "@/lib/catalogue-data";
import { useProducts, calculateProductPrice, formatPrice } from "@/lib/product-provider";
import { generatedProductImages } from "@/lib/product-images";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { useShoppingCart } from "@/lib/shopping-cart";
import { createShopifyCheckout } from "@/lib/shopify";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { PhoneSignupInline } from "@/components/phone-signup-inline";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ShoppingCart,
  Package,
  CheckCircle2,
  Shield,
  Zap,
  Heart,
  Send,
  Plus,
  Minus,
  Check,
  Star,
  Truck,
  RotateCcw,
  Lock,
  PhoneCall,
  MapPin,
  BadgeCheck,
  MessageSquare,
} from "lucide-react";
import paymentBadgesImg from "@assets/payment-badges.jpg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ProductCard } from "@/components/product-card";

/* ─── Helper types ─────────────────────────────────────────────────────── */

interface Review {
  author: string;
  location: string;
  stars: number;
  date: string;
  text: string;
  verified: boolean;
}

interface FAQ {
  q: string;
  a: string;
}

/* ─── Per-category reviews ──────────────────────────────────────────────── */

const BASE_REVIEWS: Review[] = [
  {
    author: "Kavitha R.",
    location: "Mumbai",
    stars: 5,
    date: "2 weeks ago",
    text: "Exactly what our therapy centre needed. Build quality is excellent and delivery was prompt. The team at Abley's was helpful when I had a query about installation.",
    verified: true,
  },
  {
    author: "Smita Joshi",
    location: "Pune",
    stars: 5,
    date: "1 month ago",
    text: "My son's OT recommended this and it has made a noticeable difference in just a few weeks. Arrived well-packaged and exactly as described. Will definitely order again.",
    verified: true,
  },
  {
    author: "Dr. Meera Pillai",
    location: "Kochi",
    stars: 5,
    date: "2 months ago",
    text: "I recommend Abley's products to my clients regularly. Consistent quality, transparent pricing, and their sensory tools are among the best available in India.",
    verified: true,
  },
  {
    author: "Rajesh Kumar",
    location: "Hyderabad",
    stars: 4,
    date: "3 weeks ago",
    text: "Good product, fast delivery to Hyderabad. The item matches the photos. My daughter started using it immediately. Would buy from Abley's again.",
    verified: true,
  },
];

const SWING_REVIEWS: Review[] = [
  {
    author: "Priya Menon",
    location: "Bengaluru",
    stars: 5,
    date: "2 weeks ago",
    text: "The swing has been a game-changer for my son with SPD. His OT recommended it and after 3 weeks we can already see improvement in his focus and regulation. The build is very sturdy.",
    verified: true,
  },
  {
    author: "Ananya Sharma",
    location: "Delhi",
    stars: 5,
    date: "1 month ago",
    text: "We set it up in our therapy room and clients love it. Installation was straightforward with the hardware included. Great value for clinical-grade sensory equipment.",
    verified: true,
  },
  {
    author: "Deepa Nair",
    location: "Chennai",
    stars: 4,
    date: "3 weeks ago",
    text: "Excellent quality — exactly as described. My daughter uses it every day after school. The calming effect is noticeable within minutes. Delivery was faster than expected.",
    verified: true,
  },
  {
    author: "Lakshmi Venkat",
    location: "Hyderabad",
    stars: 5,
    date: "6 weeks ago",
    text: "We run a pediatric OT clinic and have purchased 3 swings from Abley's now. Consistent quality each time and the children absolutely love them.",
    verified: true,
  },
];

const DEEP_PRESSURE_REVIEWS: Review[] = [
  {
    author: "Nandita Sharma",
    location: "Delhi",
    stars: 5,
    date: "3 weeks ago",
    text: "The weighted blanket has transformed our bedtime routine. My son falls asleep so much faster and stays asleep longer. Worth every rupee.",
    verified: true,
  },
  {
    author: "Reena Iyer",
    location: "Chennai",
    stars: 5,
    date: "1 month ago",
    text: "Our OT told us deep pressure products can help with regulation and she was absolutely right. The quality of this product is excellent. Packaging was very secure.",
    verified: true,
  },
  {
    author: "Sanjay Kapoor",
    location: "Mumbai",
    stars: 4,
    date: "2 weeks ago",
    text: "Really good product. My daughter wears the compression vest every morning before school and her teachers have noticed she's calmer and more focused.",
    verified: true,
  },
  ...BASE_REVIEWS.slice(2),
];

const REVIEWS_BY_CATEGORY: Record<string, Review[]> = {
  swings: SWING_REVIEWS,
  "deep-pressure": DEEP_PRESSURE_REVIEWS,
};

/* ─── Per-category FAQs ─────────────────────────────────────────────────── */

const SHARED_FAQS: FAQ[] = [
  {
    q: "What are your shipping timelines?",
    a: "We process orders within 1–2 business days. Standard delivery takes 4–7 business days across India. Metro cities (Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Pune) typically receive orders in 3–5 days. Free shipping on all orders.",
  },
  {
    q: "What is your return and exchange policy?",
    a: "We offer a 7-day exchange window from the date of delivery. Items must be unused, in original condition, unwashed, undamaged, and in original packaging with all tags attached. Email info@ableys.in with your order number to initiate an exchange.",
  },
  {
    q: "Are your products therapist-recommended?",
    a: "Yes. All Abley's products are developed in collaboration with occupational therapists (OTs) and are actively used in therapy centres, schools, and hospitals across India.",
  },
  {
    q: "Do you offer bulk or institutional pricing?",
    a: "Yes! We offer special pricing for schools, therapy centres, hospitals, and government institutions. Use the 'Bulk Quote' button on any product page or email team@ableys.in for a custom quote.",
  },
  {
    q: "Is a GST invoice provided?",
    a: "Absolutely. GST-compliant invoices are provided with every order. For institutional billing requirements, please contact us before placing your order.",
  },
];

const SWING_FAQS: FAQ[] = [
  {
    q: "What weight capacity does this swing support?",
    a: "Our sensory swings are designed to support children and adults up to 100 kg. Please check the individual product specification for the exact rated capacity.",
  },
  {
    q: "What ceiling height and anchor setup is required?",
    a: "A minimum ceiling height of 8 feet (2.4 m) is recommended. Use a ceiling mount rated at 4× the maximum user weight. A professional installation is strongly recommended for safety.",
  },
  {
    q: "Is this suitable for children with autism or ADHD?",
    a: "Yes — these swings are specifically designed for sensory processing needs common in autism, ADHD, and SPD. They provide vestibular and proprioceptive input which is calming for many children. Always use under adult supervision.",
  },
  {
    q: "How long before we see therapeutic benefits?",
    a: "Many families notice improvements in regulation and focus within 2–4 weeks of consistent use. Results vary; we recommend incorporating the swing into a broader sensory diet designed with your occupational therapist.",
  },
  ...SHARED_FAQS.slice(0, 3),
];

const DEEP_PRESSURE_FAQS: FAQ[] = [
  {
    q: "How do I choose the right weight for a weighted blanket?",
    a: "The general guideline is 10% of the child's body weight. For example, a 30 kg child would benefit from a 3 kg blanket. When in doubt, consult your occupational therapist for a personalised recommendation.",
  },
  {
    q: "Can adults use these products too?",
    a: "Yes, many of our deep pressure products are suitable for adults. Check the product specifications or contact our team for guidance on adult sizing and weight options.",
  },
  {
    q: "How do I wash and maintain the product?",
    a: "Most weighted products can be machine-washed on a gentle cycle. Check the individual product's care instructions. Compression garments should be air-dried to maintain their elasticity.",
  },
  ...SHARED_FAQS.slice(0, 3),
];

const FAQS_BY_CATEGORY: Record<string, FAQ[]> = {
  swings: SWING_FAQS,
  "deep-pressure": DEEP_PRESSURE_FAQS,
};


/* ─── Utility ───────────────────────────────────────────────────────────── */

/* ─── Extract "How it Works" section from HTML description ─────────────── */

function extractHowItWorksSection(html: string): string | null {
  if (!html) return null;
  // Match "How It Works" anywhere — regardless of surrounding tags, emojis, or colons
  const m = /How\s+[Ii]t\s+Works/i.exec(html);
  if (!m) return null;
  // Take everything after the matched text
  const afterHIW = html.slice(m.index + m[0].length);
  // Skip to the first real block-level content element (<p>, <ul>, <ol>, <div>)
  const contentStart = afterHIW.search(/<(?:p|ul|ol|div)[^>]*>/i);
  if (contentStart === -1) return null;
  const content = afterHIW.slice(contentStart);
  // Stop before the next heading-level element
  const nextH = /<h[1-6][^>]*>/i.exec(content);
  const body = nextH ? content.slice(0, nextH.index) : content;
  return body.trim() || null;
}

function removeHowItWorksSection(html: string): string {
  if (!html) return html;
  const m = /How\s+[Ii]t\s+Works/i.exec(html);
  if (!m) return html;
  // Find the last block-level opening tag before the match — that's where the section starts
  const before = html.slice(0, m.index);
  const blockMatches = [...before.matchAll(/<(?:h[1-6]|p|div)[^>]*>/gi)];
  const lastBlock = blockMatches[blockMatches.length - 1];
  const cutStart = lastBlock ? lastBlock.index! : m.index;
  // After "How It Works", find body content and stop at the next heading
  const afterHIW = html.slice(m.index + m[0].length);
  const bodyStart = afterHIW.search(/<(?:p|ul|ol|div)[^>]*>/i);
  let cutEnd: number;
  if (bodyStart === -1) {
    cutEnd = html.length;
  } else {
    const body = afterHIW.slice(bodyStart);
    const nextH = /<h[1-6][^>]*>/i.exec(body);
    cutEnd = nextH
      ? m.index + m[0].length + bodyStart + nextH.index
      : html.length;
  }
  return (html.slice(0, cutStart) + html.slice(cutEnd)).trim();
}

function findVariantByOptions(
  variants: ShopifyVariant[],
  selectedOptions: Record<string, string>
): ShopifyVariant | null {
  return (
    variants.find((v) =>
      v.options.every((opt) => selectedOptions[opt.name] === opt.value)
    ) || null
  );
}

function getOptionGroups(
  variants: ShopifyVariant[]
): Array<{ name: string; values: string[] }> {
  const groups: Map<string, Set<string>> = new Map();
  for (const v of variants) {
    for (const opt of v.options) {
      if (!groups.has(opt.name)) groups.set(opt.name, new Set());
      groups.get(opt.name)!.add(opt.value);
    }
  }
  return Array.from(groups.entries()).map(([name, values]) => ({
    name,
    values: Array.from(values),
  }));
}

function StarRow({ stars, size = "md" }: { stars: number; size?: "sm" | "md" }) {
  const cls = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${cls} ${
            i <= stars
              ? "fill-amber-400 text-amber-400"
              : i === Math.ceil(stars) && stars % 1 >= 0.5
              ? "fill-amber-200 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

const SUITABLE_FOR_LABELS: Record<string, string> = {
  "autism": "Autism / ASD", "adhd": "ADHD", "spd": "Sensory Processing Disorder",
  "anxiety": "Anxiety", "age-0-3": "Ages 0–3", "age-3-5": "Ages 3–5",
  "age-6-12": "Ages 6–12", "age-13-plus": "Teens & Adults",
  "deep-pressure": "Deep Pressure", "calming": "Calming & Regulation",
  "focus": "Focus & Attention", "vestibular-therapy": "Vestibular Therapy",
  "sensory-integration": "Sensory Integration", "occupational-therapy": "Occupational Therapy",
  "core-strengthening": "Core Strengthening", "bilateral-coordination": "Bilateral Coordination",
  "sleep": "Sleep Support", "bedtime": "Bedtime Routine",
  "classroom": "Classroom Use", "clinical": "Clinical / Therapy Centre",
  "home": "Home Use", "school": "School / NGO",
  "tactile-defensiveness": "Tactile Sensitivity", "proprioceptive-input": "Proprioceptive Input",
  "tactile": "Tactile Stimulation", "weighted": "Weighted Products",
  "compression": "Compression / Deep Pressure", "attention": "Attention & Focus",
  "fidget": "Fidget / Restless Hands", "movement": "Movement Seeking",
  "social-play": "Social Play", "balance-training": "Balance Training",
  "on-the-go": "Portable / On the Go", "travel": "Travel",
};

function humanizeTag(tag: string): string {
  return SUITABLE_FOR_LABELS[tag.toLowerCase()] || tag.replace(/[-_]/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function isTagSlug(s: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s) && s.length < 40 && !s.includes(" ");
}

function parseJsonMetaArray(raw: string | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(String).filter(Boolean);
  } catch {}
  return raw.split(/[,;|\n]/).map(s => s.trim()).filter(Boolean);
}

function stripToText(raw: string): string {
  // Handle Shopify rich text JSON first
  if (raw.trim().startsWith("{") && raw.includes('"type"')) {
    try {
      const doc = JSON.parse(raw);
      return richTextToHtml(doc).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    } catch {}
  }
  return raw.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

// Parse Shopify's metafield rich_text_field JSON into HTML
function richTextToHtml(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (node.type === "root") return node.children?.map(richTextToHtml).join("") || "";
  if (node.type === "paragraph") {
    const inner = node.children?.map(richTextToHtml).join("") || "";
    return inner.trim() ? `<p>${inner}</p>` : "";
  }
  if (node.type === "list") {
    const tag = node.listType === "ordered" ? "ol" : "ul";
    const items = node.children?.map(richTextToHtml).join("") || "";
    return `<${tag}>${items}</${tag}>`;
  }
  if (node.type === "list-item") {
    return `<li>${node.children?.map(richTextToHtml).join("") || ""}</li>`;
  }
  if (node.type === "heading") {
    const lvl = Math.min(Math.max(node.level || 2, 1), 6);
    return `<h${lvl}>${node.children?.map(richTextToHtml).join("") || ""}</h${lvl}>`;
  }
  if (node.type === "link") {
    const href = node.url || "#";
    return `<a href="${href}" target="_blank" rel="noopener">${node.children?.map(richTextToHtml).join("") || href}</a>`;
  }
  if (node.type === "text") {
    let t = node.value || "";
    if (node.bold) t = `<strong>${t}</strong>`;
    if (node.italic) t = `<em>${t}</em>`;
    if (node.underline) t = `<u>${t}</u>`;
    if (node.code) t = `<code>${t}</code>`;
    return t;
  }
  if (node.children) return node.children.map(richTextToHtml).join("");
  return "";
}

// Normalise a raw metafield value to rendered HTML (handles rich text JSON and plain strings)
function toHtml(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (trimmed.startsWith("{") && trimmed.includes('"type"')) {
    try { return richTextToHtml(JSON.parse(trimmed)); } catch {}
  }
  // Plain text — preserve newlines
  return trimmed.replace(/\n/g, "<br />");
}

function extractYouTubeId(url: string): string | null {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

// Keys that contain rich HTML or JSON arrays — excluded from the plain spec table
const RICH_SPEC_EXCLUDE_KEYS = new Set([
  "Problem Statement", "Key Benefits", "Usage Instructions Rich",
  "Comparison Features", "Safety Warning Rich", "Care Instructions Rich",
  "Product Highlights", "Short Highlights", "Trust Badges",
  "Target Users", "Use Cases", "Best Used In",
  "Demo Video URL", "Sensory Characteristics", "Behavior Support",
  "Sensory Profile Primary", "Sensory Profile Secondary",
  "Therapist Recommended", "Warranty", "Shipping Notes", "Product Tier",
]);

const SPEC_GROUPS: { label: string; keys: string[] }[] = [
  {
    label: "Dimensions & Materials",
    keys: ["Dimensions", "Material", "Material Composition", "Product Weight", "Weight", "Size", "Capacity",
           "dimensions", "material", "weightCapacity", "weight", "useCase"],
  },
  {
    label: "Product Details",
    keys: ["Target Age Group", "What's in the Box", "Supervision Required", "Suitable For", "Usage Environment"],
  },
  {
    label: "Care & Safety",
    keys: ["Care Instructions", "Care & Safety Information", "Safety Information",
           "Safety Warning", "Safety Certifications"],
  },
];

function resolveSpecSections(specs: Record<string, string>): { groupLabel: string; entries: [string, string][] }[] {
  const LEGACY_LABELS: Record<string, string> = {
    dimensions: "Dimensions", material: "Material",
    weightCapacity: "Weight Capacity", useCase: "Use Case", weight: "Weight",
  };
  const allEntries = Object.entries(specs).filter(([k, v]) => !!v && !RICH_SPEC_EXCLUDE_KEYS.has(k));
  const assignedKeys = new Set<string>();
  const sections: { groupLabel: string; entries: [string, string][] }[] = [];
  for (const group of SPEC_GROUPS) {
    const entries: [string, string][] = [];
    for (const [k, v] of allEntries) {
      const label = LEGACY_LABELS[k] || k;
      if (group.keys.includes(k) || group.keys.includes(label)) {
        if (!assignedKeys.has(k)) { entries.push([label, v]); assignedKeys.add(k); }
      }
    }
    if (entries.length > 0) sections.push({ groupLabel: group.label, entries });
  }
  const remainder = allEntries.filter(([k]) => !assignedKeys.has(k));
  if (remainder.length > 0) {
    sections.push({ groupLabel: "Additional Info", entries: remainder.map(([k, v]) => [LEGACY_LABELS[k] || k, v]) });
  }
  return sections;
}

function SpecGroupTable({ groupLabel, entries }: { groupLabel: string; entries: [string, string][] }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-3 pb-1.5 border-b border-border/50">
        {groupLabel}
      </p>
      <dl className="space-y-0">
        {entries.map(([label, val], i) => (
          <div
            key={label}
            className={`grid grid-cols-[auto_1fr] gap-x-4 py-2.5 text-sm ${i < entries.length - 1 ? "border-b border-border/30" : ""}`}
            data-testid={`spec-${label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <dt className="text-muted-foreground font-medium w-36 flex-shrink-0 leading-snug">{label}</dt>
            <dd className="text-foreground whitespace-pre-line leading-snug">{val}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, " ");
}

function KeyFeaturesDisplay({ features }: { features: string[] }) {
  const displayFeatures = features.filter(f => !isTagSlug(f) && f.length > 10);
  if (displayFeatures.length === 0) {
    return <p className="text-sm text-muted-foreground">See product description for feature details.</p>;
  }
  return (
    <ul className="space-y-3">
      {displayFeatures.map((feature, i) => {
        const decoded = decodeEntities(feature);
        const colonIdx = decoded.indexOf(":");
        const hasTitle = colonIdx > 0 && colonIdx < 50;
        const title = hasTitle ? decoded.slice(0, colonIdx).trim() : "";
        const body = hasTitle ? decoded.slice(colonIdx + 1).trim() : decoded;
        return (
          <li key={i} className="flex gap-3">
            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-sm text-muted-foreground leading-snug">
              {hasTitle ? (
                <><span className="font-semibold text-foreground">{title}:</span> {body}</>
              ) : decoded}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function SuitableForDisplay({ applications }: { applications: string[] }) {
  if (applications.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {applications.map((app) => (
        <span
          key={app}
          className="text-xs px-3 py-1.5 rounded-full bg-primary/8 text-primary font-medium border border-primary/10"
          data-testid={`app-tag-${app.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {humanizeTag(app)}
        </span>
      ))}
    </div>
  );
}


/* ─── Virtual Customisation Options (for single-SKU products) ─────────────── */

const COLOUR_PALETTE = [
  { name: "Blue",   hex: "#3B82F6" },
  { name: "Red",    hex: "#EF4444" },
  { name: "Green",  hex: "#22C55E" },
  { name: "Yellow", hex: "#EAB308" },
  { name: "Purple", hex: "#A855F7" },
  { name: "Orange", hex: "#F97316" },
  { name: "Pink",   hex: "#EC4899" },
  { name: "Teal",   hex: "#14B8A6" },
];

interface VirtualOptions {
  colors?: typeof COLOUR_PALETTE;
  sizes?: string[];
}

const CATEGORY_VIRTUAL_OPTIONS: Record<string, VirtualOptions> = {
  swings: {
    colors: COLOUR_PALETTE,
    sizes: ["Small (up to 50 kg)", "Medium (up to 80 kg)", "Large (up to 120 kg)"],
  },
  mats: {
    colors: COLOUR_PALETTE,
    sizes: ["100 × 100 cm", "150 × 150 cm", "200 × 100 cm", "200 × 200 cm"],
  },
  ballpool: {
    colors: COLOUR_PALETTE,
    sizes: ["Small (100 cm)", "Medium (120 cm)", "Large (150 cm)"],
  },
  climbing: {
    colors: COLOUR_PALETTE,
  },
  "movement-balance": {
    colors: COLOUR_PALETTE,
  },
  "therapy-balls": {
    sizes: ["45 cm", "55 cm", "65 cm", "75 cm"],
  },
  "deep-pressure": {
    colors: COLOUR_PALETTE,
  },
  visual: {
    colors: COLOUR_PALETTE,
  },
  "adl-kit": {
    colors: COLOUR_PALETTE,
  },
};

function CustomisationSection({
  categorySlug,
  selectedColor,
  onColorChange,
  selectedSize,
  onSizeChange,
  note,
  onNoteChange,
}: {
  categorySlug: string;
  selectedColor: string | undefined;
  onColorChange: (c: string | undefined) => void;
  selectedSize: string | undefined;
  onSizeChange: (s: string | undefined) => void;
  note: string;
  onNoteChange: (n: string) => void;
}) {
  const opts = CATEGORY_VIRTUAL_OPTIONS[categorySlug] || { colors: COLOUR_PALETTE };
  if (!opts.colors && !opts.sizes) return null;

  return (
    <div className="space-y-5 py-4 border-t border-border/40" data-testid="section-customisation">
      {/* Heading */}
      <div>
        <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-0.5">Customise</p>
        <h4 className="text-sm font-semibold text-foreground">Colour &amp; Size Preferences</h4>
        <p className="text-xs text-muted-foreground mt-0.5">
          Preferences are indicative — our team will confirm availability before dispatch.
        </p>
      </div>

      {/* Colour swatches */}
      {opts.colors && (
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
            Colour Preference
            {selectedColor && (
              <span className="normal-case text-foreground ml-1">— {selectedColor}</span>
            )}
          </label>
          <div className="flex flex-wrap gap-2.5">
            {opts.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => onColorChange(selectedColor === c.name ? undefined : c.name)}
                title={c.name}
                className={`w-9 h-9 rounded-full border-2 transition-all ${
                  selectedColor === c.name
                    ? "border-primary scale-110 ring-2 ring-primary/20"
                    : "border-border/60 hover:border-muted-foreground/40"
                }`}
                style={{ backgroundColor: c.hex }}
                data-testid={`swatch-colour-${c.name.toLowerCase()}`}
              />
            ))}
            {selectedColor && (
              <button
                type="button"
                onClick={() => onColorChange(undefined)}
                className="w-9 h-9 rounded-full border-2 border-dashed border-border/60 flex items-center justify-center text-muted-foreground hover:border-muted-foreground/50 text-xs font-medium transition-all"
                title="Clear colour selection"
                data-testid="swatch-colour-clear"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {/* Size pills */}
      {opts.sizes && (
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
            Size Preference
            {selectedSize && (
              <span className="normal-case text-foreground ml-1">— {selectedSize}</span>
            )}
          </label>
          <div className="flex flex-wrap gap-2">
            {opts.sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSizeChange(selectedSize === s ? undefined : s)}
                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                  selectedSize === s
                    ? "border-primary bg-primary/8 text-primary"
                    : "border-border/50 bg-card hover:border-primary/30 text-foreground"
                }`}
                data-testid={`size-option-${s.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Free-text note */}
      <div>
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
          Additional Customisation Note <span className="normal-case font-normal">(optional)</span>
        </label>
        <textarea
          rows={2}
          maxLength={500}
          placeholder="e.g. matching set for 6 children, left-handed grip, specific shade of blue…"
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 resize-none outline-none focus:ring-2 focus:ring-ring transition-shadow leading-relaxed"
          data-testid="input-customisation-note"
        />
        {note.length > 0 && (
          <p className="text-[11px] text-muted-foreground mt-1 text-right tabular-nums">{note.length}/500</p>
        )}
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────────── */

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const { getProductBySlug, getProductCategory, getProductsByCategory, isLoading } = useProducts();
  const product = getProductBySlug(params.slug);
  const { addItem, isInCart } = useEnquiryCart();
  const { addToCart } = useShoppingCart();

  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedMaterial, setSelectedMaterial] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [customizationNote, setCustomizationNote] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const hasShopifyVariants = !!(product?.shopifyVariants && product.shopifyVariants.length > 0);
  const optionGroups = useMemo(() => {
    if (!product?.shopifyVariants) return [];
    return getOptionGroups(product.shopifyVariants);
  }, [product?.shopifyVariants]);

  const selectedVariant = useMemo((): ShopifyVariant | null => {
    if (!product?.shopifyVariants || !hasShopifyVariants) return null;
    if (Object.keys(selectedOptions).length === 0) return product.shopifyVariants[0];
    return findVariantByOptions(product.shopifyVariants, selectedOptions);
  }, [product?.shopifyVariants, selectedOptions, hasShopifyVariants]);

  const handleOptionSelect = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
    setActiveImageIdx(0);
  };

  const config = useMemo(
    () => ({ material: selectedMaterial, size: selectedSize, addons: selectedAddons }),
    [selectedMaterial, selectedSize, selectedAddons]
  );

  const computedPrice = useMemo(() => {
    if (selectedVariant) return selectedVariant.price;
    if (product) return calculateProductPrice(product, config);
    return 0;
  }, [selectedVariant, product, config]);

  const computedComparePrice = useMemo(() => {
    if (selectedVariant) return selectedVariant.compareAtPrice;
    return product?.comparePrice || null;
  }, [selectedVariant, product]);

  const currentSku = useMemo(
    () => selectedVariant?.sku || product?.sku || null,
    [selectedVariant, product]
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getProductsByCategory(product.categorySlug)
      .filter((p) => p.id !== product.id)
      .slice(0, 6);
  }, [product, getProductsByCategory]);

  // ── Parsed metafields (from specifications JSON) ─────────────────────────
  const _specs = (product?.specifications || {}) as Record<string, string | undefined>;
  const _problemStatement  = _specs["Problem Statement"];
  const _demoVideoUrl      = _specs["Demo Video URL"];
  const _sensoryPrimary    = _specs["Sensory Profile Primary"];
  const _sensorySecondary  = _specs["Sensory Profile Secondary"];
  const _therapistRec      = _specs["Therapist Recommended"];
  const _warranty          = _specs["Warranty"];
  const _shippingNotes     = _specs["Shipping Notes"];
  const _targetUsers       = parseJsonMetaArray(_specs["Target Users"]);
  const _useCases          = parseJsonMetaArray(_specs["Use Cases"]);
  const _bestUsedIn        = parseJsonMetaArray(_specs["Best Used In"]);
  const _trustBadges       = parseJsonMetaArray(_specs["Trust Badges"]);
  const _usageInstructions = toHtml(_specs["Usage Instructions Rich"]);
  const _careInstructions  = toHtml(_specs["Care Instructions Rich"]);
  const _safetyWarning     = toHtml(_specs["Safety Warning Rich"]);
  const _keyBenefits       = toHtml(_specs["Key Benefits"]);
  const _comparisonFeat    = _specs["Comparison Features"];
  const _ytId              = _demoVideoUrl ? extractYouTubeId(_demoVideoUrl) : null;

  // Compute displayImages before any early returns — hooks must never be
  // called conditionally or after early returns (React rules of hooks).
  const displayImages = useMemo(() => {
    if (!product) return [];
    const imgs =
      product.images && product.images.length > 0
        ? product.images
        : generatedProductImages[product.id]
        ? [generatedProductImages[product.id]]
        : [];
    const variantImg = selectedVariant?.image;
    if (variantImg && !imgs.includes(variantImg)) {
      return [variantImg, ...imgs];
    }
    return imgs;
  }, [product, selectedVariant?.id]);

  // When the selected variant changes, jump the gallery to that variant's image.
  useEffect(() => {
    const variantImg = selectedVariant?.image;
    if (variantImg) {
      const idx = displayImages.findIndex((img) => img === variantImg);
      setActiveImageIdx(idx >= 0 ? idx : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant?.id]);

  const categorySlug = product?.categorySlug || "adl-kit";
  const reviews = REVIEWS_BY_CATEGORY[categorySlug] || BASE_REVIEWS;
  const faqs = FAQS_BY_CATEGORY[categorySlug] || SHARED_FAQS;

  const avgRating =
    reviews.reduce((s, r) => s + r.stars, 0) / reviews.length;
  const reviewCount = { swings: 87, "deep-pressure": 142, mats: 56, visual: 38 }[categorySlug] ?? 64 + reviews.length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 pb-20 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 pb-20 text-center max-w-page mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link href="/">
            <Button className="rounded-full" data-testid="button-back-home">
              Back to Home
            </Button>
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const category = getProductCategory(product);
  const inEnquiryCart = isInCart(product.id);
  const hasLegacyConfig = !!(
    product.configOptions?.colors ||
    product.configOptions?.materials ||
    product.configOptions?.sizes ||
    product.configOptions?.addons
  );

  const hasVirtualOptions = !hasShopifyVariants && !hasLegacyConfig && !!(
    CATEGORY_VIRTUAL_OPTIONS[product.categorySlug]
  );

  const toggleAddon = (addonName: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonName)
        ? prev.filter((a) => a !== addonName)
        : [...prev, addonName]
    );
  };

  const fallbackImg = generatedProductImages[product.id];
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : fallbackImg
      ? [fallbackImg]
      : [];


  const activeImage = displayImages[activeImageIdx] ?? displayImages[0];

  const variantTitle =
    selectedVariant && selectedVariant.title !== "Default Title"
      ? selectedVariant.title
      : null;

  const handleAddToCart = () => {
    addToCart(
      {
        productId: product.id,
        productName: product.name,
        category: category?.title || "",
        unitPrice: computedPrice,
        shopifyHandle: product.shopifyHandle,
        shopifyVariantId: selectedVariant?.id,
        variantTitle: variantTitle || undefined,
        config: {
          color: selectedColor,
          material: selectedMaterial,
          size: selectedSize,
          addons: selectedAddons,
          customizationNote: customizationNote.trim() || undefined,
        },
        image:
          selectedVariant?.image ||
          product.images?.[0] ||
          generatedProductImages[product.id],
      },
      quantity
    );
  };

  const handleBuyNow = async () => {
    const shopifyHandle = product?.shopifyHandle;
    if (shopifyHandle) {
      const newTab = window.open("", "_blank");
      setCheckoutLoading(true);
      const checkoutUrl = await createShopifyCheckout(
        shopifyHandle,
        quantity,
        selectedVariant?.id
      );
      setCheckoutLoading(false);
      if (checkoutUrl && newTab) {
        newTab.location.href = checkoutUrl;
        return;
      }
      if (newTab) newTab.close();
      if (product?.shopifyUrl) {
        window.location.href = product.shopifyUrl;
        return;
      }
    }
    handleAddToCart();
  };

  const discountPct =
    computedComparePrice && computedComparePrice > computedPrice
      ? Math.round(
          ((computedComparePrice - computedPrice) / computedComparePrice) * 100
        )
      : null;

  const _decodedDescription = decodeEntities(product.description);
  const isHtmlDescription = _decodedDescription.trim().startsWith("<");

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main id="main-content" className="pb-16 lg:pb-0">

        {/* ── Breadcrumb ────────────────────────────────────────── */}
        <section className="pt-36 pb-4">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <nav
              className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap min-w-0"
              data-testid="breadcrumb"
            >
              <Link
                href="/"
                className="transition-colors hover:text-foreground flex-shrink-0"
                data-testid="breadcrumb-home"
              >
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <Link
                href={`/category/${category?.slug}`}
                className="transition-colors hover:text-foreground truncate max-w-[120px] sm:max-w-none"
                data-testid="breadcrumb-category"
              >
                {category?.title}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-foreground font-medium truncate min-w-0">
                {product.name}
              </span>
            </nav>
          </div>
        </section>

        {/* ── Hero: image + product panel ──────────────────────── */}
        <section className="py-8 lg:py-12" data-testid="section-product-detail">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

              {/* ─ Left: Image Gallery ─ */}
              <div className="space-y-3 min-w-0 w-full">
                {/* Main image or video */}
                <div
                  className="w-full aspect-[4/3] sm:aspect-square bg-card rounded-2xl sm:rounded-3xl border border-border/50 relative overflow-hidden"
                  data-testid="container-product-image"
                >
                  {showVideo && _ytId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${_ytId}?autoplay=1`}
                      title="Product demo video"
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                      data-testid="iframe-demo-video"
                    />
                  ) : showVideo && _demoVideoUrl ? (
                    <video
                      src={_demoVideoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                      data-testid="video-demo"
                    />
                  ) : activeImage ? (
                    <img
                      key={activeImage}
                      src={activeImage}
                      alt={`${product.name}${variantTitle ? ` - ${variantTitle}` : ""}`}
                      className="w-full h-full object-contain p-2 sm:p-4"
                      data-testid="img-product-main"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full p-8">
                      <div className="w-20 h-20 rounded-2xl bg-primary/8 flex items-center justify-center">
                        <Package className="w-10 h-10 text-primary/30" />
                      </div>
                      <p className="text-xs text-muted-foreground/50 font-medium mt-3">Product Image</p>
                    </div>
                  )}
                  {!showVideo && discountPct && (
                    <div className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{discountPct}%
                    </div>
                  )}
                </div>

                {/* Thumbnail strip */}
                {(displayImages.length > 1 || _demoVideoUrl) && (
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide snap-x snap-mandatory" data-testid="container-thumbnails">
                    {/* Demo video thumbnail */}
                    {_demoVideoUrl && (
                      <button
                        type="button"
                        onClick={() => { setShowVideo(true); }}
                        className={`w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 snap-start bg-card flex flex-col items-center justify-center gap-0.5 ${
                          showVideo ? "border-primary ring-2 ring-primary/20" : "border-border/50 hover:border-primary/40"
                        }`}
                        data-testid="button-video-thumb"
                        aria-label="Watch product video"
                      >
                        {_ytId ? (
                          <img src={`https://img.youtube.com/vi/${_ytId}/mqdefault.jpg`} alt="Demo video" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-primary"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                            <span className="text-[9px] font-semibold text-primary">Video</span>
                          </>
                        )}
                      </button>
                    )}
                    {displayImages.map((img, i) => (
                      <button
                        key={`${img}-${i}`}
                        type="button"
                        onClick={() => { setShowVideo(false); setActiveImageIdx(i); }}
                        className={`w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 snap-start bg-card ${
                          !showVideo && activeImageIdx === i
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border/50 hover:border-primary/40 active:border-primary"
                        }`}
                        data-testid={`button-image-thumb-${i}`}
                        aria-label={`View image ${i + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} view ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Desktop trust icons below gallery */}
                <div className="hidden lg:grid grid-cols-3 gap-3 pt-2">
                  <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-card border border-border/50 text-center">
                    <Truck className="w-5 h-5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">Free Shipping</span>
                    <span className="text-[10px] text-muted-foreground">Pan India</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-card border border-border/50 text-center">
                    <RotateCcw className="w-5 h-5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">7-Day Exchange</span>
                    <span className="text-[10px] text-muted-foreground">Easy returns</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-card border border-border/50 text-center">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">OT-Approved</span>
                    <span className="text-[10px] text-muted-foreground">Therapist trusted</span>
                  </div>
                </div>
              </div>{/* end gallery */}

              {/* ─ Right: Sticky product info ─ */}
              <div className="lg:sticky lg:top-24 lg:self-start space-y-5">

                {/* ── Badges ── */}
                <div className="flex flex-wrap gap-2" data-testid="container-product-badges">
                  {_specs?.["Safety Certifications"] && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40 uppercase tracking-wider">
                      {_specs["Safety Certifications"]}
                    </span>
                  )}
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary/8 text-primary border border-primary/15 uppercase tracking-wider">
                    {_therapistRec && _therapistRec.toLowerCase() !== "no" ? _therapistRec : "OT Recommended"}
                  </span>
                  {_specs?.["Supervision Required"] === "Yes" && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300 border border-amber-100 dark:border-amber-900/40 uppercase tracking-wider">
                      Adult Supervision
                    </span>
                  )}
                  {_sensoryPrimary && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-900/40 uppercase tracking-wider" data-testid="badge-sensory-primary">
                      {_sensoryPrimary}
                    </span>
                  )}
                  {_sensorySecondary && (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-300 border border-teal-100 dark:border-teal-900/40 uppercase tracking-wider" data-testid="badge-sensory-secondary">
                      {_sensorySecondary}
                    </span>
                  )}
                </div>

                {/* ── Category + Name + Rating ── */}
                <div>
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2" data-testid="text-product-category">
                    {category?.title}
                  </p>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4" data-testid="heading-product-name">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-3 flex-wrap" data-testid="container-ratings">
                    <StarRow stars={Math.round(avgRating)} />
                    <span className="text-sm font-semibold text-foreground tabular-nums">{avgRating.toFixed(1)}</span>
                    <a href="#reviews" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-review-count">
                      ({reviewCount} reviews)
                    </a>
                    <span className="flex items-center gap-1 text-sm text-emerald-600 font-medium">
                      <Check className="w-3.5 h-3.5" /> In Stock
                    </span>
                  </div>
                </div>

                {/* ── Problem Statement callout ── */}
                {_problemStatement && (
                  <div className="p-3.5 rounded-xl bg-primary/5 border-l-4 border-primary/40 text-sm leading-snug" data-testid="container-problem-statement">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">The Challenge</p>
                    <p className="text-muted-foreground italic">{stripToText(_problemStatement)}</p>
                  </div>
                )}

                {/* ── Price ── */}
                <div className="flex items-baseline gap-3 flex-wrap py-4 border-y border-border/40">
                  <span className="text-3xl font-bold text-foreground tabular-nums" data-testid="text-product-price">
                    {formatPrice(computedPrice)}
                  </span>
                  {computedComparePrice && computedComparePrice > computedPrice && (
                    <span className="text-base text-muted-foreground line-through tabular-nums" data-testid="text-compare-price">
                      {formatPrice(computedComparePrice)}
                    </span>
                  )}
                  {discountPct && (
                    <span className="text-sm font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-0.5 rounded-full">
                      {discountPct}% off
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground ml-auto">incl. GST</span>
                </div>

                {/* ── Key features bullet list ── */}
                {product.features.length > 0 && (
                  <ul className="space-y-2" data-testid="list-key-features-inline">
                    {product.features.slice(0, 5).map((feat, i) => {
                      const colonIdx = feat.indexOf(":");
                      const label = colonIdx !== -1 ? feat.slice(0, colonIdx).trim() : null;
                      const body = colonIdx !== -1 ? feat.slice(colonIdx + 1).trim() : feat.trim();
                      return (
                        <li key={i} className="flex items-start gap-2.5 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground leading-snug">
                            {label && <span className="font-semibold text-foreground">{label}: </span>}
                            {body}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* ── SKU + vendor meta ── */}
                {(currentSku || product.vendor) && (
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    {currentSku && <span data-testid="text-product-sku">SKU: <span className="font-mono text-foreground">{currentSku}</span></span>}
                    {product.vendor && <span data-testid="text-product-vendor">By <span className="font-medium text-foreground">{product.vendor}</span></span>}
                  </div>
                )}

                {/* ── Recommended For ── */}
                {(_targetUsers.length > 0 || _bestUsedIn.length > 0 || _useCases.length > 0) && (
                  <div className="space-y-2" data-testid="section-recommended-for">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Recommended for</p>
                    <div className="flex flex-wrap gap-1.5">
                      {[..._targetUsers, ..._bestUsedIn].slice(0, 8).map((item, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-muted/60 text-foreground border border-border/50" data-testid={`tag-recommended-${i}`}>
                          {item}
                        </span>
                      ))}
                    </div>
                    {_useCases.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {_useCases.slice(0, 4).map((uc, i) => (
                          <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-primary/5 text-primary border border-primary/15" data-testid={`tag-usecase-${i}`}>
                            {uc}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Shopify Variant Selectors */}
                {hasShopifyVariants && optionGroups.length > 0 && (
                  <div
                    className="order-3 lg:order-4 space-y-5 py-4 border-t border-border/40"
                    data-testid="section-variant-selector"
                  >
                    {optionGroups.map((group) => (
                      <div key={group.name}>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
                          {group.name}
                          {selectedOptions[group.name] && (
                            <span className="normal-case text-foreground ml-1">
                              — {selectedOptions[group.name]}
                            </span>
                          )}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {group.values.map((value) => {
                            const testOptions = {
                              ...selectedOptions,
                              [group.name]: value,
                            };
                            const testVariant = findVariantByOptions(
                              product.shopifyVariants!,
                              testOptions
                            );
                            const isSelected =
                              (
                                selectedOptions[group.name] ||
                                product.shopifyVariants![0]?.options.find(
                                  (o) => o.name === group.name
                                )?.value
                              ) === value;
                            const isUnavailable =
                              testVariant && !testVariant.availableForSale;
                            return (
                              <button
                                key={value}
                                onClick={() =>
                                  handleOptionSelect(group.name, value)
                                }
                                disabled={isUnavailable || false}
                                className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                                  isSelected
                                    ? "border-primary bg-primary/8 text-primary"
                                    : isUnavailable
                                    ? "border-border/30 bg-muted/30 text-muted-foreground/50 line-through cursor-not-allowed"
                                    : "border-border/50 bg-card hover:border-primary/30 text-foreground"
                                }`}
                                data-testid={`option-${group.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}-${value
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                                {value}
                                {testVariant &&
                                  testVariant.price !==
                                    product.shopifyVariants![0]?.price && (
                                    <span className="ml-1 text-xs text-muted-foreground">
                                      {formatPrice(testVariant.price)}
                                    </span>
                                  )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                    {selectedVariant && !selectedVariant.availableForSale && (
                      <p className="text-sm text-amber-600 font-medium">
                        This variant is currently out of stock.
                      </p>
                    )}
                  </div>
                )}

                {/* Legacy Config Options */}
                {!hasShopifyVariants && hasLegacyConfig && (
                  <div
                    className="order-3 lg:order-4 space-y-5 py-4 border-t border-border/40"
                    data-testid="section-configurator"
                  >
                    {product.configOptions?.colors && (
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
                          Color{" "}
                          {selectedColor && (
                            <span className="normal-case text-foreground">
                              — {selectedColor}
                            </span>
                          )}
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {product.configOptions.colors.map((color) => (
                            <button
                              key={color.name}
                              onClick={() => setSelectedColor(color.name)}
                              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 transition-all ${
                                selectedColor === color.name
                                  ? "border-primary scale-110 ring-2 ring-primary/20"
                                  : "border-border/60 hover:border-muted-foreground/40"
                              }`}
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                              data-testid={`swatch-color-${color.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    {product.configOptions?.materials && (
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
                          Material
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.configOptions.materials.map((mat) => (
                            <button
                              key={mat.name}
                              onClick={() => setSelectedMaterial(mat.name)}
                              className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                                selectedMaterial === mat.name
                                  ? "border-primary bg-primary/5 text-foreground"
                                  : "border-border/50 bg-card hover:border-primary/20 text-muted-foreground"
                              }`}
                              data-testid={`option-material-${mat.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            >
                              <span className="font-medium block">{mat.name}</span>
                              {mat.priceModifier !== 0 && (
                                <span className="text-xs text-primary">
                                  {mat.priceModifier > 0 ? "+" : ""}
                                  {formatPrice(mat.priceModifier)}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {product.configOptions?.sizes && (
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
                          Size / Variant
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.configOptions.sizes.map((sz) => (
                            <button
                              key={sz.name}
                              onClick={() => setSelectedSize(sz.name)}
                              className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                                selectedSize === sz.name
                                  ? "border-primary bg-primary/5 text-foreground"
                                  : "border-border/50 bg-card hover:border-primary/20 text-muted-foreground"
                              }`}
                              data-testid={`option-size-${sz.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            >
                              <span className="font-medium block">{sz.name}</span>
                              {sz.priceModifier !== 0 && (
                                <span className="text-xs text-primary">
                                  {sz.priceModifier > 0 ? "+" : ""}
                                  {formatPrice(sz.priceModifier)}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    {product.configOptions?.addons && (
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5 block">
                          Add-ons
                        </label>
                        <div className="space-y-2">
                          {product.configOptions.addons.map((addon) => (
                            <button
                              key={addon.name}
                              onClick={() => toggleAddon(addon.name)}
                              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${
                                selectedAddons.includes(addon.name)
                                  ? "border-primary bg-primary/5"
                                  : "border-border/50 bg-card hover:border-primary/20"
                              }`}
                              data-testid={`option-addon-${addon.name
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div
                                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                    selectedAddons.includes(addon.name)
                                      ? "bg-primary border-primary"
                                      : "border-border"
                                  }`}
                                >
                                  {selectedAddons.includes(addon.name) && (
                                    <Check className="w-3 h-3 text-primary-foreground" />
                                  )}
                                </div>
                                <span className="font-medium text-foreground">
                                  {addon.name}
                                </span>
                              </div>
                              <span className="text-primary font-medium">
                                +{formatPrice(addon.price)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ── Virtual customisation (single-SKU products) ── */}
                {hasVirtualOptions && (
                  <CustomisationSection
                    categorySlug={product.categorySlug}
                    selectedColor={selectedColor}
                    onColorChange={setSelectedColor}
                    selectedSize={selectedSize}
                    onSizeChange={setSelectedSize}
                    note={customizationNote}
                    onNoteChange={setCustomizationNote}
                  />
                )}

                {/* ── Quantity + CTAs ── */}
                <div className="space-y-3">
                  {/* Quantity row */}
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-20">Quantity</label>
                    <div className="flex items-center border border-border/60 rounded-full overflow-hidden">
                      <Button variant="ghost" size="icon" className="rounded-none h-9 w-9 hover:bg-muted/50" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1} data-testid="button-qty-decrease">
                        <Minus className="w-3.5 h-3.5" />
                      </Button>
                      <span className="w-10 text-center text-sm font-semibold tabular-nums" data-testid="text-quantity">{quantity}</span>
                      <Button variant="ghost" size="icon" className="rounded-none h-9 w-9 hover:bg-muted/50" onClick={() => setQuantity(quantity + 1)} data-testid="button-qty-increase">
                        <Plus className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Primary: Buy Now */}
                  <Button size="lg" className="w-full h-12 rounded-2xl gap-2 text-base" onClick={handleBuyNow} disabled={checkoutLoading} data-testid="button-buy-now">
                    {checkoutLoading ? <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <Zap className="w-4 h-4" />}
                    {checkoutLoading ? "Opening checkout…" : "Buy Now"}
                  </Button>

                  {/* Secondary: Add to Cart */}
                  <Button size="lg" variant="outline" className="w-full h-12 rounded-2xl gap-2 border-border/60 hover:border-primary/40" onClick={handleAddToCart} data-testid="button-add-to-cart">
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </Button>

                  {/* B2B row */}
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" variant="secondary" className="flex-1 gap-1.5 rounded-xl text-xs font-semibold" onClick={() => addItem(product.id, product.name, category?.title || "")} data-testid="button-add-enquiry">
                      {inEnquiryCart
                        ? <><CheckCircle2 className="w-3.5 h-3.5 text-primary" /><span className="text-primary">Quote Added</span></>
                        : <><MessageSquare className="w-3.5 h-3.5" /> Get B2B Quote</>}
                    </Button>
                    <Link href="/enquiry" className="flex-1">
                      <Button size="sm" variant="secondary" className="w-full gap-1.5 rounded-xl text-xs font-semibold" data-testid="button-bulk-quote">
                        <Send className="w-3.5 h-3.5" /> Bulk / Custom Order
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* ── Payment methods ── */}
                <div className="pt-3 border-t border-border/30" data-testid="container-payment-badges">
                  <img
                    src={paymentBadgesImg}
                    alt="Accepted payment methods — Visa, Mastercard, Razorpay, UPI, PhonePe, Google Pay, Paytm, Net Banking, COD"
                    className="w-full max-w-xs object-contain"
                  />
                </div>

                {/* ── Warranty & Shipping ── */}
                {(_warranty || _shippingNotes) && (
                  <div className="flex flex-col gap-1.5 text-xs text-muted-foreground py-2 border-t border-border/30" data-testid="container-warranty-shipping">
                    {_warranty && (
                      <span><span className="font-semibold text-foreground">Warranty:</span> {_warranty}</span>
                    )}
                    {_shippingNotes && (
                      <span><span className="font-semibold text-foreground">Shipping:</span> {_shippingNotes}</span>
                    )}
                  </div>
                )}

                {/* ── Trust strip (Pebble-style 4-item grid) ── */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-4 border-t border-border/30" data-testid="container-trust-strip">
                  {[
                    { icon: Truck, label: "Free Shipping", sub: "Pan India, 4–7 days" },
                    { icon: RotateCcw, label: "7-Day Exchange", sub: "Easy, hassle-free" },
                    { icon: Lock, label: "Secure Checkout", sub: "Razorpay powered" },
                    { icon: PhoneCall, label: "Expert Support", sub: "Mon–Sat, 10am–6pm" },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="flex items-start gap-2.5">
                      <Icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{label}</p>
                        <p className="text-[10px] text-muted-foreground">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Phone signup ── */}
                <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                  <PhoneSignupInline variant="light" label="Get B2B pricing & stock alerts" sublabel="Register free — we notify you of deals and restock" containerId="recaptcha-product" />
                </div>


              </div>{/* end right panel */}
            </div>
          </div>
        </section>

        {/* ── Tabs: Overview / Features / Specs ─────────────────── */}
        {(() => {
          const specSections = resolveSpecSections(product.specifications);
          const hasSpecs = specSections.length > 0;
          const howItWorksHtml = extractHowItWorksSection(_decodedDescription);
          const hasHowItWorks = !!howItWorksHtml;
          const overviewHtml = hasHowItWorks ? removeHowItWorksSection(_decodedDescription) : _decodedDescription;
          const hasUsageGuide = !!_usageInstructions;
          const hasSafetyCare = !!(_careInstructions || _safetyWarning);
          const hasKeyBenefits = !!_keyBenefits;
          const PROSE = `prose prose-sm sm:prose-base max-w-none text-muted-foreground leading-relaxed
            [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_h4]:text-foreground
            [&_strong]:text-foreground [&_b]:text-foreground
            [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
            [&_li]:mb-1.5 [&_p]:mb-3 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2
            [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2`;
          const TAB_TRIGGER = "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-5 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:text-primary whitespace-nowrap flex-shrink-0";
          return (
            <section className="py-12 border-b border-border/30" data-testid="section-product-tabs">
              <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
                <Tabs defaultValue="overview">
                  <div className="mb-8">
                    <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-4">Product Details</p>
                    {/* Tab bar: scrolls horizontally on mobile so all tabs are reachable */}
                    <div className="overflow-x-auto scrollbar-hide border-b border-border/40 -mx-4 sm:-mx-6 lg:-mx-8">
                      <TabsList className="h-auto bg-transparent p-0 gap-0 rounded-none flex-nowrap min-w-max px-4 sm:px-6 lg:px-8">
                        <TabsTrigger value="overview" className={TAB_TRIGGER} data-testid="tab-overview">Overview</TabsTrigger>
                        {hasKeyBenefits && (
                          <TabsTrigger value="key-benefits" className={TAB_TRIGGER} data-testid="tab-key-benefits">Key Benefits</TabsTrigger>
                        )}
                        {hasUsageGuide && (
                          <TabsTrigger value="usage-guide" className={TAB_TRIGGER} data-testid="tab-usage-guide">Usage Guide</TabsTrigger>
                        )}
                        {hasSpecs && (
                          <TabsTrigger value="specs" className={TAB_TRIGGER} data-testid="tab-specs">Specifications</TabsTrigger>
                        )}
                        {hasSafetyCare && (
                          <TabsTrigger value="safety-care" className={TAB_TRIGGER} data-testid="tab-safety-care">Safety & Care</TabsTrigger>
                        )}
                        {hasHowItWorks && (
                          <TabsTrigger value="how-it-works" className={TAB_TRIGGER} data-testid="tab-how-it-works">How it Works</TabsTrigger>
                        )}
                      </TabsList>
                    </div>
                  </div>

                  {/* Overview tab */}
                  <TabsContent value="overview" className="mt-0" data-testid="tabpanel-overview">
                    <div className="max-w-3xl">
                      <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-3">About this product</p>
                      <h2 className="text-2xl font-bold text-foreground mb-6 leading-snug">{product.name.split("|")[0].trim()}</h2>
                      {isHtmlDescription ? (
                        <div className={PROSE} dangerouslySetInnerHTML={{ __html: overviewHtml }} data-testid="html-product-description" />
                      ) : (
                        <div className="text-muted-foreground leading-relaxed space-y-3">
                          {overviewHtml.split("\n").filter((l) => l.trim()).map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Key Benefits tab */}
                  {hasKeyBenefits && (
                    <TabsContent value="key-benefits" className="mt-0" data-testid="tabpanel-key-benefits">
                      <div className="max-w-3xl">
                        <div className="mb-6">
                          <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-2">Why It Works</p>
                          <h2 className="text-2xl font-bold text-foreground">Key Benefits</h2>
                        </div>
                        <div className={PROSE} dangerouslySetInnerHTML={{ __html: _keyBenefits! }} />
                      </div>
                    </TabsContent>
                  )}

                  {/* Usage Guide tab */}
                  {hasUsageGuide && (
                    <TabsContent value="usage-guide" className="mt-0" data-testid="tabpanel-usage-guide">
                      <div className="max-w-3xl">
                        <div className="mb-6">
                          <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-2">How to Use</p>
                          <h2 className="text-2xl font-bold text-foreground">Usage Guide</h2>
                        </div>
                        <div className={PROSE} dangerouslySetInnerHTML={{ __html: _usageInstructions! }} />
                      </div>
                    </TabsContent>
                  )}

                  {/* Specifications tab */}
                  {hasSpecs && (
                    <TabsContent value="specs" className="mt-0" data-testid="tabpanel-specs">
                      <div className="mb-6">
                        <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-2">Technical Details</p>
                        <h2 className="text-2xl font-bold text-foreground">Product Specifications</h2>
                      </div>
                      <div className={`grid gap-8 ${specSections.length === 1 ? "max-w-lg" : specSections.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
                        {specSections.map(({ groupLabel, entries }) => (
                          <SpecGroupTable key={groupLabel} groupLabel={groupLabel} entries={entries} />
                        ))}
                      </div>
                    </TabsContent>
                  )}

                  {/* Safety & Care tab */}
                  {hasSafetyCare && (
                    <TabsContent value="safety-care" className="mt-0" data-testid="tabpanel-safety-care">
                      <div className="max-w-3xl space-y-10">
                        {_safetyWarning && (
                          <div>
                            <div className="mb-4">
                              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1">Important</p>
                              <h2 className="text-2xl font-bold text-foreground">Safety Information</h2>
                            </div>
                            <div className={`${PROSE} [&_p]:text-amber-700 dark:[&_p]:text-amber-300 [&_li]:text-amber-700 dark:[&_li]:text-amber-300`} dangerouslySetInnerHTML={{ __html: _safetyWarning }} />
                          </div>
                        )}
                        {_careInstructions && (
                          <div>
                            <div className="mb-4">
                              <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-1">Maintenance</p>
                              <h2 className="text-2xl font-bold text-foreground">Care Instructions</h2>
                            </div>
                            <div className={PROSE} dangerouslySetInnerHTML={{ __html: _careInstructions }} />
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  )}

                  {/* How it Works tab */}
                  {hasHowItWorks && (
                    <TabsContent value="how-it-works" className="mt-0" data-testid="tabpanel-how-it-works">
                      <div className="max-w-3xl">
                        <div className="mb-6">
                          <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-2">Step by Step</p>
                          <h2 className="text-2xl font-bold text-foreground">How it Works</h2>
                        </div>
                        <div className={PROSE} dangerouslySetInnerHTML={{ __html: howItWorksHtml! }} />
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </section>
          );
        })()}

        {/* ── Reviews ──────────────────────────────────────────── */}
        <section
          id="reviews"
          className="py-16"
          data-testid="section-reviews"
        >
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section heading */}
            <div className="mb-8">
              <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-2">Verified Purchases</p>
              <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
            </div>
            {/* Rating summary */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10">
              <div className="flex-shrink-0 text-center sm:text-left">
                <div className="text-6xl font-bold text-foreground tabular-nums">
                  {avgRating.toFixed(1)}
                </div>
                <StarRow stars={Math.round(avgRating)} size="md" />
                <p className="text-sm text-muted-foreground mt-1">
                  {reviewCount} verified reviews
                </p>
              </div>
              <div className="flex-1 space-y-2 sm:pl-8 sm:border-l sm:border-border/50">
                {[5, 4, 3].map((star) => {
                  const pct = star === 5 ? 76 : star === 4 ? 18 : 6;
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-4">
                        {star}
                      </span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 flex-shrink-0" />
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-7 text-right">
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review cards */}
            <div className="grid md:grid-cols-2 gap-5" data-testid="container-review-cards">
              {reviews.slice(0, 4).map((review, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-card border border-border/50 space-y-3"
                  data-testid={`card-review-${i}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm text-foreground">
                          {review.author}
                        </span>
                        {review.verified && (
                          <span className="text-[10px] font-medium text-green-600 bg-green-50 dark:bg-green-950/40 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                            <BadgeCheck className="w-2.5 h-2.5" />
                            Verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {review.location}
                        <span className="text-border">·</span>
                        {review.date}
                      </div>
                    </div>
                    <StarRow stars={review.stars} size="sm" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────── */}
        <section className="py-16 bg-card/50" data-testid="section-faq">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-2">Got Questions?</p>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-muted-foreground mb-8">
                Can't find the answer you're looking for?{" "}
                <a
                  href="tel:+917042180166"
                  className="text-primary hover:underline"
                >
                  Call us at +91 7042180166
                </a>
              </p>
              <div className="bg-background border border-border/50 rounded-2xl px-6" data-testid="container-faq-list">
                <Accordion type="single" collapsible>
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-border/50 last:border-0">
                      <AccordionTrigger
                        className="text-sm font-semibold text-foreground py-4 hover:no-underline hover:text-primary text-left"
                        data-testid={`faq-toggle-${faq.q.slice(0, 20).toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related Products ─────────────────────────────────── */}
        {relatedProducts.length > 0 && (
          <section className="py-16" data-testid="section-related-products">
            <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-2">Explore More</p>
                  <h2 className="text-2xl font-bold text-foreground">
                    You Might Also Like
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    More products from {category?.title}
                  </p>
                </div>
                <Link
                  href={`/category/${category?.slug}`}
                  className="text-sm text-primary hover:underline font-medium flex-shrink-0"
                  data-testid="link-view-all-category"
                >
                  View all →
                </Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" data-testid="container-related-products">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
      <SiteFooter />
    </div>
  );
}
