import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Truck, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import heroBannerImg from "@assets/generated_images/hero-banner.png";

export function Hero() {
  return (
    <section className="relative w-full pt-[6.5rem]" data-testid="section-hero">
      <div className="relative w-full h-[62vh] sm:h-[72vh] lg:h-[82vh] overflow-hidden">

        {/* Background image */}
        <img
          src={heroBannerImg}
          alt="Professional therapy room with rehabilitation equipment"
          className="w-full h-full object-cover object-center scale-[1.02]"
          loading="eager"
          data-testid="img-hero"
        />

        {/* Left-to-right dark gradient — strong on text side */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/10" />
        {/* Bottom vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Top vignette — subtle */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-page mx-auto px-6 sm:px-10 lg:px-14 w-full">
            <div className="max-w-xl">

              {/* Eyebrow pill badge */}
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white text-[11px] font-semibold tracking-[0.15em] uppercase mb-5 shadow-lg"
                data-testid="text-hero-label"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                OT-Approved Therapy Equipment
              </div>

              {/* Headline */}
              <h1
                className="text-3xl sm:text-[2.75rem] lg:text-[3.5rem] font-bold text-white leading-[1.1] mb-4 font-display drop-shadow-lg"
                data-testid="heading-hero"
              >
                Tools That Help<br />
                Children{" "}
                <span className="italic text-amber-300">Thrive.</span>
              </h1>

              {/* Single-sentence descriptor */}
              <p
                className="text-sm sm:text-base text-white/85 leading-relaxed mb-7 max-w-md drop-shadow-sm"
                data-testid="text-hero-desc"
              >
                Premium sensory, movement &amp; rehabilitation equipment — trusted by 500+ occupational therapists across India.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-50 rounded-full text-sm sm:text-base px-7 h-12 gap-2 font-semibold shadow-xl shadow-black/30 border-0"
                  data-testid="button-hero-cta"
                  onClick={() =>
                    document
                      .getElementById("categories")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Shop Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Link href="/enquiry">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-white/50 text-white hover:bg-white/10 hover:border-white/70 rounded-full text-sm sm:text-base px-7 h-12 gap-2 font-medium bg-transparent backdrop-blur-sm"
                    data-testid="button-hero-secondary-cta"
                  >
                    Bulk / B2B Enquiry
                  </Button>
                </Link>
              </div>

              {/* Trust stats row */}
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <span className="flex items-center gap-1.5 text-xs text-white/65">
                  <Package className="w-3.5 h-3.5 text-white/50" />
                  <span className="font-bold text-white">116+</span> Products
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/65">
                  <Truck className="w-3.5 h-3.5 text-white/50" />
                  <span className="font-bold text-white">Free</span> Shipping Pan India
                </span>
                <span className="flex items-center gap-1.5 text-xs text-white/65">
                  <ShieldCheck className="w-3.5 h-3.5 text-white/50" />
                  <span className="font-bold text-white">500+</span> OTs Served
                </span>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
