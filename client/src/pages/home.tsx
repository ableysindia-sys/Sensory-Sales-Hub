import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { CategoryGrid } from "@/components/category-grid";
import { ProductCarousel } from "@/components/product-carousel";
import { Testimonials } from "@/components/testimonials";
import { BulkEnquiryForm } from "@/components/bulk-enquiry-form";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Truck, BadgeIndianRupee, Gift, RotateCcw, Package, Users } from "lucide-react";
import { useProducts } from "@/lib/product-provider";


function SampleKitBanner() {
  return (
    <section className="relative overflow-hidden bg-primary text-white py-10 sm:py-14" data-testid="section-sample-kit-banner">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_80%_50%,rgba(0,0,0,0.25),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_35%_55%_at_8%_50%,rgba(251,191,36,0.14),transparent)]" />
      <div className="relative max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest mb-4 bg-amber-400/15 px-3 py-1.5 rounded-full border border-amber-400/20">
              <Gift className="w-3.5 h-3.5" /> OT Trial Kit Programme
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-3 leading-tight">
              Try Before You Commit —<br className="hidden sm:block" />
              <span className="text-amber-300 italic">₹1,499 Refundable Deposit</span>
            </h3>
            <p className="text-sm text-white/65 max-w-md mx-auto sm:mx-0 leading-relaxed">
              Request a curated 5-item sample kit for your clinic or school. Deposit fully credited on your first bulk order.
            </p>
            <div className="flex flex-wrap gap-5 mt-5 justify-center sm:justify-start text-xs text-white/50">
              <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-amber-300" /> 100% refundable</span>
              <span className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5 text-amber-300" /> Dispatched in 48 hrs</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> OT-curated items</span>
            </div>
          </div>
          <div className="shrink-0">
            <Link href="/sample">
              <Button size="lg" className="rounded-2xl px-8 gap-2 h-13 shadow-2xl shadow-black/30 font-bold !bg-white !text-gray-900 hover:!bg-amber-50 !border-0 text-sm" data-testid="button-sample-kit-homepage">
                Request Sample Kit <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickTrustBar() {
  return (
    <section className="bg-primary" data-testid="section-quick-trust">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-white/85 font-medium">
          {[
            { icon: Truck,            text: "Free shipping across India" },
            { icon: BadgeIndianRupee, text: "GST invoices · Bulk discounts" },
            { icon: ShieldCheck,      text: "OT-validated products" },
            { icon: Users,            text: "500+ institutions trust us" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 text-white/70" /> {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  const { getNewArrivals, getBestSellers } = useProducts();
  const [activeTab, setActiveTab] = useState<"new" | "best">("best");
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();
  const active = activeTab === "new" ? newArrivals : bestSellers;

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-muted/20 to-background border-t" data-testid="section-product-showcase">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-3 py-1.5 rounded-full">🏆 OT-Approved Selection</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display" data-testid="heading-product-showcase">
              Top-Rated Therapy Equipment
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Handpicked by occupational therapists — available individually or in bulk
            </p>
          </div>
          <div className="flex items-center gap-1 bg-muted/60 rounded-xl p-1 self-start sm:self-auto border border-border/40">
            <button
              onClick={() => setActiveTab("best")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "best" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="tab-best-sellers"
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "new" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              data-testid="tab-new-arrivals"
            >
              New In
            </button>
          </div>
        </div>

        <ProductCarousel products={active} hideHeader />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <Link href="/products">
            <Button variant="outline" className="rounded-full px-8 border-primary/30 hover:border-primary/60" data-testid="button-see-all-products">
              See All 120+ Products <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/enquiry">
            <Button className="rounded-full px-8 gap-2" data-testid="button-get-bulk-quote-showcase">
              Get a Bulk Quote <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pb-16 lg:pb-0">
        {/* 1. ARRIVE — B2B-first impact, dual CTA */}
        <Hero />
        {/* 2. REASSURE — Institutional trust signals above the fold */}
        <QuickTrustBar />
        {/* 3. DISCOVER — Browse by setup type, see curated product lists */}
        <CategoryGrid />
        {/* 4. BROWSE — Handpicked best sellers & new arrivals */}
        <ProductShowcase />
        {/* 5. TRY — Sample kit: lower-friction B2B lead capture */}
        <SampleKitBanner />
        {/* 6. VALIDATE — Verified institutional reviews */}
        <Testimonials />
        {/* 7. CONVERT — Full bulk enquiry form for high-intent visitors */}
        <BulkEnquiryForm />
      </main>
      <SiteFooter />
    </div>
  );
}
