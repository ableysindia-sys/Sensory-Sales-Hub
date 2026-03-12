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
import { ArrowRight, Building2, GraduationCap, Heart, ShieldCheck, Truck, BadgeIndianRupee, Gift, RotateCcw, Package } from "lucide-react";
import featuredSwingsImg from "@assets/generated_images/featured-swings-banner.png";
import { useProducts } from "@/lib/product-provider";

function AudienceChooser() {
  return (
    <section className="py-10 sm:py-14 bg-muted/40 border-y" data-testid="section-audience-chooser">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-6">
          Who are you shopping for?
        </p>
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            {
              icon: Heart,
              label: "My Child / Family",
              desc: "Home therapy tools, sensory toys & calming equipment",
              href: "/products",
              color: "text-rose-500 bg-rose-50 dark:bg-rose-950/30",
            },
            {
              icon: Building2,
              label: "My OT Clinic",
              desc: "Clinical-grade equipment, bulk pricing & GST invoices",
              href: "/enquiry",
              color: "text-primary bg-primary/10",
              highlight: true,
            },
            {
              icon: GraduationCap,
              label: "My School / NGO",
              desc: "Sensory rooms, inclusive classroom tools & custom setups",
              href: "/enquiry",
              color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30",
            },
          ].map(({ icon: Icon, label, desc, href, color, highlight }) => (
            <Link key={label} href={href}>
              <div
                className={`group rounded-2xl border-2 p-5 cursor-pointer transition-all hover:shadow-md h-full ${
                  highlight
                    ? "border-primary/40 bg-primary/5 hover:border-primary/60"
                    : "border-border hover:border-primary/30 bg-card"
                }`}
                data-testid={`card-audience-${label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-semibold text-foreground text-sm mb-1">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                <div className="mt-3 text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                  {highlight ? "Get a bulk quote" : "Browse products"} <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SampleKitBanner() {
  return (
    <section className="bg-gradient-to-r from-primary/8 via-primary/5 to-primary/8 border-y border-primary/15 py-8 sm:py-10" data-testid="section-sample-kit-banner">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-2">
              <Gift className="w-3.5 h-3.5" /> OT Trial Kit Programme
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-foreground font-display mb-2">
              Try our equipment before committing
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto sm:mx-0 leading-relaxed">
              Request a curated 5-item sample kit for your clinic or school. Pay a <strong>₹1,499 refundable deposit</strong> — fully credited on your first order.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 justify-center sm:justify-start text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5 text-primary" /> 100% refundable</span>
              <span className="flex items-center gap-1.5"><Package className="w-3.5 h-3.5 text-primary" /> Dispatched in 48 hrs</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-primary" /> OT-curated items</span>
            </div>
          </div>
          <div className="shrink-0">
            <Link href="/sample">
              <Button size="lg" className="rounded-full px-7 gap-2 h-12 shadow-lg shadow-primary/25 font-semibold" data-testid="button-sample-kit-homepage">
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
    <section className="border-b bg-background" data-testid="section-quick-trust">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          {[
            { icon: Truck, text: "Free shipping pan-India" },
            { icon: ShieldCheck, text: "OT-curated products" },
            { icon: BadgeIndianRupee, text: "Bulk pricing for institutions" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 text-primary" /> {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedSwings() {
  return (
    <section className="py-10 sm:py-14" data-testid="section-featured-swings">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/category/swings">
          <div className="relative overflow-hidden rounded-2xl group cursor-pointer">
            <div className="aspect-[21/9] sm:aspect-[3/1]">
              <img
                src={featuredSwingsImg}
                alt="Professional therapy swings collection"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                loading="lazy"
                data-testid="img-featured-swings"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 sm:px-12 lg:px-16 max-w-lg">
                <p className="text-[10px] sm:text-xs font-semibold text-white/75 uppercase tracking-widest mb-2">Featured Collection</p>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 font-display" data-testid="heading-featured-swings">
                  Therapy Swings
                </h2>
                <p className="text-xs sm:text-sm text-white/75 mb-4 hidden sm:block">
                  Professional-grade vestibular input swings for clinics, therapy centres, and sensory rooms.
                </p>
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white group-hover:gap-3 transition-all">
                  Explore Collection <ArrowRight className="w-3.5 h-3.5" />
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
  const [activeTab, setActiveTab] = useState<"new" | "best">("best");
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();
  const active = activeTab === "new" ? newArrivals : bestSellers;

  return (
    <section className="py-12 sm:py-16" data-testid="section-product-showcase">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display" data-testid="heading-product-showcase">
              Our Products
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Trusted by OT clinics and families across India
            </p>
          </div>
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab("best")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === "best" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
              data-testid="tab-best-sellers"
            >
              Best Sellers
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${activeTab === "new" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}
              data-testid="tab-new-arrivals"
            >
              New In
            </button>
          </div>
        </div>

        <ProductCarousel products={active} hideHeader />

        <div className="text-center mt-8">
          <Link href="/products">
            <Button variant="outline" className="rounded-full px-8" data-testid="button-see-all-products">
              See All 116+ Products <ArrowRight className="ml-1.5 w-4 h-4" />
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
        <Hero />
        <AudienceChooser />
        <SampleKitBanner />
        <QuickTrustBar />
        <CategoryGrid />
        <FeaturedSwings />
        <ProductShowcase />
        <Testimonials />
        <BulkEnquiryForm />
      </main>
      <SiteFooter />
    </div>
  );
}
