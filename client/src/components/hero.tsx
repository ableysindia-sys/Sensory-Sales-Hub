import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Users } from "lucide-react";
import { Link } from "wouter";
import { PhoneSignupInline } from "@/components/phone-signup-inline";
import heroBannerImg from "@assets/generated_images/hero-banner.png";

export function Hero() {
  return (
    <section className="relative w-full pt-[6.5rem]" data-testid="section-hero">
      <div className="relative w-full h-auto min-h-[70vh] sm:min-h-[80vh] lg:min-h-[88vh] overflow-hidden">

        <img
          src={heroBannerImg}
          alt="Professional therapy room with rehabilitation equipment"
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          data-testid="img-hero"
        />

        {/* Layered gradient — strong left dark, fades right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

        <div className="relative z-20 flex items-center h-full">
          <div className="max-w-page mx-auto px-6 sm:px-10 lg:px-14 w-full py-16 sm:py-20 lg:py-24">
            <div className="max-w-[540px]">

              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/90 text-white text-[11px] font-semibold tracking-[0.12em] uppercase mb-5 shadow-lg"
                data-testid="text-hero-label"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                OT-Approved Therapy Equipment
              </div>

              {/* Headline */}
              <h1
                className="text-3xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.08] mb-4 font-display drop-shadow-xl"
                data-testid="heading-hero"
              >
                Tools That Help<br />
                Children{" "}
                <span className="italic text-amber-300">Thrive.</span>
              </h1>

              {/* Descriptor */}
              <p
                className="text-sm sm:text-[1.05rem] text-white/85 leading-relaxed mb-6 max-w-[420px]"
                data-testid="text-hero-desc"
              >
                Premium sensory, movement &amp; rehabilitation equipment for OT clinics, schools, and families across India.
              </p>

              {/* Browse products CTA (secondary role now) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-7">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-50 rounded-full text-sm sm:text-base px-8 h-12 gap-2 font-semibold shadow-xl shadow-black/30 border-0 w-full sm:w-auto"
                  data-testid="button-hero-cta"
                  onClick={() =>
                    document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Shop Products <ArrowRight className="w-4 h-4" />
                </Button>
                <Link href="/enquiry" data-testid="link-hero-b2b">
                  <span className="text-white/80 hover:text-white text-sm font-medium underline underline-offset-2 flex items-center gap-1 transition-colors cursor-pointer">
                    Institution or clinic? Get a bulk quote →
                  </span>
                </Link>
              </div>

              {/* ── Primary lead capture ── */}
              <div className="rounded-2xl bg-white/8 backdrop-blur-sm border border-white/12 p-4 sm:p-5 mb-6">
                <PhoneSignupInline
                  variant="dark"
                  label="Get offers, new arrivals & order updates"
                  sublabel="Register in seconds — free, no spam"
                  containerId="recaptcha-hero"
                  className="w-full"
                />
              </div>

              {/* Compact trust strip */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5">
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

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
