import { useState, useMemo } from "react";
import { useParams, Link } from "wouter";
import { getCategoryBySlug, categories } from "@/lib/catalogue-data";
import type { CatalogueProduct } from "@/lib/catalogue-data";
import { ProductCard } from "@/components/product-card";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { ChevronRight, Grid3X3, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const category = getCategoryBySlug(params.slug);
  const [sort, setSort] = useState<SortOption>("best-selling");
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const sorted = useMemo(
    () => (category ? sortProducts(category.products, sort) : []),
    [category, sort]
  );

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-40 pb-20 text-center max-w-7xl mx-auto px-4">
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
      <main id="main-content">
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <p className="text-sm text-muted-foreground" data-testid="text-product-count">
                    {category.products.length} product{category.products.length !== 1 ? "s" : ""}
                  </p>
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

        <section className="pb-16 lg:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-foreground mb-4">Browse Other Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories
                .filter((c) => c.slug !== category.slug)
                .map((c) => (
                  <Link key={c.slug} href={`/category/${c.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer touch-manipulation"
                      data-testid={`button-other-category-${c.slug}`}
                    >
                      {c.title}
                    </Button>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
