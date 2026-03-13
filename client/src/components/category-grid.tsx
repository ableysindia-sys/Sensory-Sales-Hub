import { useState, useMemo } from "react";
import { ArrowRight, Hospital, GraduationCap, Sparkles, Home, Dumbbell, Building2 } from "lucide-react";
import { Link } from "wouter";
import { useProducts } from "@/lib/product-provider";
import { Button } from "@/components/ui/button";

const SETUP_TYPES = [
  { id: "sensory-room",   label: "Sensory Room",   shortLabel: "Sensory",  icon: Sparkles,       color: "from-violet-500 to-purple-600", desc: "Complete sensory integration rooms" },
  { id: "therapy-centre", label: "Therapy Centre",  shortLabel: "Clinic",   icon: Hospital,       color: "from-blue-500 to-indigo-600",   desc: "OT clinics & rehab facilities" },
  { id: "school",         label: "School",          shortLabel: "School",   icon: GraduationCap,  color: "from-green-500 to-emerald-600", desc: "Special education & inclusive classrooms" },
  { id: "home-setup",     label: "Home Setup",      shortLabel: "Home",     icon: Home,           color: "from-amber-500 to-orange-600",  desc: "Home-based therapy corners" },
  { id: "gym-fitness",    label: "Gym / Fitness",   shortLabel: "Gym",      icon: Dumbbell,       color: "from-red-500 to-rose-600",      desc: "Rehab gyms & fitness centres" },
  { id: "other",          label: "Browse All",      shortLabel: "All",      icon: Building2,      color: "from-gray-500 to-slate-600",    desc: "All product categories" },
];

const SETUP_CATEGORY_MAP: Record<string, string[]> = {
  "sensory-room":   ["swings", "ballpool", "visual", "deep-pressure", "mats", "climbing"],
  "therapy-centre": ["swings", "therapy-balls", "deep-pressure", "movement-balance", "mats"],
  "school":         ["deep-pressure", "visual", "movement-balance", "therapy-balls", "adl-kit"],
  "home-setup":     ["swings", "deep-pressure", "therapy-balls", "visual"],
  "gym-fitness":    ["climbing", "movement-balance", "therapy-balls", "mats"],
  "other":          [],
};

const SETUP_CTA: Record<string, string> = {
  "sensory-room":   "Get a sensory room quote",
  "therapy-centre": "Get a clinic setup quote",
  "school":         "Get a school setup quote",
  "home-setup":     "Get a home setup quote",
  "gym-fitness":    "Get a gym setup quote",
  "other":          "Get a custom quote",
};

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
              const hasDiscount = product.comparePrice && product.comparePrice > product.basePrice;
              return (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div
                    className="group bg-card rounded-xl border border-border/50 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.06] transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col"
                    data-testid={`card-setup-product-${product.id}`}
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted/40">
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
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <p className="text-[10px] font-semibold text-primary/70 uppercase tracking-wider mb-1 truncate">{catTitle}</p>
                      <p className="text-sm font-semibold text-foreground leading-snug mb-2 line-clamp-2 flex-1">{product.name}</p>
                      <div className="flex items-baseline gap-1.5">
                        <p className="text-sm font-bold text-foreground">
                          ₹{product.basePrice.toLocaleString("en-IN")}
                        </p>
                        {hasDiscount && (
                          <p className="text-xs text-muted-foreground line-through">
                            ₹{product.comparePrice!.toLocaleString("en-IN")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
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
