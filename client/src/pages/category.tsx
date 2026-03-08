import { useState, useMemo } from "react";
import { useParams, Link } from "wouter";
import { getCategoryBySlug, categories } from "@/lib/catalogue-data";
import type { CatalogueProduct } from "@/lib/catalogue-data";
import { ProductCard } from "@/components/product-card";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { ChevronRight } from "lucide-react";
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

  const sorted = useMemo(
    () => category ? sortProducts(category.products, sort) : [],
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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 font-display" data-testid="heading-category">
                {category.title}
              </h1>
              <p className="text-white/80 text-sm sm:text-base max-w-xl" data-testid="text-category-desc">
                {category.description.split(".")[0]}.
              </p>
            </div>
          </div>
        )}

        {!category.image && (
          <section className="pt-36 pb-8" data-testid="section-category-header">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" data-testid="breadcrumb">
                <Link href="/" className="transition-colors" data-testid="breadcrumb-home">Home</Link>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-foreground font-medium">{category.title}</span>
              </nav>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 font-display" data-testid="heading-category">
                {category.title}
              </h1>
              <p className="text-muted-foreground" data-testid="text-category-desc">{category.description}</p>
            </div>
          </section>
        )}

        <section className="py-8" data-testid="section-product-grid">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <p className="text-sm text-muted-foreground" data-testid="text-product-count">
                {category.products.length} products
              </p>
              <div className="flex items-center gap-2">
                <label className="text-sm text-muted-foreground" htmlFor="sort-select">Sort by:</label>
                <select
                  id="sort-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="text-sm border border-border rounded px-3 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
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

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-lg font-bold text-foreground mb-4">Browse Other Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories.filter((c) => c.slug !== category.slug).map((c) => (
                <Link key={c.slug} href={`/category/${c.slug}`}>
                  <Button
                    variant="outline"
                    size="sm"
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
