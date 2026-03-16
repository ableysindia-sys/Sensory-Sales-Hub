import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Star } from "lucide-react";
import { Link } from "wouter";
import heroBannerImg from "@assets/generated_images/hero-banner.png";

export function Hero() {
  return (
    <section className="relative w-full" data-testid="section-hero">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBannerImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          loading="eager"
          data-testid="img-hero"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/82 to-black/92 sm:hidden" />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/90 via-black/68 to-black/15" />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-page mx-auto px-5 sm:px-10 lg:px-14 w-full
                      pt-28 pb-10
                      sm:pt-32 sm:pb-14
                      lg:pt-40 lg:pb-20">
        <div className="max-w-[540px]">

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

          {/* Descriptor */}
          <p
            className="text-sm sm:text-[1.05rem] text-white/85 leading-relaxed mb-6 sm:mb-7 max-w-[420px]"
            data-testid="text-hero-desc"
          >
            Premium sensory &amp; rehab equipment — handpicked by occupational therapists, loved by families across India.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-7">
            <Link href="/products">
              <Button
                size="lg"
                className="!bg-white !text-gray-900 hover:!bg-gray-50 rounded-full text-sm px-8 h-12 gap-2 font-semibold shadow-xl shadow-black/30 !border-0 w-full sm:w-auto justify-center"
                data-testid="button-hero-cta"
              >
                Shop All Products <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <button
              onClick={() =>
                document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
              }
              className="h-12 px-7 rounded-full border border-white/30 text-white text-sm font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto justify-center flex items-center gap-2"
              data-testid="button-hero-browse"
            >
              Browse by Category
            </button>
          </div>

          {/* Trust callouts */}
          <div className="sm:hidden grid grid-cols-3 gap-2">
            {[
              { icon: Truck,       text: "Free\nShipping" },
              { icon: ShieldCheck, text: "OT-\nApproved" },
              { icon: Star,        text: "500+\nFamilies" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-white/8 border border-white/12 py-3 px-2 text-center"
              >
                <Icon className="w-4 h-4 text-white/60 flex-shrink-0" />
                <span className="text-[10px] leading-tight text-white/55 whitespace-pre-line">{text}</span>
              </div>
            ))}
          </div>

          <div className="hidden sm:flex flex-wrap gap-x-4 gap-y-1.5">
            {[
              { icon: Truck,       text: "Free shipping pan-India" },
              { icon: ShieldCheck, text: "OT-approved products" },
              { icon: Star,        text: "Loved by 500+ families" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-xs text-white/60">
                <Icon className="w-3.5 h-3.5 text-white/45" />
                {text}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
