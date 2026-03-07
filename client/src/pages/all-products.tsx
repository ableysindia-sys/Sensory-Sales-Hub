import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { categories, getAllProducts } from "@/lib/catalogue-data";

export default function AllProducts() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  const allProducts = useMemo(() => getAllProducts(), []);

  const filteredProducts = useMemo(() => {
    let products = selectedCategory === "all"
      ? allProducts
      : allProducts.filter(p => p.categorySlug === selectedCategory);

    if (search.trim()) {
      const q = search.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.categorySlug.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-low") {
      products = [...products].sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === "price-high") {
      products = [...products].sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === "name") {
      products = [...products].sort((a, b) => a.name.localeCompare(b.name));
    }

    return products;
  }, [allProducts, selectedCategory, search, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 sm:py-12">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" data-testid="breadcrumb-products">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-medium">All Products</span>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3" data-testid="heading-all-products">
                All Products
              </h1>
              <p className="text-lg text-muted-foreground" data-testid="text-products-count">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-full border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  data-testid="input-search-products"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    data-testid="button-clear-search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-border rounded-full px-4 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary/30"
                    data-testid="select-sort"
                  >
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8" data-testid="category-filters">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="rounded-full"
                data-testid="filter-all"
              >
                All ({allProducts.length})
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat.slug}
                  variant={selectedCategory === cat.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className="rounded-full"
                  data-testid={`filter-${cat.slug}`}
                >
                  {cat.title} ({cat.products.length})
                </Button>
              ))}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16" data-testid="empty-products">
                <p className="text-lg text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={() => { setSearch(""); setSelectedCategory("all"); }}
                  className="rounded-full"
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.03, 0.5) }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
