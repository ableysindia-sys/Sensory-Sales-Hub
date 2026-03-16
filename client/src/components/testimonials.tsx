import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Anand Kumar",
    role: "Pediatric OT, Bengaluru",
    text: "I confidently recommend Abley's to every family I work with. Durable, safe, and genuinely therapeutic.",
    title: "Therapist-Approved Quality",
  },
  {
    name: "Priya S.",
    role: "Parent, Mumbai",
    text: "My 7-year-old calls it his 'hug vest.' The difference in his focus and calmness is incredible.",
    title: "A Total Game-Changer",
  },
  {
    name: "Rina V.",
    role: "Special Education Teacher, Pune",
    text: "The sensory floor mats and fidgets have transformed my classroom. Students are calmer and more engaged.",
    title: "Essential for Inclusive Classrooms",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#070d2a] text-white py-14 sm:py-18" data-testid="section-testimonials">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(74,83,160,0.3),transparent)]" />
      <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-3 bg-amber-400/15 px-3 py-1.5 rounded-full border border-amber-400/20">⭐ Real Reviews</span>
          <h2 className="text-2xl sm:text-3xl font-bold !text-white font-display" data-testid="heading-testimonials">
            Loved by Families &amp; Therapists
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col hover:bg-white/8 hover:border-white/20 transition-all duration-200"
              data-testid={`card-testimonial-${i}`}
            >
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="font-bold !text-white text-sm mb-2" data-testid={`text-testimonial-title-${i}`}>
                {t.title}
              </h3>
              <p className="text-sm text-white/65 leading-relaxed flex-1 mb-5 italic" data-testid={`text-testimonial-body-${i}`}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-8 h-8 rounded-full bg-primary/50 border border-primary/30 flex items-center justify-center !text-white font-bold text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold !text-white" data-testid={`text-testimonial-name-${i}`}>{t.name}</p>
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
