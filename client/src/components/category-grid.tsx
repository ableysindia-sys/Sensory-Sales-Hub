import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Swings",
    description: "Vestibular input swings for therapy and sensory integration.",
    products: ["Bolster Swing", "T Swing", "Disc Swing", "Platform Swing", "Tube Swing", "Lycra Swing", "Acrobat Swing"],
    color: "from-blue-500/10 to-indigo-500/10",
  },
  {
    title: "Ballpool",
    description: "Therapeutic ballpools for sensory rooms and clinics.",
    products: ["4x4 Ballpool", "6x4 Ballpool"],
    color: "from-violet-500/10 to-purple-500/10",
  },
  {
    title: "Mats",
    description: "Safety and therapy mats for professional environments.",
    products: ["Crash Mat", "Therapy Mat", "Floormat", "Interlocking Mat", "Foldable Mat"],
    color: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "Movement & Balance",
    description: "Motor planning and balance training equipment.",
    products: ["Kidlite Barrel", "Balance Board", "Balance Beam", "Stepping Stone", "Wedges", "Jumping Stool", "Trampoline", "Ramp & Stairs"],
    color: "from-amber-500/10 to-orange-500/10",
  },
  {
    title: "Climbing",
    description: "Climbing structures for strength and coordination.",
    products: ["Climb Board", "Wall Bar Ladder", "Spider Climb Net"],
    color: "from-rose-500/10 to-pink-500/10",
  },
  {
    title: "ADL Kit",
    description: "Activities of Daily Living kits for functional training.",
    products: ["4 Page Kit", "5 Page Kit", "6 Page Kit"],
    color: "from-cyan-500/10 to-sky-500/10",
  },
  {
    title: "Therapy Balls",
    description: "Professional-grade therapy balls for rehabilitation.",
    products: ["Gym Ball", "Bosu Ball", "Peanut Ball", "Medicine Ball"],
    color: "from-green-500/10 to-emerald-500/10",
  },
  {
    title: "Deep Pressure",
    description: "Weighted products for proprioceptive input and calming.",
    products: ["Weighted Vest", "Weighted Blanket", "Sensory Sock", "Lap Pad"],
    color: "from-indigo-500/10 to-blue-500/10",
  },
  {
    title: "Visual",
    description: "Visual sensory equipment for therapy and sensory rooms.",
    products: ["Hexwall Touch Light", "Liquid Motion Tiles", "Glitter Pad", "Glitter Capillary", "Fibre Light", "Bubble Tube"],
    color: "from-purple-500/10 to-fuchsia-500/10",
  },
];

export function CategoryGrid() {
  return (
    <section id="categories" className="py-24 sm:py-32" data-testid="section-categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-4"
          >
            Product Range
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            data-testid="heading-categories"
          >
            Professional Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
            data-testid="text-categories-desc"
          >
            Explore our comprehensive range of therapy and rehabilitation equipment, built for professional use.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative bg-card rounded-2xl border border-border/50 p-6 transition-all duration-300"
              data-testid={`card-category-${i}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1" data-testid={`text-category-title-${i}`}>
                      {cat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{cat.description}</p>
                  </div>
                  <span className="flex-shrink-0 text-xs font-semibold text-primary bg-primary/8 px-2.5 py-1 rounded-full">
                    {cat.products.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {cat.products.map((product) => (
                    <span
                      key={product}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-medium"
                    >
                      {product}
                    </span>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-primary p-0 h-auto font-medium no-default-hover-elevate no-default-active-elevate"
                  onClick={() => document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" })}
                  data-testid={`button-category-view-${i}`}
                >
                  Enquire Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
