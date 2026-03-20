import { useState, useMemo } from "react";
import { ArrowRight, Hospital, GraduationCap, Sparkles, Home, Building2, MessageSquare, ShoppingCart, CheckCircle2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useProducts } from "@/lib/product-provider";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { useShoppingCart } from "@/lib/shopping-cart";
import { Button } from "@/components/ui/button";
import type { CatalogueProduct } from "@/lib/catalogue-data";
import { useToast } from "@/hooks/use-toast";

const SETUP_TYPES = [
  { id: "sensory-room",   label: "Occupational Therapy Room", shortLabel: "OT Room",  icon: Sparkles,       color: "from-violet-500 to-purple-600", desc: "Complete OT room." },
  { id: "therapy-centre", label: "Therapy Centre",   shortLabel: "Clinic",   icon: Hospital,       color: "from-blue-500 to-indigo-600",   desc: "OT clinics & rehab facilities" },
  { id: "school",         label: "School",           shortLabel: "School",   icon: GraduationCap,  color: "from-green-500 to-emerald-600", desc: "Special education & inclusive classrooms" },
  { id: "home-setup",     label: "Home Setup",       shortLabel: "Home",     icon: Home,           color: "from-amber-500 to-orange-600",  desc: "Home-based therapy corners" },
  { id: "other",          label: "Browse All",       shortLabel: "All",      icon: Building2,      color: "from-gray-500 to-slate-600",    desc: "All product categories" },
];

const SETUP_CATEGORY_MAP: Record<string, string[]> = {
  "sensory-room":   ["swings", "ballpool", "visual", "deep-pressure", "mats", "climbing"],
  "therapy-centre": ["swings", "therapy-balls", "deep-pressure", "movement-balance", "mats"],
  "school":         ["deep-pressure", "visual", "movement-balance", "therapy-balls", "adl-kit"],
  "home-setup":     ["swings", "deep-pressure", "therapy-balls", "visual"],
  "other":          [],
};

const SETUP_CTA: Record<string, string> = {
  "sensory-room":   "Get an OT room quote",
  "therapy-centre": "Get a clinic setup quote",
  "school":         "Get a school setup quote",
  "home-setup":     "Get a home setup quote",
  "other":          "Get a custom quote",
};

function SetupProductCard({ product, catTitle }: { product: CatalogueProduct; catTitle: string }) {
  const { addItem, isInCart } = useEnquiryCart();
  const { addToCart, items: cartItems } = useShoppingCart();
  const [cartAdded, setCartAdded] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const inEnquiry = isInCart(product.id);
  const inCart = cartItems.some((i) => i.productId === product.id);
  const hasDiscount = product.comparePrice && product.comparePrice > product.basePrice;

  const handleQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inEnquiry) {
      addItem(product.id, product.name, catTitle);
      toast({
        title: "Added to your B2B quote",
        description: "Review all selected products and submit your enquiry.",
        action: (
          <button
            onClick={() => navigate("/enquiry")}
            className="shrink-0 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground ring-offset-background transition-opacity hover:opacity-90"
          >
            View Quote →
          </button>
        ),
      } as Parameters<typeof toast>[0]);
    }
  };

  const handleCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      productName: product.name,
      category: catTitle,
      unitPrice: product.basePrice,
      shopifyHandle: product.shopifyHandle,
      config: { addons: [] },
      image: product.images?.[0],
    });
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  return (
    <div
      className="group bg-card rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.06] transition-all duration-300 overflow-hidden h-full flex flex-col"
      data-testid={`card-setup-product-${product.id}`}
    >
      {/* Image — clicking navigates to product page */}
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted/40 flex-shrink-0">
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground/20">
            {product.name[0]}
          </div>
        )}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-tight">
            SALE
          </div>
        )}
      </Link>

      {/* Info + CTAs */}
      <div className="p-3 flex-1 flex flex-col">
        <p className="text-[10px] font-semibold text-primary/70 uppercase tracking-wider mb-1 truncate">{catTitle}</p>
        <Link href={`/product/${product.id}`}>
          <p className="text-sm font-semibold text-foreground leading-snug mb-2 line-clamp-2 flex-1 hover:text-primary transition-colors cursor-pointer">
            {product.name}
          </p>
        </Link>
        <div className="flex items-baseline gap-1.5 mb-3">
          <p className="text-sm font-bold text-foreground">
            ₹{product.basePrice.toLocaleString("en-IN")}
          </p>
          {hasDiscount && (
            <p className="text-xs text-muted-foreground line-through">
              ₹{product.comparePrice!.toLocaleString("en-IN")}
            </p>
          )}
          <span className="text-[10px] text-green-600 font-medium ml-auto">Free shipping</span>
        </div>

        {/* B2B Quote button — primary */}
        <button
          onClick={handleQuote}
          className={`w-full h-8 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all mb-1.5 ${
            inEnquiry
              ? "bg-primary/10 text-primary border border-primary/30"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
          data-testid={`button-setup-enquiry-${product.id}`}
        >
          {inEnquiry ? (
            <><CheckCircle2 className="w-3 h-3" /> Added to Quote</>
          ) : (
            <><MessageSquare className="w-3 h-3" /> Get B2B Quote</>
          )}
        </button>

        {/* Add to Cart — secondary */}
        <button
          onClick={handleCart}
          className={`w-full h-7 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all border ${
            cartAdded || inCart
              ? "text-green-700 border-green-200 bg-green-50 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800"
              : "text-muted-foreground border-border/60 hover:text-foreground hover:border-border"
          }`}
          data-testid={`button-setup-cart-${product.id}`}
        >
          {cartAdded || inCart ? (
            <><CheckCircle2 className="w-3 h-3" /> In Cart</>
          ) : (
            <><ShoppingCart className="w-3 h-3" /> Add to Cart</>
          )}
        </button>
      </div>
    </div>
  );
}

export function CategoryGrid() {
  const { products, categories } = useProducts();
  const [activeSetup, setActiveSetup] = useState("sensory-room");

  const activeInfo = SETUP_TYPES.find((s) => s.id === activeSetup)!;

  const filteredProducts = useMemo(() => {
    const slugs = SETUP_CATEGORY_MAP[activeSetup];
    const pool = slugs?.length ? products.filter((p) => slugs.includes(p.categorySlug)) : products;
    return pool.slice(0, 8);
  }, [activeSetup, products]);

  const totalCount = useMemo(() => {
    const slugs = SETUP_CATEGORY_MAP[activeSetup];
    return slugs?.length ? products.filter((p) => slugs.includes(p.categorySlug)).length : products.length;
  }, [activeSetup, products]);

  return (
    <section id="categories" className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 via-background to-background border-y" data-testid="section-categories">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4 bg-primary/10 px-3 py-1.5 rounded-full">🧩 Explore by Setup</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 font-display" data-testid="heading-categories">
            Shop by Setup Type
          </h2>
          <p className="text-base text-muted-foreground" data-testid="text-categories-desc">
            Find the right equipment tailored to your specific environment
          </p>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none sm:justify-center" data-testid="setup-tabs">
          {SETUP_TYPES.map((setup) => {
            const Icon = setup.icon;
            const active = activeSetup === setup.id;
            return (
              <button
                key={setup.id}
                type="button"
                onClick={() => setActiveSetup(setup.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer touch-manipulation ${
                  active
                    ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20"
                    : "bg-card text-foreground border-border/50 hover:border-primary/30 hover:bg-primary/5"
                }`}
                data-testid={`tab-setup-${setup.id}`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="hidden sm:inline">{setup.label}</span>
                <span className="sm:hidden">{setup.shortLabel}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${activeInfo.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
            <activeInfo.icon className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-foreground text-base leading-tight">{activeInfo.label}</p>
            <p className="text-sm text-muted-foreground truncate">{activeInfo.desc} &mdash; {totalCount} products</p>
          </div>
          <Link href="/enquiry" className="ml-auto hidden sm:block flex-shrink-0">
            <Button
              size="sm"
              variant="outline"
              className="rounded-full gap-1.5 text-xs whitespace-nowrap cursor-pointer touch-manipulation"
              data-testid={`button-setup-quote-${activeSetup}`}
            >
              {SETUP_CTA[activeSetup]}
              <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4" data-testid="setup-products-grid">
            {filteredProducts.map((product) => {
              const catTitle = categories.find((c) => c.slug === product.categorySlug)?.title || product.categorySlug;
              return (
                <SetupProductCard key={product.id} product={product} catTitle={catTitle} />
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-muted/30 rounded-xl aspect-square animate-pulse" />
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link href="/products">
            <Button
              variant="outline"
              className="rounded-full gap-2 cursor-pointer touch-manipulation"
              data-testid="button-see-all-products"
            >
              See all {totalCount} products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/enquiry">
            <Button
              className="rounded-full gap-2 cursor-pointer touch-manipulation"
              data-testid="button-get-bulk-quote"
            >
              {SETUP_CTA[activeSetup]}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
