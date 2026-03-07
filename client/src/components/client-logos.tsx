import { motion } from "framer-motion";

export function ClientLogos() {
  return (
    <section className="py-20 bg-card/50 border-y border-border/50" data-testid="section-clients">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Our Clients</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground" data-testid="heading-clients">
            Trusted by Centres, Clinics & Institutions
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="aspect-[3/1.5] bg-muted/50 rounded-xl border border-border/30 flex items-center justify-center"
              data-testid={`logo-placeholder-${i}`}
            >
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-1 rounded-md bg-muted" />
                <p className="text-[10px] text-muted-foreground/40 font-medium">Client Logo</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
