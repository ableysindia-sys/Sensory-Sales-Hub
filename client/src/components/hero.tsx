import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { SITE_IMAGES } from "@/lib/catalogue-data";

const slides = [
  {
    image: SITE_IMAGES.hero,
    smallLabel: "Professional Therapy Equipment",
    heading: "Professional Therapy Tools for Experts",
    description: "Abley's Rehab equips therapists, centres, clinics, and institutions with high-quality, professionally designed tools for occupational therapy, movement, sensory integration, deep pressure, and rehabilitation.",
    motto: "When experts are equipped with professional tools, magic happens.",
    cta: { label: "Explore Categories", href: "/#categories" },
    secondaryCta: { label: "Bulk / Custom Enquiry", href: "/#enquiry" },
  },
  {
    image: SITE_IMAGES.heroSecondary,
    smallLabel: "Sensory Room Essentials",
    heading: "Create Calming Sensory Spaces",
    description: "From bubble tubes to weighted blankets, discover professional-grade deep pressure and visual sensory tools for therapy centres and sensory rooms.",
    cta: { label: "Deep Pressure Products", href: "/category/deep-pressure" },
  },
  {
    image: SITE_IMAGES.sensoryRoom,
    smallLabel: "Vestibular & Movement Equipment",
    heading: "Swings, Balance & Active Therapy",
    description: "Professional therapy swings, balance boards, and climbing structures for motor planning, vestibular input, and coordination development.",
    cta: { label: "Shop Swings & Movement", href: "/category/swings" },
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative w-full pt-[6.5rem]" data-testid="section-hero">
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden bg-gray-100">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <img
              src={s.image}
              alt={s.heading}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
              data-testid={`img-hero-slide-${i}`}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center px-6 max-w-3xl">
            <p
              className="text-sm sm:text-base font-medium text-white/90 tracking-widest uppercase mb-4"
              data-testid="text-hero-label"
            >
              {slide.smallLabel}
            </p>
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 font-display"
              data-testid="heading-hero"
            >
              {slide.heading}
            </h1>
            <p
              className="text-base sm:text-lg text-white/85 leading-relaxed mb-4 max-w-xl mx-auto"
              data-testid="text-hero-desc"
            >
              {slide.description}
            </p>
            {"motto" in slide && slide.motto && (
              <p
                className="text-sm sm:text-base italic text-white/70 mb-8 max-w-lg mx-auto"
                data-testid="text-hero-motto"
              >
                "{slide.motto}"
              </p>
            )}
            {!("motto" in slide) && <div className="mb-4" />}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href={slide.cta.href}>
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 rounded-none text-sm sm:text-base px-8 h-12 gap-2 font-medium tracking-wide"
                  data-testid="button-hero-cta"
                >
                  {slide.cta.label}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              {"secondaryCta" in slide && slide.secondaryCta && (
                <Link href={(slide as any).secondaryCta.href}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 rounded-none text-sm sm:text-base px-8 h-12 gap-2 font-medium tracking-wide bg-transparent"
                    data-testid="button-hero-secondary-cta"
                  >
                    {(slide as any).secondaryCta.label}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white/20 hover:bg-white/40 active:bg-white/50 text-white rounded-full transition-colors"
          data-testid="button-hero-prev"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-white/20 hover:bg-white/40 active:bg-white/50 text-white rounded-full transition-colors"
          data-testid="button-hero-next"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`h-3 rounded-full transition-all ${i === current ? "bg-white w-8" : "bg-white/50 hover:bg-white/70 w-3"}`}
              data-testid={`button-hero-dot-${i}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
