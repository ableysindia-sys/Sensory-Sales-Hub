import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const qualityPoints = [
  { title: "Reinforced Stitching", desc: "Double and triple-stitched seams for maximum durability under daily professional use." },
  { title: "Durable Suspension Points", desc: "Engineered mounting hardware tested to exceed safety standards for swings and aerial equipment." },
  { title: "Premium Foam Density", desc: "High-density therapeutic foam that maintains shape and support through years of use." },
  { title: "Easy-Clean Finish", desc: "Wipeable, antimicrobial surfaces designed for clinical and institutional environments." },
  { title: "Safe Edges & Corners", desc: "Rounded, padded edges on all products to prevent injury during therapy sessions." },
  { title: "Long-Life Construction", desc: "Materials and assembly methods chosen for institutional-grade longevity." },
];

export function ManufacturingSection() {
  return (
    <section id="quality" className="py-24 sm:py-32 bg-card/50" data-testid="section-quality">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Engineering Quality</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6" data-testid="heading-quality">
              Built for Professional Use
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed" data-testid="text-quality-desc">
              Every product is engineered for everyday therapy. High-quality manufacturing, thoughtfully designed for durability, safety, and therapist-friendly operation.
            </p>

            <div className="relative aspect-[4/3] bg-gradient-to-br from-primary/8 to-primary/3 rounded-2xl border border-border/50 flex items-center justify-center" data-testid="container-quality-visual">
              <div className="text-center p-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-foreground mb-2">Precision Engineering</p>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  Every product undergoes rigorous quality testing before leaving our facility
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {qualityPoints.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 p-4 rounded-xl bg-background border border-border/50"
                data-testid={`quality-point-${i}`}
              >
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{point.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
