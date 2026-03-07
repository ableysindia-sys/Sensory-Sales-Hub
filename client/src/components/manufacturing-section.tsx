import { motion } from "framer-motion";
import { Cpu, Scissors, Anchor, Layers, SprayCan, ShieldCheck, Clock } from "lucide-react";

const callouts = [
  { icon: Cpu, title: "Precision Engineering", desc: "Rigorous quality testing before leaving our facility.", position: "top-left" },
  { icon: Scissors, title: "Reinforced Stitching", desc: "Double and triple-stitched seams.", position: "top-right" },
  { icon: Anchor, title: "Durable Suspension Points", desc: "Exceeds safety standards for swings.", position: "mid-left" },
  { icon: Layers, title: "Premium Foam Density", desc: "Maintains shape through years of use.", position: "mid-right" },
  { icon: SprayCan, title: "Easy-Clean Finish", desc: "Antimicrobial, wipeable surfaces.", position: "bot-left" },
  { icon: ShieldCheck, title: "Safe Edges & Corners", desc: "Rounded, padded edges to prevent injury.", position: "bot-mid" },
  { icon: Clock, title: "Long-Life Construction", desc: "Institutional-grade longevity.", position: "bot-right" },
];

export function ManufacturingSection() {
  return (
    <section id="quality" className="py-24 sm:py-32 bg-card/30" data-testid="section-quality">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-4"
          >
            Engineering Quality
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            data-testid="heading-quality"
          >
            Built for Professional Use
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground leading-relaxed"
            data-testid="text-quality-desc"
          >
            Every product is engineered for everyday therapy. High-quality manufacturing, thoughtfully designed for durability, safety, and therapist-friendly operation.
          </motion.p>
        </div>

        <div className="hidden lg:block">
          <div className="relative max-w-5xl mx-auto">
            <div className="grid grid-cols-3 gap-x-24 gap-y-0 items-center">
              <div className="space-y-8">
                {callouts.slice(0, 3).map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-right group"
                    data-testid={`quality-point-${i}`}
                  >
                    <div className="flex items-start gap-3 justify-end">
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-primary/[0.06] border border-primary/[0.1] flex items-center justify-center flex-shrink-0 group-hover:bg-primary/[0.1] group-hover:border-primary/[0.2] transition-all">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-[2.5rem] bg-gradient-to-br from-primary/[0.06] to-primary/[0.02] border border-primary/[0.1] flex items-center justify-center" data-testid="container-quality-visual">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                      </svg>
                    </div>
                    <p className="text-base font-bold text-foreground mb-1">Precision Crafted</p>
                    <p className="text-xs text-muted-foreground">Professional Grade</p>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-8">
                {callouts.slice(3, 6).map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-left group"
                    data-testid={`quality-point-${i + 3}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/[0.06] border border-primary/[0.1] flex items-center justify-center flex-shrink-0 group-hover:bg-primary/[0.1] group-hover:border-primary/[0.2] transition-all">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex justify-center mt-8"
            >
              <div className="flex items-start gap-3 bg-background rounded-2xl border border-border/50 p-5 max-w-sm group" data-testid="quality-point-6">
                <div className="w-10 h-10 rounded-xl bg-primary/[0.06] border border-primary/[0.1] flex items-center justify-center flex-shrink-0 group-hover:bg-primary/[0.1] group-hover:border-primary/[0.2] transition-all">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{callouts[6].title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{callouts[6].desc}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="lg:hidden">
          <div className="grid sm:grid-cols-2 gap-4">
            {callouts.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 p-4 rounded-2xl bg-background border border-border/50"
                data-testid={`quality-point-mobile-${i}`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/[0.06] border border-primary/[0.1] flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
