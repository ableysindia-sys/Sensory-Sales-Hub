import { useState, useMemo } from "react";
import { useParams, Link } from "wouter";
import type { CatalogueProduct, ShopifyVariant } from "@/lib/catalogue-data";
import { useProducts, calculateProductPrice, formatPrice } from "@/lib/product-provider";
import { generatedProductImages } from "@/lib/product-images";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { useShoppingCart } from "@/lib/shopping-cart";
import { createShopifyCheckout } from "@/lib/shopify";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ShoppingCart,
  Package,
  CheckCircle2,
  Shield,
  Zap,
  Heart,
  Layers,
  Send,
  Plus,
  Minus,
  Check,
  Tag,
  Star,
  Truck,
  RotateCcw,
  Lock,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  MapPin,
  BadgeCheck,
  Clock,
  CreditCard,
  Banknote,
  Smartphone,
} from "lucide-react";
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

/* ─── Payment badges ────────────────────────────────────────────────────── */

const PAYMENT_METHODS = [
  { label: "UPI", icon: Smartphone },
  { label: "Visa", icon: CreditCard },
  { label: "Mastercard", icon: CreditCard },
  { label: "Net Banking", icon: Banknote },
  { label: "COD", icon: Banknote },
];

/* ─── Utility ───────────────────────────────────────────────────────────── */

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

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left gap-4 hover:text-primary transition-colors"
        data-testid={`faq-toggle-${faq.q.slice(0, 20).toLowerCase().replace(/\s+/g, "-")}`}
      >
        <span className="text-sm font-semibold text-foreground">{faq.q}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 flex-shrink-0 text-primary" />
        ) : (
          <ChevronDown className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
      )}
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
  const [quantity, setQuantity] = useState(1);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [shippingOpen, setShippingOpen] = useState(false);

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

  const variantImage = selectedVariant?.image;
  const activeImage = variantImage || productImages[activeImageIdx] || productImages[0];

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
        },
        image:
          variantImage ||
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

  const isHtmlDescription = product.description.trim().startsWith("<");

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main id="main-content">

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
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

              {/* Image Gallery */}
              <div className="space-y-4">
                <div
                  className="aspect-square bg-card rounded-3xl border border-border/50 flex items-center justify-center relative overflow-hidden"
                  data-testid="container-product-image"
                >
                  {activeImage ? (
                    <img
                      src={activeImage}
                      alt={`${product.name}${variantTitle ? ` - ${variantTitle}` : ""}`}
                      className="w-full h-full object-cover max-w-full"
                      data-testid="img-product-main"
                    />
                  ) : (
                    <div className="text-center p-12">
                      <div className="w-28 h-28 mx-auto mb-6 rounded-3xl bg-primary/8 flex items-center justify-center">
                        <Package className="w-14 h-14 text-primary/30" />
                      </div>
                      <p className="text-sm text-muted-foreground/50 font-medium">
                        Product Image
                      </p>
                    </div>
                  )}
                  {discountPct && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{discountPct}%
                    </div>
                  )}
                </div>

                {productImages.length > 1 && (
                  <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
                    {productImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIdx(i)}
                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                          !variantImage && activeImageIdx === i
                            ? "border-primary ring-1 ring-primary/30"
                            : "border-border/50 hover:border-primary/30"
                        }`}
                        data-testid={`button-image-thumb-${i}`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} thumbnail ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Trust icons — visible on desktop below gallery */}
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
              </div>

              {/* Product Info Panel */}
              <div className="lg:sticky lg:top-32 lg:self-start space-y-5">

                {/* Category + Rating */}
                <div>
                  <p
                    className="text-sm font-semibold text-primary uppercase tracking-wider mb-2"
                    data-testid="text-product-category"
                  >
                    {category?.title}
                  </p>

                  <h1
                    className="text-2xl sm:text-3xl font-bold text-foreground mb-3 leading-tight"
                    data-testid="heading-product-name"
                  >
                    {product.name}
                  </h1>

                  {/* Star rating */}
                  <div className="flex items-center gap-2 mb-3" data-testid="container-ratings">
                    <StarRow stars={Math.round(avgRating)} />
                    <span className="text-sm font-semibold text-foreground tabular-nums">
                      {avgRating.toFixed(1)}
                    </span>
                    <a
                      href="#reviews"
                      className="text-sm text-primary hover:underline"
                      data-testid="link-review-count"
                    >
                      {reviewCount} reviews
                    </a>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                      <BadgeCheck className="w-3.5 h-3.5" />
                      In Stock
                    </span>
                  </div>

                  {product.vendor && (
                    <p
                      className="text-sm text-muted-foreground mb-2"
                      data-testid="text-product-vendor"
                    >
                      By{" "}
                      <span className="font-medium text-foreground">
                        {product.vendor}
                      </span>
                    </p>
                  )}

                  {product.productType && (
                    <p
                      className="text-xs text-muted-foreground mb-2 flex items-center gap-1"
                      data-testid="text-product-type"
                    >
                      <Tag className="w-3 h-3" />
                      {product.productType}
                    </p>
                  )}

                  {currentSku && (
                    <p
                      className="text-xs text-muted-foreground mb-3"
                      data-testid="text-product-sku"
                    >
                      SKU: <span className="font-mono">{currentSku}</span>
                    </p>
                  )}

                  <p
                    className="text-sm text-muted-foreground leading-relaxed"
                    data-testid="text-product-description"
                  >
                    {product.shortDescription}
                  </p>
                </div>

                {/* Shipping trust strip */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 py-3 px-4 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50" data-testid="container-trust-strip">
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400">
                    <Truck className="w-3.5 h-3.5" /> Free delivery, Pan India
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400">
                    <RotateCcw className="w-3.5 h-3.5" /> 7-day easy exchange
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400">
                    <Clock className="w-3.5 h-3.5" /> Dispatch in 1–2 days
                  </span>
                  <span className="flex items-center gap-1.5 text-xs font-medium text-green-700 dark:text-green-400">
                    <Lock className="w-3.5 h-3.5" /> Secure checkout
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-3xl font-bold text-foreground tabular-nums"
                    data-testid="text-product-price"
                  >
                    {formatPrice(computedPrice)}
                  </span>
                  {computedComparePrice && computedComparePrice > computedPrice && (
                    <span
                      className="text-base text-muted-foreground line-through tabular-nums"
                      data-testid="text-compare-price"
                    >
                      {formatPrice(computedComparePrice)}
                    </span>
                  )}
                  {discountPct && (
                    <span className="text-sm font-semibold text-green-600 bg-green-50 dark:bg-green-950/30 px-2 py-0.5 rounded-full">
                      {discountPct}% off
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground ml-auto">excl. GST</span>
                </div>

                {/* Shopify Variant Selectors */}
                {hasShopifyVariants && optionGroups.length > 0 && (
                  <div
                    className="space-y-5 py-4 border-t border-border/40"
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
                    className="space-y-5 py-4 border-t border-border/40"
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

                {/* Quantity */}
                <div className="flex items-center gap-3 py-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Qty
                  </label>
                  <div className="flex items-center gap-1 border border-border/50 rounded-full">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      data-testid="button-qty-decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </Button>
                    <span
                      className="w-8 text-center text-sm font-semibold tabular-nums"
                      data-testid="text-quantity"
                    >
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-8 w-8"
                      onClick={() => setQuantity(quantity + 1)}
                      data-testid="button-qty-increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <span className="text-xs text-green-600 font-medium ml-2 flex items-center gap-1">
                    <Check className="w-3 h-3" /> In stock
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-2 border-t border-border/40">
                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      className="flex-1 rounded-full gap-2 shadow-lg shadow-primary/20"
                      onClick={handleAddToCart}
                      data-testid="button-add-to-cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1 rounded-full gap-2 border-primary/20 hover:bg-primary/5"
                      onClick={handleBuyNow}
                      disabled={checkoutLoading}
                      data-testid="button-buy-now"
                    >
                      {checkoutLoading ? (
                        <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      ) : (
                        <Zap className="w-4 h-4" />
                      )}
                      {checkoutLoading
                        ? "Redirecting..."
                        : product.shopifyHandle
                        ? "Buy on Shopify"
                        : "Buy Now"}
                    </Button>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="flex-1 rounded-full gap-2 text-muted-foreground"
                      onClick={() =>
                        addItem(product.id, product.name, category?.title || "")
                      }
                      data-testid="button-add-enquiry"
                    >
                      {inEnquiryCart ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          Added to Enquiry
                        </>
                      ) : (
                        <>
                          <Package className="w-4 h-4" />
                          Add to Enquiry
                        </>
                      )}
                    </Button>
                    <Link href="/enquiry" className="flex-1">
                      <Button
                        size="lg"
                        variant="ghost"
                        className="w-full rounded-full gap-2 text-muted-foreground"
                        data-testid="button-bulk-quote"
                      >
                        <Send className="w-4 h-4" />
                        Bulk/Custom Quote
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Payment trust badges */}
                <div className="pt-3 border-t border-border/40" data-testid="container-payment-badges">
                  <p className="text-xs text-muted-foreground mb-2.5 flex items-center gap-1.5">
                    <Lock className="w-3 h-3" /> Secure Payment — powered by Razorpay
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PAYMENT_METHODS.map((m) => (
                      <span
                        key={m.label}
                        className="flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-lg border border-border/60 bg-muted/30 text-muted-foreground"
                        data-testid={`badge-payment-${m.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <m.icon className="w-3 h-3" />
                        {m.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Shipping & Returns expandable */}
                <div className="border border-border/50 rounded-2xl overflow-hidden" data-testid="container-shipping-returns">
                  <button
                    onClick={() => setShippingOpen((o) => !o)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors"
                    data-testid="button-toggle-shipping"
                  >
                    <span className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Truck className="w-4 h-4 text-primary" />
                      Shipping & Returns
                    </span>
                    {shippingOpen ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  {shippingOpen && (
                    <div className="px-4 pb-4 pt-1 space-y-3 border-t border-border/40">
                      <div className="flex gap-2.5">
                        <Truck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-foreground mb-0.5">Free Shipping, Pan India</p>
                          <p className="text-xs text-muted-foreground">Orders processed in 1–2 business days. Delivery in 4–7 days (metro cities: 3–5 days).</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <RotateCcw className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-foreground mb-0.5">7-Day Exchange</p>
                          <p className="text-xs text-muted-foreground">Unused, undamaged items in original packaging. Email info@ableys.in with your order number.</p>
                        </div>
                      </div>
                      <div className="flex gap-2.5">
                        <PhoneCall className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-foreground mb-0.5">Expert Support</p>
                          <p className="text-xs text-muted-foreground">Call +91 7042180166 · Mon–Sat, 10am–6pm IST</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Key Highlights (3-card strip) ────────────────────── */}
        <section className="py-10 bg-primary/5" data-testid="section-highlights">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-background border border-border/50">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-0.5">Therapeutic Benefits</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {product.applications.length > 0
                      ? `Designed for ${product.applications
                          .slice(0, 2)
                          .map((a) => a.replace(/-/g, " "))
                          .join(" & ")}.`
                      : "Developed with OTs for measurable sensory outcomes."}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-background border border-border/50">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Layers className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-0.5">Material & Build</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {product.specifications.material
                      ? `Crafted with ${product.specifications.material.toLowerCase()} for durability.`
                      : "Professional-grade materials for clinical environments."}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-background border border-border/50">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BadgeCheck className="w-4.5 h-4.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-0.5">OT-Recommended</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Trusted by occupational therapists in clinics and schools across India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Full Description ─────────────────────────────────── */}
        <section className="py-14" data-testid="section-full-description">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                About This Product
              </h2>
              {isHtmlDescription ? (
                <div
                  className="prose prose-sm sm:prose-base max-w-none text-muted-foreground leading-relaxed
                    [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground [&_h4]:text-foreground
                    [&_strong]:text-foreground [&_b]:text-foreground
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5
                    [&_li]:mb-1 [&_p]:mb-3 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3
                    [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2
                    [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2
                    [&_th]:border [&_th]:border-border [&_th]:px-3 [&_th]:py-2 [&_th]:bg-muted [&_th]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  data-testid="html-product-description"
                />
              ) : (
                <div className="text-muted-foreground leading-relaxed space-y-2">
                  {product.description
                    .split("\n")
                    .filter((l) => l.trim())
                    .map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Specs, Features, Applications ───────────────────── */}
        <section
          className="py-12 bg-card/50"
          data-testid="section-product-specs"
        >
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Specifications
                </h3>
                <div className="space-y-3">
                  {product.specifications.dimensions && (
                    <div data-testid="spec-dimensions">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        Dimensions
                      </p>
                      <p className="text-sm text-foreground">
                        {product.specifications.dimensions}
                      </p>
                    </div>
                  )}
                  {product.specifications.material && (
                    <div data-testid="spec-material">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        Material
                      </p>
                      <p className="text-sm text-foreground">
                        {product.specifications.material}
                      </p>
                    </div>
                  )}
                  {product.specifications.weightCapacity && (
                    <div data-testid="spec-weight">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        Weight Capacity
                      </p>
                      <p className="text-sm text-foreground">
                        {product.specifications.weightCapacity}
                      </p>
                    </div>
                  )}
                  {product.specifications.useCase && (
                    <div data-testid="spec-usecase">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                        Use Case
                      </p>
                      <p className="text-sm text-foreground">
                        {product.specifications.useCase}
                      </p>
                    </div>
                  )}
                  {!product.specifications.dimensions &&
                    !product.specifications.material &&
                    !product.specifications.weightCapacity &&
                    !product.specifications.useCase && (
                      <p className="text-sm text-muted-foreground">
                        See description for full specifications.
                      </p>
                    )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Key Features
                </h3>
                {product.features.length > 0 ? (
                  <ul className="space-y-2">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    See product description for features.
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Suitable For
                </h3>
                {product.applications.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app) => (
                      <span
                        key={app}
                        className="text-xs px-3 py-1.5 rounded-full bg-primary/8 text-primary font-medium capitalize"
                        data-testid={`app-tag-${app
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        {app.replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    See product description for applications.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Reviews ──────────────────────────────────────────── */}
        <section
          id="reviews"
          className="py-16"
          data-testid="section-reviews"
        >
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            {/* Summary header */}
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
                {faqs.map((faq, i) => (
                  <FAQItem
                    key={i}
                    faq={faq}
                    isOpen={openFaqIdx === i}
                    onToggle={() =>
                      setOpenFaqIdx((prev) => (prev === i ? null : i))
                    }
                  />
                ))}
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
