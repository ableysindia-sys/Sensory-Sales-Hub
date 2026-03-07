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
    <section className="py-8 border-y border-border/50 bg-card/50" data-testid="section-trust">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 justify-center"
              data-testid={`trust-item-${i}`}
            >
              <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
