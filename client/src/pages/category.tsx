import { useState, useMemo } from "react";
import { useParams, Link } from "wouter";
import type { CatalogueProduct } from "@/lib/catalogue-data";
import { useProducts } from "@/lib/product-provider";
import { ProductCard } from "@/components/product-card";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import {
  ChevronRight, Grid3X3, LayoutGrid, List,
  SlidersHorizontal, X, MessageCircle, Send, FileText, Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const WHATSAPP_URL = "https://wa.me/917042180166?text=Hi%20Abley%27s%2C%20I%27m%20interested%20in%20bulk%20rehab%20equipment%20for%20my%20institution.";

type SortOption = "best-selling" | "a-z" | "z-a" | "price-low" | "price-high";

function sortProducts(products: CatalogueProduct[], sort: SortOption): CatalogueProduct[] {
  const copy = [...products];
  switch (sort) {
    case "a-z":      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "z-a":      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "price-low":  return copy.sort((a, b) => a.basePrice - b.basePrice);
    case "price-high": return copy.sort((a, b) => b.basePrice - a.basePrice);
    default:         return copy;
  }
}

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const { getCategoryBySlug, categories, isLoading } = useProducts();
  const category = getCategoryBySlug(params.slug);
  const [sort, setSort] = useState<SortOption>("best-selling");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [mobileGridCols, setMobileGridCols] = useState<1 | 2>(2);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);

  const sorted = useMemo(
    () => (category ? sortProducts(category.products, sort) : []),
    [category, sort]
  );

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

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 pb-20 text-center max-w-page mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-8">The category you're looking for doesn't exist.</p>
          <Link href="/">
            <Button data-testid="button-back-home">Back to Home</Button>
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pb-20 lg:pb-0">

        {/* ── Banner variant: image + gradient + breadcrumb + CTA ── */}
        {category.image && (
          <div
            className="relative h-52 sm:h-64 lg:h-80 mt-[6.5rem] overflow-hidden"
            data-testid="section-category-banner"
          >
            <img
              src={category.image.replace("width=600", "width=1920")}
              alt={category.title}
              className="w-full h-full object-cover"
              loading="eager"
              data-testid="img-category-banner"
            />
            {/* Directional gradient — left lane for content, bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

            {/* Content: breadcrumb + title + desc + CTA — bottom-left anchored */}
            <div className="absolute inset-0 flex flex-col justify-end px-5 sm:px-10 lg:px-14 pb-7 max-w-page mx-auto w-full">
              <nav
                className="flex items-center gap-1.5 text-[11px] text-white/55 mb-2.5"
                data-testid="breadcrumb"
              >
                <Link href="/" className="hover:text-white/85 transition-colors" data-testid="breadcrumb-home">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/products" className="hover:text-white/85 transition-colors" data-testid="breadcrumb-products">Products</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-white/85 font-medium">{category.title}</span>
              </nav>
              <h1
                className="text-2xl sm:text-4xl lg:text-5xl font-bold !text-white font-display mb-2 drop-shadow-lg"
                data-testid="heading-category"
              >
                {category.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <p
                  className="text-white/70 text-sm max-w-lg leading-relaxed"
                  data-testid="text-category-desc"
                >
                  {category.description.split(".")[0]}.
                </p>
                <Link href="/enquiry" className="flex-shrink-0" data-testid="link-banner-quote">
                  <Button
                    size="sm"
                    className="!bg-white !text-gray-900 hover:!bg-amber-50 rounded-full gap-2 !border-0 text-xs font-bold px-5 shadow-lg"
                    data-testid="button-banner-quote"
                  >
                    <FileText className="w-3.5 h-3.5" /> Get Category Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ── No-image header: eyebrow + title + B2B framing + CTA ── */}
        {!category.image && (
          <section className="pt-36 pb-6" data-testid="section-category-header">
            <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
              <nav
                className="flex items-center gap-2 text-sm text-muted-foreground mb-4"
                data-testid="breadcrumb"
              >
                <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link href="/products" className="hover:text-foreground transition-colors" data-testid="breadcrumb-products">Products</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-foreground font-medium">{category.title}</span>
              </nav>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary mb-2.5 bg-primary/10 px-3 py-1.5 rounded-full">
                    {category.products.length} products · Bulk pricing available
                  </span>
                  <h1
                    className="text-3xl sm:text-4xl font-bold text-foreground font-display mb-2"
                    data-testid="heading-category"
                  >
                    {category.title}
                  </h1>
                  <p className="text-muted-foreground max-w-xl" data-testid="text-category-desc">
                    {category.description}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link href="/enquiry">
                    <Button className="rounded-full gap-2 text-sm" data-testid="button-header-quote">
                      <Send className="w-3.5 h-3.5" /> Get Bulk Quote
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Product grid section ── */}
        <section className="py-6" data-testid="section-product-grid">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex lg:gap-8">

              {/* ── Desktop sidebar ── */}
              <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0" data-testid="category-sidebar">
                <div className="sticky top-28 space-y-5">

                  {/* B2B quote CTA */}
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/15">
                    <p className="text-xs font-bold text-primary mb-1">B2B Bulk Pricing</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                      Get custom pricing for {category.title} — with GST invoice and pan-India delivery.
                    </p>
                    <Link href="/enquiry" className="block mb-2" data-testid="link-sidebar-quote">
                      <Button size="sm" className="w-full rounded-lg gap-1.5 text-xs font-bold" data-testid="button-sidebar-quote">
                        <FileText className="w-3.5 h-3.5" /> Request a Quote
                      </Button>
                    </Link>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-400 py-1.5 rounded-lg border border-green-500/30 hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors"
                      data-testid="link-sidebar-whatsapp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
                    </a>
                  </div>

                  <div>
                    <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Browse Categories
                    </h2>
                    <nav className="space-y-0.5">
                      <Link href="/products">
                        <span
                          className="block py-2 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
                          data-testid="sidebar-link-all"
                        >
                          All Products
                        </span>
                      </Link>
                      {categories.map((c) => (
                        <Link key={c.slug} href={`/category/${c.slug}`}>
                          <span
                            className={`block py-2 px-3 rounded-lg text-sm transition-colors cursor-pointer ${
                              c.slug === category.slug
                                ? "bg-primary/10 text-primary font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                            }`}
                            data-testid={`sidebar-category-${c.slug}`}
                          >
                            {c.title}
                            <span className="text-xs text-muted-foreground/60 ml-1.5">
                              ({c.products.length})
                            </span>
                          </span>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </aside>

              {/* ── Main content area ── */}
              <div className="flex-1 min-w-0">

                {/* Toolbar */}
                <div className="flex items-center justify-between mb-4 gap-2 flex-wrap" data-testid="toolbar-category">
                  <div className="flex items-center gap-2">
                    {/* Mobile: Categories drawer trigger */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="lg:hidden gap-2 rounded-lg cursor-pointer touch-manipulation"
                      onClick={() => setMobileCategoriesOpen(true)}
                      data-testid="button-open-mobile-categories"
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                      Categories
                    </Button>

                    {/* Mobile: 1-col / 2-col grid toggle */}
                    <div className="flex items-center gap-0.5 lg:hidden">
                      <button
                        onClick={() => setMobileGridCols(1)}
                        aria-label="1-column list"
                        className={`p-1.5 rounded transition-colors cursor-pointer touch-manipulation ${mobileGridCols === 1 ? "text-foreground bg-muted/60" : "text-muted-foreground/50 hover:text-muted-foreground"}`}
                        data-testid="button-mobile-grid-1"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setMobileGridCols(2)}
                        aria-label="2-column grid"
                        className={`p-1.5 rounded transition-colors cursor-pointer touch-manipulation ${mobileGridCols === 2 ? "text-foreground bg-muted/60" : "text-muted-foreground/50 hover:text-muted-foreground"}`}
                        data-testid="button-mobile-grid-2"
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-sm text-muted-foreground" data-testid="text-product-count">
                      {category.products.length} product{category.products.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Desktop: 3-col / 4-col toggle */}
                    <div className="hidden sm:flex items-center gap-1 mr-1">
                      <button
                        onClick={() => setGridCols(3)}
                        aria-label="3-column grid"
                        className={`p-1.5 rounded transition-colors cursor-pointer touch-manipulation ${gridCols === 3 ? "text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"}`}
                        data-testid="button-grid-3"
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setGridCols(4)}
                        aria-label="4-column grid"
                        className={`p-1.5 rounded transition-colors cursor-pointer touch-manipulation ${gridCols === 4 ? "text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"}`}
                        data-testid="button-grid-4"
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Sort — label hidden on mobile */}
                    <label className="hidden sm:block text-sm text-muted-foreground" htmlFor="sort-select">
                      Sort:
                    </label>
                    <select
                      id="sort-select"
                      value={sort}
                      onChange={(e) => setSort(e.target.value as SortOption)}
                      className="text-sm border border-border rounded-lg px-3 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                      data-testid="select-sort"
                    >
                      <option value="best-selling">Best selling</option>
                      <option value="a-z">A–Z</option>
                      <option value="z-a">Z–A</option>
                      <option value="price-low">Price: low → high</option>
                      <option value="price-high">Price: high → low</option>
                    </select>
                  </div>
                </div>

                {/* B2B strip — between toolbar and grid */}
                <div
                  className="mb-5 px-4 py-3 rounded-xl bg-primary/5 border border-primary/15 flex items-center justify-between gap-3"
                  data-testid="banner-b2b-strip"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground leading-snug">Ordering for your institution?</p>
                    <p className="text-xs text-muted-foreground truncate">Bulk pricing · GST invoice · pan-India delivery</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link href="/enquiry" data-testid="link-strip-quote">
                      <Button size="sm" className="rounded-lg gap-1.5 text-xs font-bold h-8 px-3" data-testid="button-strip-quote">
                        <Send className="w-3 h-3" /> Get Quote
                      </Button>
                    </Link>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-green-600 dark:text-green-400 h-8 px-3 rounded-lg border border-green-500/35 hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors"
                      data-testid="link-strip-whatsapp"
                    >
                      <MessageCircle className="w-3 h-3" /> WhatsApp
                    </a>
                  </div>
                </div>

                {/* Product grid or empty state */}
                {sorted.length > 0 ? (
                  <div
                    className={`grid gap-3 sm:gap-4 ${
                      mobileGridCols === 1 ? "grid-cols-1" : "grid-cols-2"
                    } ${
                      gridCols === 3
                        ? "sm:grid-cols-2 lg:grid-cols-3"
                        : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    }`}
                    data-testid="product-grid"
                  >
                    {sorted.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center" data-testid="empty-state-category">
                    <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mb-5">
                      <Package className="w-7 h-7 text-muted-foreground/60" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1.5">No products here yet</h3>
                    <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
                      Try a different category, or contact us — we may have exactly what you need.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <Link href="/products">
                        <Button variant="outline" className="rounded-full px-6" data-testid="button-empty-browse-all">
                          Browse All Products
                        </Button>
                      </Link>
                      <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 h-10 rounded-full border border-green-500/40 text-green-600 dark:text-green-400 text-sm font-semibold hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors"
                        data-testid="link-empty-whatsapp"
                      >
                        <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Mobile categories drawer ── */}
      <AnimatePresence>
        {mobileCategoriesOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setMobileCategoriesOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Browse categories"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] max-w-[85vw] bg-background z-50 lg:hidden shadow-2xl flex flex-col"
              data-testid="category-sidebar-mobile"
              onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Escape") setMobileCategoriesOpen(false); }}
            >
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <h2 className="text-base font-semibold text-foreground">Categories</h2>
                <button
                  onClick={() => setMobileCategoriesOpen(false)}
                  aria-label="Close categories"
                  className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer touch-manipulation"
                  data-testid="button-close-mobile-categories"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
                <Link href="/products" onClick={() => setMobileCategoriesOpen(false)}>
                  <span
                    className="block py-2.5 px-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
                    data-testid="mobile-sidebar-link-all"
                  >
                    All Products
                  </span>
                </Link>
                {categories.map((c) => (
                  <Link key={c.slug} href={`/category/${c.slug}`} onClick={() => setMobileCategoriesOpen(false)}>
                    <span
                      className={`block py-2.5 px-3 rounded-lg text-sm transition-colors cursor-pointer ${
                        c.slug === category.slug
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      }`}
                      data-testid={`mobile-sidebar-category-${c.slug}`}
                    >
                      {c.title}
                      <span className="text-xs text-muted-foreground/60 ml-1.5">
                        ({c.products.length})
                      </span>
                    </span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Sticky mobile CTA bar ── */}
      <div
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-background/95 backdrop-blur-sm border-t border-border/60 px-4 pt-3 pb-4 flex gap-3"
        data-testid="bar-sticky-mobile-category"
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-green-500/50 text-green-600 dark:text-green-400 text-sm font-semibold hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors flex-shrink-0"
          data-testid="button-sticky-whatsapp"
        >
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
        <Link href="/enquiry" className="flex-1">
          <Button
            className="w-full h-11 rounded-xl text-sm font-bold gap-2"
            data-testid="button-sticky-quote"
          >
            <Send className="w-3.5 h-3.5" /> Get a B2B Quote
          </Button>
        </Link>
      </div>

      <SiteFooter />
    </div>
  );
}
