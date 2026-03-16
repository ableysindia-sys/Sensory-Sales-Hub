import { Star, BadgeCheck } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Anand Kumar",
    role: "Pediatric OT · Bengaluru",
    text: "Abley's is my go-to supplier for every clinic I consult. Consistent quality, prompt delivery, and the bulk pricing is genuinely competitive.",
    title: "My Go-To OT Equipment Supplier",
    verified: "OT Clinic · 3 yrs customer",
  },
  {
    name: "Priya Mehta",
    role: "Principal · Green Valley Special School, Pune",
    text: "We set up an entire sensory room through Abley's. The team was helpful with product selection and the GST billing made institutional procurement effortless.",
    title: "Seamless Sensory Room Setup",
    verified: "School · 2 yrs customer",
  },
  {
    name: "Rahul Sharma",
    role: "Manager · Healing Hands Rehab Centre, Delhi",
    text: "Ordered 40+ units for our new facility. Got a custom quote within hours, delivery in under a week. Exceptional service for institutional buyers.",
    title: "Fast Bulk Order, Zero Hassle",
    verified: "Rehab Centre · 1 yr customer",
  },
];

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#070d2a] text-white py-14 sm:py-20" data-testid="section-testimonials">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(74,83,160,0.3),transparent)]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
      <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 mb-4 bg-amber-400/15 px-3 py-1.5 rounded-full border border-amber-400/20">⭐ Verified Reviews</span>
          <h2 className="text-2xl sm:text-3xl font-bold !text-white font-display mb-2" data-testid="heading-testimonials">
            Trusted by 500+ Institutions
          </h2>
          <p className="text-white/50 text-sm">OT clinics, schools, hospitals &amp; rehab centres across India</p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-7 flex flex-col hover:bg-white/8 hover:border-white/20 transition-all duration-200"
              data-testid={`card-testimonial-${i}`}
            >
              <div className="flex items-center gap-0.5 mb-3">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="font-bold !text-white text-sm mb-2.5" data-testid={`text-testimonial-title-${i}`}>
                {t.title}
              </h3>
              <p className="text-sm text-white/65 leading-relaxed flex-1 mb-5 italic" data-testid={`text-testimonial-body-${i}`}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-9 h-9 rounded-full bg-primary/50 border border-primary/30 flex items-center justify-center !text-white font-bold text-sm flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold !text-white" data-testid={`text-testimonial-name-${i}`}>{t.name}</p>
                  <p className="text-xs text-white/45 truncate">{t.role}</p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <span className="flex items-center gap-1 text-[10px] text-green-400/80 font-medium">
                    <BadgeCheck className="w-3 h-3" /> {t.verified}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
