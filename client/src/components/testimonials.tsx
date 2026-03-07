import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Anand Kumar",
    role: "Pediatric OT",
    text: "As a pediatric occupational therapist, I'm constantly searching for sensory tools that are durable, safe, and truly effective. I can now confidently recommend this store to the families I work with, knowing these tools are designed with a child's therapeutic needs in mind.",
    title: "Therapist-Approved Quality and Safety",
  },
  {
    name: "Priya S.",
    role: "Parent",
    text: "The weighted vest has been a complete game-changer for our family. My 7-year-old calls it his 'hug vest,' and the difference in his focus during homework and calmness during transitions is just incredible.",
    title: "A Complete Game-Changer for Our Family",
  },
  {
    name: "Rina V.",
    role: "Special Education Teacher",
    text: "These tools have transformed my classroom. The sensory floor mats are perfect for our regulation corner, and having a variety of durable fidgets helps my students stay engaged during lessons.",
    title: "Essential Tools for an Inclusive Classroom",
  },
];

export function Testimonials() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50 dark:bg-muted/30" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display mb-2" data-testid="heading-testimonials">
            Loved by Parents & Therapists
          </h2>
          <div className="w-12 h-0.5 bg-primary mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-background rounded-lg border border-border p-6 lg:p-8 flex flex-col"
              data-testid={`card-testimonial-${i}`}
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h3 className="font-bold text-foreground text-base mb-3" data-testid={`text-testimonial-title-${i}`}>
                {t.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5" data-testid={`text-testimonial-body-${i}`}>
                {t.text}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground" data-testid={`text-testimonial-name-${i}`}>{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
