import { motion } from "framer-motion";
import { Heart, Shield, Award, Users, Package, Settings } from "lucide-react";

const trustItems = [
  { icon: Award, label: "Made in India" },
  { icon: Heart, label: "Made with Love" },
  { icon: Shield, label: "6 Months Warranty" },
  { icon: Users, label: "Trusted by Professionals" },
  { icon: Package, label: "Bulk Orders Supported" },
  { icon: Settings, label: "Customization Available" },
];

export function TrustStrip() {
  return (
    <section className="py-8 sm:py-10 border-y border-border/30 bg-card/30" data-testid="section-trust">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 justify-center group"
              data-testid={`trust-item-${i}`}
            >
              <div className="w-8 h-8 rounded-lg bg-primary/[0.05] flex items-center justify-center group-hover:bg-primary/[0.1] transition-colors">
                <item.icon className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
              </div>
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
