import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Users } from "lucide-react";
import { Link } from "wouter";
import heroBannerImg from "@assets/generated_images/hero-banner.png";

export function Hero() {
  return (
    <section
      className="relative w-full bg-[#070d2a] overflow-hidden"
      data-testid="section-hero"
    >
      {/* subtle radial glow behind text */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row">

        {/* ── LEFT: Text panel ── */}
        <div className="flex-1 flex flex-col justify-center
                        px-5 pt-28 pb-12
                        sm:px-10 sm:pt-36 sm:pb-16
                        lg:pl-14 lg:pr-10 lg:py-24 lg:max-w-[580px]">

          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/80 text-white text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase mb-5 shadow-lg self-start"
            data-testid="text-hero-label"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            OT-Approved Therapy Equipment
          </div>

          {/* Headline */}
          <h1
            className="text-[2.15rem] sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.08] mb-4 font-display"
            data-testid="heading-hero"
          >
            Tools That Help<br />
            Children{" "}
            <span className="italic text-amber-300">Thrive.</span>
          </h1>

          {/* Descriptor */}
          <p
            className="text-sm sm:text-[1.05rem] text-white/70 leading-relaxed mb-7 max-w-[420px]"
            data-testid="text-hero-desc"
          >
            Premium sensory &amp; rehab equipment for OT clinics,
            schools, and families across India.
          </p>

          {/* CTA row — stacks on mobile, side-by-side on sm+ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            <Button
              size="lg"
              className="!bg-white !text-gray-900 hover:!bg-gray-50 rounded-full text-sm px-8 h-12 gap-2 font-semibold shadow-xl shadow-black/30 !border-0 w-full sm:w-auto justify-center"
              data-testid="button-hero-cta"
              onClick={() =>
                document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Shop Products <ArrowRight className="w-4 h-4" />
            </Button>

            <Link href="/lp" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="ghost"
                className="!text-white/80 hover:!text-white hover:!bg-white/10 rounded-full text-sm px-6 h-12 font-medium !border border-white/20 w-full justify-center"
                data-testid="button-hero-b2b"
              >
                B2B / Bulk orders
              </Button>
            </Link>
          </div>

          {/* Trust callouts — pill grid on mobile, inline row on desktop */}
          <div className="sm:hidden grid grid-cols-3 gap-2">
            {[
              { icon: Truck,       text: "Free\nshipping" },
              { icon: ShieldCheck, text: "OT-\napproved" },
              { icon: Users,       text: "500+\ntherapists" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-white/6 border border-white/10 py-3 px-2 text-center"
              >
                <Icon className="w-4 h-4 text-primary/70 flex-shrink-0" />
                <span className="text-[10px] leading-tight text-white/55 whitespace-pre-line">{text}</span>
              </div>
            ))}
          </div>

          <div className="hidden sm:flex flex-wrap gap-x-5 gap-y-2">
            {[
              { icon: Truck,       text: "Free shipping pan-India" },
              { icon: ShieldCheck, text: "OT-approved products" },
              { icon: Users,       text: "500+ therapists trust us" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-xs text-white/50">
                <Icon className="w-3.5 h-3.5 text-white/35" />
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Image panel (desktop only) ── */}
        <div className="hidden lg:block relative w-[52%] flex-shrink-0 min-h-[600px]">
          {/* left-edge fade blends image into the dark text panel */}
          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#070d2a] to-transparent z-10" />
          {/* bottom fade to ground it */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#070d2a]/70 to-transparent z-10" />
          <img
            src={heroBannerImg}
            alt="Therapy room with sensory swings, mats, and rehab equipment"
            className="w-full h-full object-cover object-left"
            loading="eager"
            data-testid="img-hero"
          />
        </div>

        {/* Mobile image strip — small teaser below text */}
        <div className="lg:hidden relative h-52 sm:h-64 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#070d2a] to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#070d2a]/80 to-transparent z-10" />
          <img
            src={heroBannerImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[center_30%]"
            loading="eager"
          />
        </div>

      </div>
    </section>
  );
}
