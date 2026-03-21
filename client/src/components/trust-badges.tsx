import { Truck, ShieldCheck, HeadphonesIcon } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Pan-India Shipping",
    description: "Reliable shipping anywhere in India. If it's not the right fit, our return process makes it easy.",
  },
  {
    icon: ShieldCheck,
    title: "Certified Safe & Non-Toxic",
    description: "All our products are made from 100% food-grade, BPA-free materials, ensuring they are completely safe for your child.",
  },
  {
    icon: HeadphonesIcon,
    title: "Expert & Therapist-Guided Support",
    description: "Have questions? Our knowledgeable team is here to help you choose the perfect sensory tools for your child's specific needs.",
  },
];

export function TrustBadges() {
  return (
    <section className="py-16 sm:py-20 border-y border-border" data-testid="section-trust-badges">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {badges.map((b, i) => (
            <div key={i} className="text-center" data-testid={`trust-badge-${i}`}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground text-base mb-2" data-testid={`text-trust-title-${i}`}>
                {b.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
