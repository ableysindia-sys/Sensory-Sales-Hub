import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Users } from "lucide-react";
import heroBannerImg from "@assets/generated_images/hero-banner.png";

export function Hero() {
  return (
    <section className="relative w-full" data-testid="section-hero">
      {/* Background layer — fills behind all content */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBannerImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          loading="eager"
          data-testid="img-hero"
        />
        {/* Mobile: heavier top-to-bottom dark so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/80 to-black/90 sm:hidden" />
        {/* Desktop: side dark + bottom vignette */}
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/90 via-black/65 to-black/15" />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-t from-black/65 via-transparent to-black/10" />
      </div>

      {/* Content — natural height, padded for navbar + breathing room */}
      <div className="relative z-10 max-w-page mx-auto px-5 sm:px-10 lg:px-14 w-full
                      pt-28 pb-10
                      sm:pt-32 sm:pb-14
                      lg:pt-40 lg:pb-20">
        <div className="max-w-[520px]">

          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/90 text-white text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase mb-4 shadow-lg"
            data-testid="text-hero-label"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            OT-Approved Therapy Equipment
          </div>

          {/* Headline */}
          <h1
            className="text-[2rem] sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.1] mb-3 sm:mb-4 font-display drop-shadow-xl"
            data-testid="heading-hero"
          >
            Tools That Help<br />
            Children{" "}
            <span className="italic text-amber-300">Thrive.</span>
          </h1>

          {/* Descriptor — shorter on mobile */}
          <p
            className="text-sm sm:text-[1.05rem] text-white/85 leading-relaxed mb-5 sm:mb-6 max-w-[400px]"
            data-testid="text-hero-desc"
          >
            Premium sensory &amp; rehab equipment for OT clinics, schools, and families across India.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-3 mb-6">
            <Button
              size="lg"
              className="!bg-white !text-gray-900 hover:!bg-gray-50 rounded-full text-sm px-8 h-12 gap-2 font-semibold shadow-xl shadow-black/30 !border-0"
              data-testid="button-hero-cta"
              onClick={() =>
                document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop Products <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Trust strip — hidden on xs, shown sm+ */}
          <div className="hidden sm:flex flex-wrap gap-x-4 gap-y-1.5">
            {[
              { icon: Truck, text: "Free shipping pan-India" },
              { icon: ShieldCheck, text: "OT-approved products" },
              { icon: Users, text: "500+ therapists trust us" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-xs text-white/60">
                <Icon className="w-3.5 h-3.5 text-white/45" />
                {text}
              </span>
            ))}
          </div>

          {/* Mobile trust — single compact row */}
          <div className="flex sm:hidden items-center justify-between text-[11px] text-white/50 px-1">
            <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Free shipping</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> OT-approved</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> 500+ OTs</span>
          </div>

        </div>
      </div>
    </section>
  );
}
