import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { Link } from "wouter";
import { SITE_IMAGES } from "@/lib/catalogue-data";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A53A0]/[0.04] via-transparent to-[#4A53A0]/[0.02]" />
      <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-[#4A53A0]/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4A53A0]/[0.02] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/[0.06] border border-primary/[0.12] text-primary text-sm font-semibold mb-8 backdrop-blur-sm" data-testid="badge-hero">
                <Shield className="w-3.5 h-3.5" />
                B2B Professional Equipment
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.06] tracking-tight text-foreground mb-6"
              data-testid="heading-hero"
            >
              Professional Therapy Tools{" "}
              <span className="bg-gradient-to-r from-[#4A53A0] to-[#6B72C0] bg-clip-text text-transparent">for Experts</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-6"
              data-testid="text-hero-desc"
            >
              High-quality occupational therapy and rehabilitation tools for clinics, therapy centres, hospitals, and institutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="relative max-w-lg mx-auto lg:mx-0 mb-10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl blur-sm" />
              <p className="relative text-base lg:text-lg italic text-primary/80 font-medium py-4 px-6" data-testid="text-hero-motto">
                "When experts are equipped with professional tools, magic happens."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/#categories">
                <Button
                  size="lg"
                  className="rounded-full text-base gap-2 px-8 h-12 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
                  data-testid="button-hero-browse"
                >
                  Browse Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/#enquiry">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full text-base px-8 h-12 border-border/60 hover:border-primary/30 hover:bg-primary/[0.04] transition-all duration-300"
                  data-testid="button-hero-enquiry"
                >
                  Bulk Enquiry
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-border/30">
              <img
                src={SITE_IMAGES.hero}
                alt="Professional therapy and rehabilitation equipment by Abley's Rehab"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="eager"
                data-testid="img-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-2xl overflow-hidden border-4 border-background shadow-xl">
              <img
                src={SITE_IMAGES.productShowcase}
                alt="Product showcase"
                className="w-full h-full object-cover"
                loading="eager"
                data-testid="img-hero-inset"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 lg:mt-20 relative rounded-2xl overflow-hidden lg:hidden"
        >
          <img
            src={SITE_IMAGES.hero}
            alt="Professional therapy equipment"
            className="w-full h-48 sm:h-64 object-cover rounded-2xl"
            loading="eager"
            data-testid="img-hero-mobile"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent rounded-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
