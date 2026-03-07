import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { categories } from "@/lib/catalogue-data";

export function CategoryGrid() {
  return (
    <section id="categories" className="py-24 sm:py-32" data-testid="section-categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-4"
          >
            Product Range
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            data-testid="heading-categories"
          >
            Professional Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
            data-testid="text-categories-desc"
          >
            Explore our comprehensive range of therapy and rehabilitation equipment, built for professional use.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/category/${cat.slug}`}>
                <div
                  className="group relative bg-card rounded-3xl border border-border/50 overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.04] transition-all duration-500 cursor-pointer h-full"
                  data-testid={`card-category-${cat.slug}`}
                >
                  {cat.image && (
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        data-testid={`img-category-${cat.slug}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                      <span className="absolute top-3 right-3 text-xs font-bold text-primary bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                        {cat.products.length}
                      </span>
                    </div>
                  )}

                  <div className="relative z-10 p-6 pt-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-1.5" data-testid={`text-category-title-${cat.slug}`}>
                          {cat.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{cat.description.split('.')[0]}.</p>
                      </div>
                      {!cat.image && (
                        <span className="flex-shrink-0 text-xs font-bold text-primary bg-primary/[0.07] px-3 py-1.5 rounded-full ml-3">
                          {cat.products.length}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {cat.products.slice(0, 3).map((product) => (
                        <span
                          key={product.id}
                          className="text-xs px-2.5 py-1 rounded-full bg-muted/80 text-muted-foreground font-medium truncate max-w-[140px]"
                        >
                          {product.name.length > 25 ? product.name.substring(0, 25) + '...' : product.name}
                        </span>
                      ))}
                      {cat.products.length > 3 && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-primary/[0.06] text-primary font-medium">
                          +{cat.products.length - 3} more
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group/btn">
                      View Products
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
