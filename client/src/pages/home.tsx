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
  const cards = [
    {
      icon: Heart,
      label: "My Child / Family",
      desc: "Home therapy tools, sensory toys & calming equipment",
      href: "/products",
      cta: "Browse products",
      card: "from-rose-500/12 to-rose-500/4 border-rose-200 dark:border-rose-800 hover:border-rose-400/60",
      icon_cls: "bg-rose-100 dark:bg-rose-950/60 text-rose-500",
      cta_cls: "text-rose-600 dark:text-rose-400",
    },
    {
      icon: Building2,
      label: "My OT Clinic",
      desc: "Clinical-grade equipment, bulk pricing & GST invoices",
      href: "/enquiry",
      cta: "Get a bulk quote →",
      card: "from-primary/15 to-primary/5 border-primary/40 hover:border-primary/70 ring-2 ring-primary/10",
      icon_cls: "bg-primary/15 text-primary",
      cta_cls: "text-primary",
      highlight: true,
    },
    {
      icon: GraduationCap,
      label: "My School / NGO",
      desc: "Sensory rooms, inclusive classroom tools & custom setups",
      href: "/enquiry",
      cta: "Get a setup quote",
      card: "from-indigo-500/12 to-indigo-500/4 border-indigo-200 dark:border-indigo-800 hover:border-indigo-400/60",
      icon_cls: "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-500",
      cta_cls: "text-indigo-600 dark:text-indigo-400",
    },
  ];
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-background to-muted/20 border-b" data-testid="section-audience-chooser">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-3 py-1.5 rounded-full">Who are you shopping for?</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">Find the Right Equipment for You</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {cards.map(({ icon: Icon, label, desc, href, cta, card, icon_cls, cta_cls, highlight }) => (
            <Link key={label} href={href}>
              <div
                className={`group rounded-2xl border-2 bg-gradient-to-br p-5 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5 h-full ${card}`}
                data-testid={`card-audience-${label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {highlight && (
                  <span className="inline-block text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-3 uppercase tracking-wide">Most Popular</span>
                )}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${icon_cls}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="font-bold text-foreground text-sm mb-1.5">{label}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">{desc}</p>
                <div className={`text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all ${cta_cls}`}>
                  {cta} <ArrowRight className="w-3 h-3" />
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
    <section className="relative overflow-hidden bg-[#070d2a] text-white py-10 sm:py-14" data-testid="section-sample-kit-banner">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_80%_50%,rgba(74,83,160,0.45),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_50%_at_10%_50%,rgba(251,191,36,0.08),transparent)]" />
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
            { icon: Truck, text: "Free shipping pan-India" },
            { icon: ShieldCheck, text: "OT-curated & clinically validated" },
            { icon: BadgeIndianRupee, text: "Bulk pricing for institutions" },
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

function FeaturedSwings() {
  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-background via-muted/10 to-background" data-testid="section-featured-swings">
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
    <section className="py-14 sm:py-20 bg-gradient-to-b from-muted/20 to-background border-t" data-testid="section-product-showcase">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-3 py-1.5 rounded-full">🏆 Editor's Pick</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display" data-testid="heading-product-showcase">
              Our Products
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Trusted by OT clinics and families across India
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

        <div className="text-center mt-10">
          <Link href="/products">
            <Button variant="outline" className="rounded-full px-8 border-primary/30 hover:border-primary/60" data-testid="button-see-all-products">
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
