import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { categories } from "@/lib/catalogue-data";

export function CategoryGrid() {
  const featured = categories.slice(0, 5);

  return (
    <section id="categories" className="py-16 sm:py-20" data-testid="section-categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 font-display"
            data-testid="heading-categories"
          >
            Our Top Rated Collections
          </h2>
          <p className="text-base text-muted-foreground" data-testid="text-categories-desc">
            Sensory Tools for Calm and Focus
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {featured.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              <div
                className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer h-full"
                data-testid={`card-category-${cat.slug}`}
              >
                {cat.image && (
                  <img
                    src={cat.image.replace("width=600", "width=1024")}
                    alt={cat.title}
                    className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${i === 0 ? "min-h-[400px] lg:min-h-full" : "min-h-[200px] lg:min-h-[240px]"}`}
                    loading="lazy"
                    data-testid={`img-category-${cat.slug}`}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-5">
                  <h3
                    className={`font-bold text-white mb-0.5 ${i === 0 ? "text-xl lg:text-2xl" : "text-sm lg:text-base"}`}
                    data-testid={`text-category-title-${cat.slug}`}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-white/70 text-xs lg:text-sm">
                    {cat.products.length} products
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/products">
            <button
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              data-testid="link-view-all-collections"
            >
              View All Collections
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
