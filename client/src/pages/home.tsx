import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProductCard } from "@/components/product-card";
import { LeadForm } from "@/components/lead-form";
import { useProducts } from "@/hooks/use-products";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />
      
      <main>
        <Hero />

        {/* Products Section */}
        <section id="products" className="py-24 sm:py-32 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-display font-medium text-foreground mb-6"
                data-testid="heading-products"
              >
                Curated for Comfort
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground"
                data-testid="text-products-desc"
              >
                Explore our gentle collection of sensory-friendly tools, designed to ground you in the present moment.
              </motion.p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center min-h-[400px]" data-testid="state-loading">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center p-12 bg-destructive/5 rounded-3xl border border-destructive/10" data-testid="state-error">
                <p className="text-destructive font-medium">Unable to load products at this time.</p>
              </div>
            ) : products?.length === 0 ? (
              <div className="text-center p-12 bg-muted rounded-3xl border border-border" data-testid="state-empty">
                <p className="text-muted-foreground font-medium">New collection arriving soon.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {products?.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Lead Gen Section */}
        <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-secondary/30 -skew-y-3 transform origin-bottom-left" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <LeadForm />
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-12 md:py-16" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2" data-testid="container-footer-brand">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="text-primary w-4 h-4" data-testid="icon-footer-brand" />
            </div>
            <span className="font-display font-semibold text-lg tracking-tight" data-testid="text-footer-brand">
              AuraSensory
            </span>
          </div>
          <p className="text-background/60 text-sm" data-testid="text-footer-copy">
            © {new Date().getFullYear()} AuraSensory. Crafted for calm.
          </p>
        </div>
      </footer>
    </div>
  );
}
