import { motion } from "framer-motion";
import { Building2, Shield, Wrench, SprayCan, Settings, Package, MapPin, Award } from "lucide-react";

const features = [
  { icon: Building2, title: "Institutional Grade", desc: "Built to withstand the demands of busy therapy centres and hospitals." },
  { icon: Shield, title: "High Durability", desc: "Materials and construction chosen for years of daily professional use." },
  { icon: Wrench, title: "Therapist Friendly", desc: "Designed in consultation with practising therapists for optimal functionality." },
  { icon: SprayCan, title: "Easy to Clean", desc: "Antimicrobial, wipeable surfaces ideal for clinical environments." },
  { icon: Settings, title: "Customizable", desc: "Products can be tailored to specific therapy needs and environments." },
  { icon: Package, title: "Bulk Ordering", desc: "Competitive pricing and streamlined logistics for institutional orders." },
  { icon: MapPin, title: "Made in India", desc: "Proudly manufactured in India with international quality standards." },
  { icon: Award, title: "6 Months Warranty", desc: "All products backed by our comprehensive quality warranty." },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32" data-testid="section-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-4"
          >
            Why Choose Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            data-testid="heading-features"
          >
            The Abley's Advantage
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Every detail is considered to deliver the best experience for professionals and their clients.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group text-center p-6 lg:p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/[0.04] transition-all duration-500"
              data-testid={`feature-card-${i}`}
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-primary/[0.06] border border-primary/[0.08] flex items-center justify-center group-hover:bg-primary/[0.1] group-hover:border-primary/[0.15] group-hover:scale-110 transition-all duration-500">
                <feat.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
