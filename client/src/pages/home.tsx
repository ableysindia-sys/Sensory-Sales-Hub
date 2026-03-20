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
import {
  ArrowRight, ShieldCheck, Truck, BadgeIndianRupee, Gift, RotateCcw,
  Package, Users, MessageCircle, Send, Search, FileText, CheckCircle2,
  Hospital, GraduationCap, Building2, Home as HomeIcon, Clock,
} from "lucide-react";
import { useProducts } from "@/lib/product-provider";

const WHATSAPP_URL = "https://wa.me/917042180166?text=Hi%20Abley%27s%2C%20I%27m%20interested%20in%20bulk%20rehab%20equipment%20for%20my%20institution.";

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

function HowItWorks() {
  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Browse & Select",
      desc: "Filter by setup type — sensory room, clinic, school. Add what you need to your enquiry list.",
    },
    {
      icon: FileText,
      step: "02",
      title: "Get a Custom Quote",
      desc: "Submit your list and we'll send a detailed quote with bulk pricing and GST breakdown within 2 hours.",
    },
    {
      icon: CheckCircle2,
      step: "03",
      title: "Delivered & Invoiced",
      desc: "We dispatch within 48–72 hrs with full GST tax invoice, ready for institutional procurement.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-muted/30 border-t border-border/50" data-testid="section-how-it-works">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-3 py-1.5 rounded-full">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display" data-testid="heading-how-it-works">
            From Enquiry to Delivery — in 3 Steps
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
          {steps.map((s, i) => (
            <div key={s.step} className="relative flex flex-col items-center text-center sm:items-start sm:text-left group">
              {/* connector line — desktop only */}
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-6 left-[calc(50%+2rem)] right-[-50%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center ring-1 ring-primary/20 group-hover:bg-primary/15 transition-colors">
                  <s.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-3xl font-bold text-primary/15 font-display select-none">{s.step}</span>
              </div>
              <h3 className="text-base font-bold text-foreground mb-1.5">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <Link href="/enquiry">
            <Button className="rounded-full px-7 gap-2" data-testid="button-how-it-works-quote">
              <Send className="w-4 h-4" /> Start My Enquiry
            </Button>
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 h-10 rounded-full border border-green-500/40 text-green-600 dark:text-green-400 text-sm font-semibold hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors"
            data-testid="link-how-it-works-whatsapp"
          >
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function WhoWeServe() {
  const segments = [
    {
      icon: Hospital,
      label: "OT Clinics & Rehab Centres",
      detail: "Therapy equipment, sensory tools, rehab aids",
      typical: "Typical order: 10–50 units",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30 ring-blue-200 dark:ring-blue-800/40",
    },
    {
      icon: GraduationCap,
      label: "Special Schools & Institutions",
      detail: "Sensory rooms, motor skill equipment, ADL kits",
      typical: "Typical order: 20–100 units",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-950/30 ring-green-200 dark:ring-green-800/40",
    },
    {
      icon: Building2,
      label: "Hospitals & Paediatric Wards",
      detail: "Certified equipment with GST invoice for procurement",
      typical: "Typical order: 30–200 units",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-950/30 ring-purple-200 dark:ring-purple-800/40",
    },
    {
      icon: HomeIcon,
      label: "NGOs & Disability Orgs",
      detail: "Subsidised bulk rates with CSR billing support",
      typical: "Typical order: 50+ units",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/30 ring-amber-200 dark:ring-amber-800/40",
    },
  ];

  return (
    <section className="py-12 sm:py-16 border-t border-border/50" data-testid="section-who-we-serve">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-3 bg-primary/10 px-3 py-1.5 rounded-full">
            Our Customers
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground font-display" data-testid="heading-who-we-serve">
            Built for Institutional Buyers
          </h2>
          <p className="text-sm text-muted-foreground mt-1.5 max-w-md mx-auto">
            50+ clinics, schools and hospitals trust Abley's for their therapy equipment needs
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {segments.map((s) => (
            <div
              key={s.label}
              className={`rounded-2xl p-5 ring-1 ${s.bg} flex flex-col gap-3`}
              data-testid={`card-segment-${s.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white dark:bg-background shadow-sm`}>
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground leading-snug mb-1">{s.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.detail}</p>
              </div>
              <span className={`text-xs font-semibold ${s.color} mt-auto`}>{s.typical}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Not sure what you need? <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 font-semibold hover:underline">Message us on WhatsApp</a> and our OT team will guide you.
          </p>
        </div>
      </div>
    </section>
  );
}

function QuickTrustBar() {
  return (
    <section className="bg-[#070d2a]" data-testid="section-quick-trust">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-white/75 font-medium">
          {[
            { icon: Truck,            text: "Shipping Available Across India" },
            { icon: BadgeIndianRupee, text: "GST invoices · Bulk discounts" },
            { icon: ShieldCheck,      text: "Designed by Experts" },
            { icon: Clock,            text: "Same Day Quotation" },
            { icon: Users,            text: "50+ Institutions trust us" },
          ].map(({ icon: Icon, text }) => (
            <span key={text} className="flex items-center gap-2">
              <Icon className="w-3.5 h-3.5 text-white/50" /> {text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const CLIENT_LOGOS = [
  { src: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/TH.png?v=1773997113",  alt: "TH" },
  { src: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/NG.png?v=1773997113",  alt: "NG" },
  { src: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/OS.png?v=1773997113",  alt: "OS" },
  { src: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/JM.png?v=1773997112",  alt: "JM" },
  { src: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/BM.png?v=1773997113",  alt: "BM" },
  { src: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/PI.png?v=1773997112",  alt: "PI" },
  { src: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/SSS.png?v=1773997113", alt: "SSS" },
  { src: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/CG.png?v=1773997112",  alt: "CG" },
  { src: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/WB.png?v=1773997112",  alt: "WB" },
  { src: "https://cdn.shopify.com/s/files/1/0682/9221/5043/files/NF.png?v=1773997113",  alt: "NF" },
];

function ClientLogos() {
  const track = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
  return (
    <section className="bg-muted/30 border-y border-border/40 py-6 overflow-hidden" data-testid="section-client-logos">
      <p className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-4">
        Trusted by institutions across India
      </p>
      <div className="relative">
        <div
          className="flex gap-10 items-center w-max"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {track.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="h-14 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 flex-shrink-0"
              loading="lazy"
              data-testid={`img-client-logo-${logo.alt.toLowerCase()}-${i}`}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function ProductShowcase() {
  const { getNewArrivals, getBestSellers, products } = useProducts();
  const [activeTab, setActiveTab] = useState<"new" | "best">("best");
  const newArrivals = getNewArrivals();
  const bestSellers = getBestSellers();
  const totalCount = products.length;
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
              See All {totalCount}+ Products <ArrowRight className="ml-1.5 w-4 h-4" />
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

function StickyMobileBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur border-t border-border/60 px-4 pt-3 pb-4 flex gap-3"
      data-testid="bar-sticky-mobile"
    >
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors shadow-lg shadow-green-500/20"
        data-testid="button-sticky-whatsapp"
      >
        <MessageCircle className="w-4 h-4" /> WhatsApp Us
      </a>
      <Link href="/enquiry" className="flex-1">
        <Button
          className="w-full h-11 rounded-xl text-sm font-semibold"
          data-testid="button-sticky-quote"
        >
          Get a Quote <Send className="w-3.5 h-3.5 ml-1" />
        </Button>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" className="pb-20 lg:pb-0">
        {/* 1. ARRIVE */}
        <Hero />
        {/* 2. REASSURE — Compact trust bar in dark navy */}
        <QuickTrustBar />
        {/* 3. SOCIAL PROOF — Client logo marquee */}
        <ClientLogos />
        {/* 4. DISCOVER — Browse by setup type */}
        <CategoryGrid />
        {/* 5. PROCESS — 3-step clarity for B2B buyers */}
        <HowItWorks />
        {/* 5. BROWSE — Handpicked best sellers & new arrivals */}
        <ProductShowcase />
        {/* 6. TRY — Sample kit: hidden until further notice */}
        {/* <SampleKitBanner /> */}
        {/* 7. IDENTIFY — Who we work with (self-segmentation) */}
        <WhoWeServe />
        {/* 8. VALIDATE — Verified institutional reviews */}
        <Testimonials />
        {/* 9. CONVERT — Full bulk enquiry form */}
        <BulkEnquiryForm />
      </main>
      <SiteFooter />
      {/* Sticky mobile CTA bar */}
      <StickyMobileBar />
    </div>
  );
}
