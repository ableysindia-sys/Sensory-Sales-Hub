import { motion } from "framer-motion";
import { Wrench, Eye, Activity, Mic, CheckCircle2, Clock } from "lucide-react";

const verticals = [
  { icon: Wrench, title: "OT Tools", status: "Live", statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950 dark:border-emerald-800", description: "Comprehensive occupational therapy equipment for professional environments." },
  { icon: Eye, title: "Sensory Room", status: "Coming Soon", statusColor: "text-muted-foreground bg-muted/60 border-border/50", description: "Complete sensory room solutions with lighting, textures, and interactive elements." },
  { icon: Activity, title: "Physiotherapy", status: "Coming Soon", statusColor: "text-muted-foreground bg-muted/60 border-border/50", description: "Professional physiotherapy equipment for clinics and rehabilitation centres." },
  { icon: Mic, title: "Speech Tools", status: "Coming Soon", statusColor: "text-muted-foreground bg-muted/60 border-border/50", description: "Specialized tools for speech and language therapy professionals." },
];

export function RoadmapSection() {
  return (
    <section className="py-24 sm:py-32 bg-card/30" data-testid="section-roadmap">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-primary uppercase tracking-wider mb-4"
          >
            Platform Growth
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            data-testid="heading-roadmap"
          >
            Expanding Our Professional Range
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            We're building the most comprehensive professional therapy equipment platform.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {verticals.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-background rounded-3xl border p-7 text-center transition-all duration-500 ${v.status === "Live" ? "border-emerald-200 dark:border-emerald-800 hover:shadow-xl hover:shadow-emerald-500/[0.05]" : "border-border/50 opacity-80"}`}
              data-testid={`roadmap-card-${i}`}
            >
              <div className={`w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center ${v.status === "Live" ? "bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800" : "bg-primary/[0.06] border border-primary/[0.08]"}`}>
                <v.icon className={`w-7 h-7 ${v.status === "Live" ? "text-emerald-600 dark:text-emerald-400" : "text-primary/60"}`} />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-lg">{v.title}</h3>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{v.description}</p>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border ${v.statusColor}`}>
                {v.status === "Live" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                {v.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
