import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import type { CatalogueProduct } from "@/lib/catalogue-data";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: CatalogueProduct[];
}

export function ProductCarousel({ title, subtitle, products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.7;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12 sm:py-16" data-testid={`section-carousel-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display" data-testid={`heading-${title.toLowerCase().replace(/\s+/g, "-")}`}>
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm sm:text-base text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
              data-testid={`button-scroll-left-${title.toLowerCase().replace(/\s+/g, "-")}`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors"
              data-testid={`button-scroll-right-${title.toLowerCase().replace(/\s+/g, "-")}`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[260px] sm:w-[280px] snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
