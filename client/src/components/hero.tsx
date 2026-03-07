import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { SITE_IMAGES } from "@/lib/catalogue-data";

const slides = [
  {
    image: SITE_IMAGES.hero,
    smallLabel: "Sensory & Adaptable Clothing",
    heading: "Introducing Abley's Adaptive Clothing",
    description: "Thoughtfully designed apparel that adapts to comfort, sensitivity, and everyday needs. Because everyone deserves to feel comfortable.",
    cta: { label: "Explore Our Collection", href: "/products" },
  },
  {
    image: SITE_IMAGES.heroSecondary,
    smallLabel: "Winter Break Essentials",
    heading: "Keep the Calm at Home",
    description: "Discover the magic of Minky. Our textured pillows and blankets provide the tactile input and deep pressure needed for restful days and nights.",
    cta: { label: "Explore Minky Collection", href: "/category/deep-pressure" },
  },
  {
    image: SITE_IMAGES.sensoryRoom,
    smallLabel: "Give the Gift of Calm this Season.",
    heading: "Meaningful Gifts, Peaceful Moments",
    description: "This season, wrap them in comfort. Discover therapist-approved tools designed to turn holiday overwhelm into sensory joy.",
    cta: { label: "Shop Sensory Gifts", href: "/products" },
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
              className="text-base sm:text-lg text-white/85 leading-relaxed mb-8 max-w-xl mx-auto"
              data-testid="text-hero-desc"
            >
              {slide.description}
            </p>
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
          </div>
        </div>

        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors"
          data-testid="button-hero-prev"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors"
          data-testid="button-hero-next"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"}`}
              data-testid={`button-hero-dot-${i}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
