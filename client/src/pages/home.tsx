import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { CategoryGrid } from "@/components/category-grid";
import { ProductCarousel } from "@/components/product-carousel";
import { ManufacturingSection } from "@/components/manufacturing-section";
import { FeaturesSection } from "@/components/features-section";
import { ClientLogos } from "@/components/client-logos";
import { Testimonials } from "@/components/testimonials";
import { TrustBadges } from "@/components/trust-badges";
import { CommitmentSection } from "@/components/commitment-section";
import { BlogPreview } from "@/components/blog-preview";
import { RoadmapSection } from "@/components/roadmap-section";
import { BulkEnquiryForm } from "@/components/bulk-enquiry-form";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Box, ArrowRight } from "lucide-react";
import { SITE_IMAGES } from "@/lib/catalogue-data";
import { useProducts } from "@/lib/product-provider";

function SensoryRoomCTA() {
  return (
    <section className="py-16 lg:py-20" data-testid="section-room-builder-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/8 via-primary/4 to-background border border-border">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="relative px-8 py-14 lg:px-16 lg:py-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium mb-5">
                <Box className="w-4 h-4" />
                3D Room Builder
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3 font-display">
                Design Your{" "}
                <span className="text-primary">Sensory Room</span> in 3D
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
                Use our interactive 3D room builder to visualize your therapy space.
                Add swings, mats, therapy balls, and visual equipment — see the layout
                and get an instant price estimate.
              </p>
              <Link href="/sensory-room-builder">
                <Button size="lg" className="rounded-none gap-2 text-sm px-8" data-testid="button-room-builder-cta">
                  Launch Room Builder
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="flex-shrink-0 w-64 h-64 lg:w-72 lg:h-72 overflow-hidden border border-border shadow-lg relative group">
              <img
                src={SITE_IMAGES.sensoryRoom}
                alt="Sensory room floor play setup"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                data-testid="img-sensory-room-cta"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-2 border border-border">
                <p className="text-sm font-medium text-foreground">Interactive 3D</p>
                <p className="text-xs text-muted-foreground">Drag, drop & visualize</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GetStartedBanner() {
  return (
    <section className="py-4" data-testid="section-get-started">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/products">
          <img
            src={SITE_IMAGES.getStarted}
            alt="Get started with Abley's"
            className="w-full h-auto rounded-lg cursor-pointer hover:opacity-95 transition-opacity"
            loading="lazy"
            data-testid="img-get-started"
          />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  const { getNewArrivals, getBestSellers } = useProducts();
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustStrip />
        <CategoryGrid />
        <ProductCarousel
          title="Just In"
          subtitle="New Arrivals"
          products={newArrivals}
        />
        <ProductCarousel
          title="Our Best-Sellers"
          subtitle="Chosen by therapists, trusted by institutions"
          products={bestSellers}
        />
        <GetStartedBanner />
        <ManufacturingSection />
        <FeaturesSection />
        <ClientLogos />
        <Testimonials />
        <TrustBadges />
        <CommitmentSection />
        <RoadmapSection />
        <SensoryRoomCTA />
        <BlogPreview />
        <BulkEnquiryForm />
      </main>
      <SiteFooter />
    </div>
  );
}
