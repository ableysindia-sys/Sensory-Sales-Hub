import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import heroBannerImg from "@assets/generated_images/hero-banner.png";

export function Hero() {
  return (
    <section className="relative w-full pt-[6.5rem]" data-testid="section-hero">
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden bg-gray-100">
        <img
          src={heroBannerImg}
          alt="Professional therapy room with rehabilitation equipment"
          className="w-full h-full object-cover"
          loading="eager"
          data-testid="img-hero"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10" />

        <div className="absolute inset-0 z-20 flex items-center">
          <div className="max-w-page mx-auto px-6 sm:px-8 lg:px-12 w-full">
            <div className="max-w-2xl">
              <p
                className="text-xs sm:text-sm font-semibold text-white/85 tracking-[0.2em] uppercase mb-4"
                data-testid="text-hero-label"
              >
                Professional Therapy Equipment
              </p>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[1.1] mb-5 font-display"
                data-testid="heading-hero"
              >
                Professional Therapy Tools for Experts
              </h1>
              <p
                className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed mb-3 max-w-lg"
                data-testid="text-hero-desc"
              >
                Equipping therapists, centres, clinics, and institutions with
                high-quality tools for occupational therapy, movement, sensory
                integration, and rehabilitation.
              </p>
              <p
                className="text-sm italic text-white/60 mb-8"
                data-testid="text-hero-motto"
              >
                "When experts are equipped with professional tools, magic happens."
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 rounded-none text-sm sm:text-base px-8 h-12 gap-2 font-medium tracking-wide"
                  data-testid="button-hero-cta"
                  onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explore Categories
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Link href="/enquiry">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 rounded-none text-sm sm:text-base px-8 h-12 gap-2 font-medium tracking-wide bg-transparent"
                    data-testid="button-hero-secondary-cta"
                  >
                    Bulk / Custom Enquiry
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
