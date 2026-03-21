import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import type { CatalogueProduct } from "@/lib/catalogue-data";

interface ProductCarouselProps {
  title?: string;
  subtitle?: string;
  products: CatalogueProduct[];
  hideHeader?: boolean;
  mobileGrid?: boolean;
}

export function ProductCarousel({ title, subtitle, products, hideHeader, mobileGrid }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionId = title ? title.toLowerCase().replace(/\s+/g, "-") : "products";

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.7;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const content = (
    <>
      {!hideHeader && (
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display" data-testid={`heading-${sectionId}`}>
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm sm:text-base text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-border hover:bg-muted active:bg-muted/80 transition-colors"
              data-testid={`button-scroll-left-${sectionId}`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full border border-border hover:bg-muted active:bg-muted/80 transition-colors"
              data-testid={`button-scroll-right-${sectionId}`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile 2-col grid — only when mobileGrid prop is set */}
      {mobileGrid && (
        <div className="sm:hidden grid grid-cols-2 gap-3 mb-2">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className={mobileGrid ? "hidden sm:block relative" : "relative"}>
        {hideHeader && (
          <div className="absolute right-0 -top-12 flex gap-2 z-10">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-muted active:bg-muted/80 transition-colors"
              data-testid="button-scroll-left-showcase"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border hover:bg-muted active:bg-muted/80 transition-colors"
              data-testid="button-scroll-right-showcase"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
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
    </>
  );

  if (hideHeader) {
    return content;
  }

  return (
    <section className="py-12 sm:py-16" data-testid={`section-carousel-${sectionId}`}>
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  );
}
