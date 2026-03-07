import { motion } from "framer-motion";
import { SITE_IMAGES } from "@/lib/catalogue-data";

const showcaseImages = [
  { src: SITE_IMAGES.workshop, alt: "Abley's workshop" },
  { src: SITE_IMAGES.getStarted, alt: "Get started with therapy" },
  { src: SITE_IMAGES.sensoryRoom, alt: "Sensory room setup" },
  { src: SITE_IMAGES.diy, alt: "DIY therapy tools" },
  { src: SITE_IMAGES.productShowcase, alt: "Product showcase" },
  { src: SITE_IMAGES.weightedVest, alt: "Weighted vest" },
];

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
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">Our Work</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground" data-testid="heading-clients">
            Built for Centres, Clinics & Institutions
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-5 max-w-4xl mx-auto">
          {showcaseImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group aspect-[3/2] rounded-2xl overflow-hidden border border-border/20 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-500"
              data-testid={`showcase-image-${i}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 overflow-hidden rounded-2xl border border-border/30 shadow-sm"
        >
          <img
            src={SITE_IMAGES.shopBanner}
            alt="Abley's India Shop"
            className="w-full h-32 sm:h-40 lg:h-48 object-cover"
            loading="lazy"
            data-testid="img-shop-banner"
          />
        </motion.div>
      </div>
    </section>
  );
}
