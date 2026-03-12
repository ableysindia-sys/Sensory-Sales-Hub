import { useState, useMemo } from "react";
import { useParams, Link } from "wouter";
import type { CatalogueProduct } from "@/lib/catalogue-data";
import { useProducts } from "@/lib/product-provider";
import { ProductCard } from "@/components/product-card";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { ChevronRight, Grid3X3, LayoutGrid, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type SortOption = "best-selling" | "a-z" | "z-a" | "price-low" | "price-high";

function sortProducts(products: CatalogueProduct[], sort: SortOption): CatalogueProduct[] {
  const copy = [...products];
  switch (sort) {
    case "a-z":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "z-a":
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case "price-low":
      return copy.sort((a, b) => a.basePrice - b.basePrice);
    case "price-high":
      return copy.sort((a, b) => b.basePrice - a.basePrice);
    default:
      return copy;
  }
}

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const { getCategoryBySlug, categories, isLoading } = useProducts();
  const category = getCategoryBySlug(params.slug);
  const [sort, setSort] = useState<SortOption>("best-selling");
  const [gridCols, setGridCols] = useState<3 | 4>(4);
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
      <main id="main-content" className="pb-16 lg:pb-0">
        {category.image && (
          <div className="relative h-48 sm:h-56 lg:h-72 mt-[6.5rem] overflow-hidden" data-testid="section-category-banner">
            <img
              src={category.image.replace("width=600", "width=1920")}
              alt={category.title}
              className="w-full h-full object-cover"
              loading="eager"
              data-testid="img-category-banner"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 font-display"
                data-testid="heading-category"
              >
                {category.title}
              </h1>
              <p
                className="text-white/80 text-sm sm:text-base max-w-xl"
                data-testid="text-category-desc"
              >
                {category.description.split(".")[0]}.
              </p>
            </div>
          </div>
        )}

        {!category.image && (
          <section className="pt-36 pb-8" data-testid="section-category-header">
            <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" data-testid="breadcrumb">
                <Link href="/" className="transition-colors" data-testid="breadcrumb-home">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-foreground font-medium">{category.title}</span>
              </nav>
              <h1
                className="text-3xl sm:text-4xl font-bold text-foreground mb-2 font-display"
                data-testid="heading-category"
              >
                {category.title}
              </h1>
              <p className="text-muted-foreground" data-testid="text-category-desc">
                {category.description}
              </p>
            </div>
          </section>
        )}

        <section className="py-8" data-testid="section-product-grid">
          <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex lg:gap-8">
              <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0" data-testid="category-sidebar">
                <div className="sticky top-28">
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
              </aside>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
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
                    <p className="text-sm text-muted-foreground" data-testid="text-product-count">
                      {category.products.length} product{category.products.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-1 mr-2">
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
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-muted-foreground" htmlFor="sort-select">
                        Sort by:
                      </label>
                      <select
                        id="sort-select"
                        value={sort}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                        className="text-sm border border-border rounded-lg px-3 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                        data-testid="select-sort"
                      >
                        <option value="best-selling">Best selling</option>
                        <option value="a-z">Alphabetically, A-Z</option>
                        <option value="z-a">Alphabetically, Z-A</option>
                        <option value="price-low">Price, low to high</option>
                        <option value="price-high">Price, high to low</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div
                  className={`grid grid-cols-2 gap-3 sm:gap-4 ${
                    gridCols === 3
                      ? "sm:grid-cols-2 lg:grid-cols-3"
                      : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  }`}
                >
                  {sorted.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

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

      <SiteFooter />
    </div>
  );
}
