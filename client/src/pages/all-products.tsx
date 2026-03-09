import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Search, X, ChevronDown, SlidersHorizontal, Grid3X3, LayoutGrid, Check } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { categories, getAllProducts } from "@/lib/catalogue-data";

const PRICE_RANGES = [
  { label: "Under ₹5,000", min: 0, max: 5000 },
  { label: "₹5,000 – ₹15,000", min: 5000, max: 15000 },
  { label: "₹15,000 – ₹30,000", min: 15000, max: 30000 },
  { label: "₹30,000 – ₹60,000", min: 30000, max: 60000 },
  { label: "Over ₹60,000", min: 60000, max: Infinity },
];

function FilterAccordion({
  title,
  children,
  defaultOpen = true,
  testId,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  testId: string;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = `filter-panel-${testId}`;
  return (
    <div className="border-b border-border/40 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3.5 text-left group cursor-pointer touch-manipulation"
        aria-expanded={isOpen}
        aria-controls={panelId}
        data-testid={`accordion-${testId}`}
      >
        <span className="text-sm font-semibold text-foreground">{title}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-label={title}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterCheckbox({
  label,
  count,
  checked,
  onChange,
  testId,
}: {
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
  testId: string;
}) {
  return (
    <label
      className="flex items-center gap-3 py-1.5 px-1 rounded-md cursor-pointer hover:bg-muted/40 transition-colors group touch-manipulation"
      data-testid={testId}
    >
      <span
        className={`w-[18px] h-[18px] rounded border-[1.5px] flex items-center justify-center flex-shrink-0 transition-all ${
          checked
            ? "bg-primary border-primary"
            : "border-muted-foreground/40 group-hover:border-muted-foreground/60"
        }`}
      >
        {checked && <Check className="w-3 h-3 text-primary-foreground" />}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="flex-1 text-sm text-foreground/80 group-hover:text-foreground transition-colors">
        {label}
      </span>
      <span className="text-xs text-muted-foreground/60 tabular-nums">{count}</span>
    </label>
  );
}

export default function AllProducts() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  const allProducts = useMemo(() => getAllProducts(), []);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const togglePriceRange = (index: number) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setSearch("");
  };

  const activeFilterCount = selectedCategories.length + selectedPriceRanges.length;

  const filteredProducts = useMemo(() => {
    let products = allProducts;

    if (selectedCategories.length > 0) {
      products = products.filter((p) => selectedCategories.includes(p.categorySlug));
    }

    if (selectedPriceRanges.length > 0) {
      products = products.filter((p) =>
        selectedPriceRanges.some((idx) => {
          const range = PRICE_RANGES[idx];
          return p.basePrice >= range.min && p.basePrice < range.max;
        })
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.categorySlug.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-low") {
      products = [...products].sort((a, b) => a.basePrice - b.basePrice);
    } else if (sortBy === "price-high") {
      products = [...products].sort((a, b) => b.basePrice - a.basePrice);
    } else if (sortBy === "name-az") {
      products = [...products].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-za") {
      products = [...products].sort((a, b) => b.name.localeCompare(a.name));
    }

    return products;
  }, [allProducts, selectedCategories, selectedPriceRanges, search, sortBy]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    const base = selectedPriceRanges.length > 0
      ? allProducts.filter((p) =>
          selectedPriceRanges.some((idx) => {
            const range = PRICE_RANGES[idx];
            return p.basePrice >= range.min && p.basePrice < range.max;
          })
        )
      : allProducts;
    categories.forEach((cat) => {
      counts[cat.slug] = base.filter((p) => p.categorySlug === cat.slug).length;
    });
    return counts;
  }, [allProducts, selectedPriceRanges]);

  const priceRangeCounts = useMemo(() => {
    const base = selectedCategories.length > 0
      ? allProducts.filter((p) => selectedCategories.includes(p.categorySlug))
      : allProducts;
    return PRICE_RANGES.map((range) =>
      base.filter((p) => p.basePrice >= range.min && p.basePrice < range.max).length
    );
  }, [allProducts, selectedCategories]);

  const filterSidebar = (
    <div className="space-y-0">
      <FilterAccordion title="Product Type" defaultOpen={true} testId="product-type">
        {categories.map((cat) => (
          <FilterCheckbox
            key={cat.slug}
            label={cat.title}
            count={categoryCounts[cat.slug] || 0}
            checked={selectedCategories.includes(cat.slug)}
            onChange={() => toggleCategory(cat.slug)}
            testId={`filter-category-${cat.slug}`}
          />
        ))}
      </FilterAccordion>

      <FilterAccordion title="Price" defaultOpen={true} testId="price">
        {PRICE_RANGES.map((range, i) => (
          <FilterCheckbox
            key={i}
            label={range.label}
            count={priceRangeCounts[i]}
            checked={selectedPriceRanges.includes(i)}
            onChange={() => togglePriceRange(i)}
            testId={`filter-price-${i}`}
          />
        ))}
      </FilterAccordion>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div id="main-content" className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 sm:py-8">
            <nav
              className="flex items-center gap-2 text-sm text-muted-foreground mb-6"
              data-testid="breadcrumb-products"
            >
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">All Products</span>
            </nav>

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <h1
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-1"
                  data-testid="heading-all-products"
                >
                  All Products
                </h1>
                <p className="text-sm text-muted-foreground" data-testid="text-products-count">
                  {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="relative max-w-xs w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search products"
                  className="w-full pl-10 pr-10 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                  data-testid="input-search-products"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer touch-manipulation"
                    data-testid="button-clear-search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex lg:gap-8">
              <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0" data-testid="filter-sidebar-desktop">
                <div className="sticky top-28">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Filter
                    </h2>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-primary hover:underline cursor-pointer touch-manipulation"
                        data-testid="button-clear-all-filters"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                  {filterSidebar}
                </div>
              </aside>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-5 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden gap-2 rounded-lg cursor-pointer touch-manipulation"
                    onClick={() => setMobileFiltersOpen(true)}
                    data-testid="button-open-mobile-filters"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filter
                    {activeFilterCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>

                  {activeFilterCount > 0 && (
                    <div className="hidden lg:flex items-center gap-2 flex-wrap flex-1 min-w-0">
                      {selectedCategories.map((slug) => {
                        const cat = categories.find((c) => c.slug === slug);
                        return (
                          <button
                            key={slug}
                            onClick={() => toggleCategory(slug)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors cursor-pointer touch-manipulation"
                            data-testid={`active-filter-${slug}`}
                          >
                            {cat?.title}
                            <X className="w-3 h-3" />
                          </button>
                        );
                      })}
                      {selectedPriceRanges.map((idx) => (
                        <button
                          key={`price-${idx}`}
                          onClick={() => togglePriceRange(idx)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors cursor-pointer touch-manipulation"
                          data-testid={`active-filter-price-${idx}`}
                        >
                          {PRICE_RANGES[idx].label}
                          <X className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 ml-auto">
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

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-sm border border-border rounded-lg px-3 py-1.5 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
                      data-testid="select-sort"
                    >
                      <option value="default">Best selling</option>
                      <option value="name-az">Alphabetically, A-Z</option>
                      <option value="name-za">Alphabetically, Z-A</option>
                      <option value="price-low">Price, low to high</option>
                      <option value="price-high">Price, high to low</option>
                    </select>
                  </div>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20" data-testid="empty-products">
                    <p className="text-lg text-muted-foreground mb-2">No products found</p>
                    <p className="text-sm text-muted-foreground/60 mb-6">
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="rounded-lg cursor-pointer touch-manipulation"
                      data-testid="button-clear-filters"
                    >
                      Clear all filters
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`grid grid-cols-2 gap-3 sm:gap-4 ${
                      gridCols === 3
                        ? "sm:grid-cols-2 lg:grid-cols-3"
                        : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    }`}
                  >
                    {filteredProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: Math.min(i * 0.02, 0.4) }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Product filters"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 bottom-0 w-[300px] max-w-[85vw] bg-background z-50 lg:hidden shadow-2xl flex flex-col"
              data-testid="filter-sidebar-mobile"
              onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Escape") setMobileFiltersOpen(false); }}
            >
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <h2 className="text-base font-semibold text-foreground">Filters</h2>
                <div className="flex items-center gap-3">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-primary hover:underline cursor-pointer touch-manipulation"
                      data-testid="button-mobile-clear-all"
                    >
                      Clear all
                    </button>
                  )}
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    aria-label="Close filters"
                    className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer touch-manipulation"
                    data-testid="button-close-mobile-filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-2">{filterSidebar}</div>
              <div className="p-4 border-t border-border/50">
                <Button
                  className="w-full rounded-lg cursor-pointer touch-manipulation"
                  onClick={() => setMobileFiltersOpen(false)}
                  data-testid="button-apply-filters"
                >
                  Show {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
