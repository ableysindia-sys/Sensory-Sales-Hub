import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Shield, Ruler } from "lucide-react";
import { Link } from "wouter";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium mb-8" data-testid="badge-hero">
              <Shield className="w-3.5 h-3.5" />
              B2B Professional Equipment
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight text-foreground mb-6" data-testid="heading-hero">
              Professional Therapy Tools{" "}
              <span className="text-primary">for Experts</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mb-4" data-testid="text-hero-desc">
              High-quality occupational therapy and rehabilitation tools for clinics, therapy centres, hospitals, and institutions.
            </p>

            <p className="text-base italic text-primary/80 font-medium mb-10" data-testid="text-hero-motto">
              "When experts are equipped with professional tools, magic happens."
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/category/swings">
                <Button
                  size="lg"
                  className="rounded-full text-base gap-2"
                  data-testid="button-hero-browse"
                >
                  Browse Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/enquiry">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full text-base"
                  data-testid="button-hero-enquiry"
                >
                  Bulk Enquiry
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-[520px] mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-[3rem]" />
              <div className="absolute inset-4 bg-card rounded-[2.5rem] border border-border/50 flex items-center justify-center" data-testid="container-hero-visual">
                <div className="grid grid-cols-2 gap-6 p-8">
                  <div className="space-y-6">
                    <div className="bg-background rounded-2xl p-5 border border-border/50 shadow-sm animate-float">
                      <Layers className="w-8 h-8 text-primary mb-3" />
                      <p className="text-xs font-medium text-muted-foreground">Swings</p>
                      <p className="text-lg font-bold text-foreground">7 Products</p>
                    </div>
                    <div className="bg-background rounded-2xl p-5 border border-border/50 shadow-sm animate-float" style={{ animationDelay: "1s" }}>
                      <Ruler className="w-8 h-8 text-primary mb-3" />
                      <p className="text-xs font-medium text-muted-foreground">Mats</p>
                      <p className="text-lg font-bold text-foreground">5 Products</p>
                    </div>
                  </div>
                  <div className="space-y-6 mt-8">
                    <div className="bg-background rounded-2xl p-5 border border-border/50 shadow-sm animate-float" style={{ animationDelay: "2s" }}>
                      <Shield className="w-8 h-8 text-primary mb-3" />
                      <p className="text-xs font-medium text-muted-foreground">Deep Pressure</p>
                      <p className="text-lg font-bold text-foreground">4 Products</p>
                    </div>
                    <div className="bg-primary/10 rounded-2xl p-5 border border-primary/20 animate-float" style={{ animationDelay: "3s" }}>
                      <p className="text-xs font-medium text-primary/70">Total Categories</p>
                      <p className="text-3xl font-bold text-primary">9</p>
                      <p className="text-xs text-primary/60 mt-1">Professional Lines</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
