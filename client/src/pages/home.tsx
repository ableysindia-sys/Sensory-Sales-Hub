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

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <CategoryGrid />
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
