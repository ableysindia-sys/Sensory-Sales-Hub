import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-card rounded-3xl border border-border/50 p-6 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.04] transition-all duration-500"
              data-testid={`card-category-${i}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-1.5" data-testid={`text-category-title-${i}`}>
                      {cat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cat.description.split('.')[0]}.</p>
                  </div>
                  <span className="flex-shrink-0 text-xs font-bold text-primary bg-primary/[0.07] px-3 py-1.5 rounded-full ml-3">
                    {cat.products.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cat.products.slice(0, 5).map((product) => (
                    <span
                      key={product.id}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted/80 text-muted-foreground font-medium"
                    >
                      {product.name}
                    </span>
                  ))}
                  {cat.products.length > 5 && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-primary/[0.06] text-primary font-medium">
                      +{cat.products.length - 5} more
                    </span>
                  )}
                </div>

                <Link href={`/category/${cat.slug}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-primary p-0 h-auto font-semibold group/btn"
                    data-testid={`button-category-view-${i}`}
                  >
                    View Products
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
