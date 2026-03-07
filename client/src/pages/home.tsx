import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { CategoryGrid } from "@/components/category-grid";
import { ManufacturingSection } from "@/components/manufacturing-section";
import { FeaturesSection } from "@/components/features-section";
import { ClientLogos } from "@/components/client-logos";
import { BulkEnquiryForm } from "@/components/bulk-enquiry-form";
import { RoadmapSection } from "@/components/roadmap-section";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Box, ArrowRight } from "lucide-react";
import { SITE_IMAGES } from "@/lib/catalogue-data";

function SensoryRoomCTA() {
  return (
    <section className="py-20 lg:py-28" data-testid="section-room-builder-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/8 via-primary/4 to-background border border-border/50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
          <div className="relative px-8 py-16 lg:px-16 lg:py-20 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Box className="w-4 h-4" />
                3D Room Builder
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                Design Your <br className="hidden lg:block" />
                <span className="text-primary">Sensory Room</span> in 3D
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Use our interactive 3D room builder to visualize your therapy space. 
                Add swings, mats, therapy balls, and visual equipment — see the layout 
                and get an instant price estimate.
              </p>
              <Link href="/sensory-room-builder">
                <Button size="lg" className="rounded-full gap-2 shadow-lg shadow-primary/20 text-base px-8" data-testid="button-room-builder-cta">
                  Launch Room Builder
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="flex-shrink-0 w-64 h-64 lg:w-80 lg:h-80 rounded-3xl overflow-hidden border border-border/50 shadow-xl relative group">
              <img
                src={SITE_IMAGES.sensoryRoom}
                alt="Sensory room floor play setup"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                data-testid="img-sensory-room-cta"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-sm rounded-xl px-4 py-3 border border-border/30">
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

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <CategoryGrid />
        <SensoryRoomCTA />
        <ManufacturingSection />
        <FeaturesSection />
        <ClientLogos />
        <BulkEnquiryForm />
        <RoadmapSection />
      </main>
      <SiteFooter />
    </div>
  );
}
