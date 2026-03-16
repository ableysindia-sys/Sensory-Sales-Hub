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
    <section className="relative overflow-hidden bg-[#070d2a] text-white py-16 sm:py-20" data-testid="section-testimonials">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(74,83,160,0.3),transparent)]" />
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
      <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-4 bg-amber-400/15 px-3 py-1.5 rounded-full border border-amber-400/20">⭐ Real Reviews</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display mb-2" data-testid="heading-testimonials">
            Loved by Parents &amp; Therapists
          </h2>
          <p className="text-white/50 text-sm">Trusted across 500+ OT clinics and families in India</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-7 flex flex-col hover:bg-white/8 hover:border-white/20 transition-all duration-200"
              data-testid={`card-testimonial-${i}`}
            >
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="font-bold text-white text-sm mb-3" data-testid={`text-testimonial-title-${i}`}>
                {t.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed flex-1 mb-5 italic" data-testid={`text-testimonial-body-${i}`}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-9 h-9 rounded-full bg-primary/50 border border-primary/30 flex items-center justify-center text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white" data-testid={`text-testimonial-name-${i}`}>{t.name}</p>
                  <p className="text-xs text-white/45">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
