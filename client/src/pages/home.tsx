import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";

import { CategoryGrid } from "@/components/category-grid";
import { ProductCarousel } from "@/components/product-carousel";
import { ManufacturingSection } from "@/components/manufacturing-section";

import { Testimonials } from "@/components/testimonials";
import { TrustBadges } from "@/components/trust-badges";

import { BulkEnquiryForm } from "@/components/bulk-enquiry-form";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SITE_IMAGES } from "@/lib/catalogue-data";
import { useProducts } from "@/lib/product-provider";
import featuredSwingsImg from "@assets/generated_images/featured-swings-banner.png";

function FeaturedSwings() {
  return (
    <section className="py-12 sm:py-16" data-testid="section-featured-swings">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/category/swings">
          <div className="relative overflow-hidden rounded-xl group cursor-pointer">
            <div className="aspect-[21/9] sm:aspect-[3/1]">
              <img
                src={featuredSwingsImg}
                alt="Professional therapy swings collection"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                loading="lazy"
                data-testid="img-featured-swings"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 sm:px-12 lg:px-16 max-w-lg">
                <p className="text-xs sm:text-sm font-semibold text-white/80 uppercase tracking-wider mb-2">Featured Collection</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 font-display" data-testid="heading-featured-swings">
                  Therapy Swings
                </h2>
                <p className="text-sm sm:text-base text-white/80 mb-4 hidden sm:block">
                  Professional-grade vestibular input swings for clinics, therapy centres, and sensory rooms.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all">
                  Explore Collection <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

function ProductShowcase() {
  const { getNewArrivals, getBestSellers } = useProducts();
  const [activeTab, setActiveTab] = useState<"new" | "best">("new");
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();
  const activeProducts = activeTab === "new" ? newArrivals : bestSellers;

  return (
    <section className="py-14 sm:py-20" data-testid="section-product-showcase">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground font-display" data-testid="heading-product-showcase">
              Our Products
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Professional therapy equipment trusted by institutions
            </p>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                activeTab === "new"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="tab-new-arrivals"
            >
              Just In
            </button>
            <button
              onClick={() => setActiveTab("best")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                activeTab === "best"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-testid="tab-best-sellers"
            >
              Best-Sellers
            </button>
          </div>
        </div>

        <ProductCarousel
          products={activeProducts}
          hideHeader
        />
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        <Hero />
        <CategoryGrid />
        <FeaturedSwings />
        <ProductShowcase />
        <ManufacturingSection />

        <Testimonials />
        <TrustBadges />

        <BulkEnquiryForm />
      </main>
      <SiteFooter />
    </div>
  );
}
