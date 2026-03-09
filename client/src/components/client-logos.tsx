import { motion } from "framer-motion";
import {
  Building2,
  Sparkles,
  GraduationCap,
  Hospital,
  Stethoscope,
  Heart,
  Baby,
  HandHeart,
  MessageCircle,
  Activity,
  Landmark,
  Users,
} from "lucide-react";

const clientTypes = [
  { name: "Rehab Centre", icon: Building2 },
  { name: "Sensory Gym", icon: Sparkles },
  { name: "Special School", icon: GraduationCap },
  { name: "Paediatric Hospital", icon: Hospital },
  { name: "Therapy Clinic", icon: Stethoscope },
  { name: "Autism Centre", icon: Heart },
  { name: "Child Development", icon: Baby },
  { name: "OT Practice", icon: HandHeart },
  { name: "Speech Clinic", icon: MessageCircle },
  { name: "Physiotherapy Centre", icon: Activity },
  { name: "Government Hospital", icon: Landmark },
  { name: "NGO Foundation", icon: Users },
];

export function ClientLogos() {
  return (
    <section className="py-20 sm:py-24 bg-card/30 border-y border-border/30" data-testid="section-clients">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-5 max-w-5xl mx-auto">
          {clientTypes.map((client, i) => {
            const Icon = client.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl bg-background border border-border/40 hover:border-primary/20 hover:shadow-md transition-all duration-500 aspect-[4/3]"
                data-testid={`client-logo-${i}`}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/[0.04] flex items-center justify-center group-hover:bg-primary/[0.08] transition-colors">
                  <Icon className="w-6 h-6 text-primary/40 group-hover:text-primary/70 transition-colors" />
                </div>
                <span className="text-xs font-medium text-muted-foreground text-center leading-tight">{client.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
