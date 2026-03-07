import { motion } from "framer-motion";

export function ClientLogos() {
  return (
    <section className="py-20 sm:py-24 bg-card/30 border-y border-border/30" data-testid="section-clients">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Our Clients</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground" data-testid="heading-clients">
            Trusted by Centres, Clinics & Institutions
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 lg:gap-5 max-w-4xl mx-auto">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="aspect-[2.5/1] bg-muted/30 rounded-2xl border border-border/20 flex items-center justify-center grayscale opacity-50 hover:opacity-70 hover:grayscale-0 transition-all duration-500"
              data-testid={`logo-placeholder-${i}`}
            >
              <div className="text-center">
                <div className="w-10 h-6 mx-auto mb-1.5 rounded bg-muted/60" />
                <p className="text-[9px] text-muted-foreground/30 font-medium tracking-wider uppercase">Partner</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
