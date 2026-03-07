import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Layers, Ruler, Weight, LayoutGrid } from "lucide-react";
import { Link } from "wouter";

const stats = [
  { icon: Layers, label: "Swings", value: "7", unit: "Products", delay: 0 },
  { icon: Ruler, label: "Mats", value: "5", unit: "Products", delay: 0.1 },
  { icon: Weight, label: "Deep Pressure", value: "4", unit: "Products", delay: 0.2 },
  { icon: LayoutGrid, label: "Total Categories", value: "9", unit: "Professional Lines", delay: 0.3 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A53A0]/[0.04] via-transparent to-[#4A53A0]/[0.02]" />
      <div className="absolute top-20 right-0 w-[800px] h-[800px] bg-[#4A53A0]/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4A53A0]/[0.02] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
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
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-bold leading-[1.06] tracking-tight text-foreground mb-6"
            data-testid="heading-hero"
          >
            Professional Therapy Tools{" "}
            <span className="bg-gradient-to-r from-[#4A53A0] to-[#6B72C0] bg-clip-text text-transparent">for Experts</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6"
            data-testid="text-hero-desc"
          >
            High-quality occupational therapy and rehabilitation tools for clinics, therapy centres, hospitals, and institutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="relative max-w-lg mx-auto mb-12"
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
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + stat.delay }}
              className={`group relative bg-background/80 backdrop-blur-sm rounded-2xl p-5 lg:p-6 border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-xl hover:shadow-primary/[0.06] transition-all duration-500 ${i === 3 ? 'bg-primary/[0.04] border-primary/[0.15]' : ''}`}
              data-testid={`stat-card-${i}`}
            >
              <stat.icon className={`w-6 h-6 mb-3 ${i === 3 ? 'text-primary' : 'text-primary/60'} group-hover:text-primary transition-colors`} />
              <p className="text-xs font-medium text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-2xl lg:text-3xl font-bold ${i === 3 ? 'text-primary' : 'text-foreground'}`}>{stat.value}</p>
              <p className={`text-xs mt-0.5 ${i === 3 ? 'text-primary/60' : 'text-muted-foreground/60'}`}>{stat.unit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
