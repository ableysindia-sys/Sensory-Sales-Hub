import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { categories } from "@/lib/catalogue-data";

export function CategoryGrid() {
  return (
    <section id="categories" className="py-16 sm:py-20" data-testid="section-categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 font-display"
            data-testid="heading-categories"
          >
            Professional Therapy Categories
          </h2>
          <p className="text-base text-muted-foreground" data-testid="text-categories-desc">
            Browse our complete range of therapy and rehabilitation equipment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
            >
              <div
                className="group relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.04] transition-all duration-500 cursor-pointer h-full flex flex-col"
                data-testid={`card-category-${cat.slug}`}
              >
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  {cat.image && (
                    <img
                      src={cat.image.replace("width=600", "width=800")}
                      alt={cat.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      data-testid={`img-category-${cat.slug}`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    <span className="text-xs font-semibold text-gray-800">{cat.products.length} products</span>
                  </div>
                </div>

                <div className="flex-1 p-5">
                  <h3
                    className="font-bold text-foreground text-lg mb-1.5"
                    data-testid={`text-category-title-${cat.slug}`}
                  >
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                    {cat.description.split('.')[0]}.
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cat.products.slice(0, 6).map((product) => (
                      <span
                        key={product.id}
                        className="text-xs px-2 py-0.5 bg-muted/60 text-muted-foreground rounded-full border border-border/30"
                        data-testid={`label-product-${product.id}`}
                      >
                        {product.name}
                      </span>
                    ))}
                    {cat.products.length > 6 && (
                      <span className="text-xs px-2 py-0.5 text-primary font-medium">
                        +{cat.products.length - 6} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
                    View Products
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
