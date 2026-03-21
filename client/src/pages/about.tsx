import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Heart,
  ShieldCheck,
  IndianRupee,
  Users,
  Package,
  Truck,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Star,
} from "lucide-react";

const stats = [
  { value: "116+", label: "Curated Products" },
  { value: "500+", label: "OTs & Therapists" },
  { value: "All India", label: "Pan-India Delivery" },
  { value: "Noida", label: "Headquartered" },
];

const offerings = [
  { icon: Star, title: "Sensory Integration", desc: "Tools to help process sensory input and build self-regulation skills." },
  { icon: Users, title: "Gross Motor Skills", desc: "Equipment for balance, coordination, and movement development." },
  { icon: Heart, title: "Deep Pressure & Calm", desc: "Weighted products and compression gear to soothe and center." },
  { icon: ShieldCheck, title: "OT Equipment", desc: "Professional-grade clinical tools trusted by occupational therapists." },
  { icon: Package, title: "Sensory Rooms", desc: "Everything needed to build an effective sensory room or corner." },
  { icon: IndianRupee, title: "Affordable Access", desc: "Quality sensory tools made available across India at fair prices." },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Durable & Safe",
    desc: "We source and design products that are built to last, safe for all ages, and fit for everyday therapeutic use.",
  },
  {
    icon: Truck,
    title: "Accessible Across India",
    desc: "We ship nationwide so that families in every city and town can access the tools they need.",
  },
  {
    icon: Heart,
    title: "More Than a Store",
    desc: "We are a partner in your journey — providing the right tools to support development, independence, and wellbeing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pt-[6.5rem] min-h-screen bg-background pb-16 lg:pb-0">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-primary text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
            <span className="inline-block mb-4 px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-semibold tracking-widest uppercase">
              About Us
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-tight mb-6">
              Empowering Every<br />
              <span className="italic text-amber-300">Unique Journey</span>
            </h1>
            <p className="max-w-2xl mx-auto text-white/80 text-lg leading-relaxed">
              Abley's was founded by parents and professionals who saw a critical gap — the need for accessible, high-quality sensory tools in India. We are here to change that.
            </p>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section className="border-b bg-muted/40">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl sm:text-3xl font-bold text-primary font-display">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Our Story ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid sm:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Our Story</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-5 leading-tight">
                Born from a Real Need
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Navigating the world of child development and special needs can be overwhelming. We know this because we've been there.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Abley's was founded by a team of parents and professionals who saw a critical need for accessible, high-quality sensory tools and developmental aids in India.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We realised that while information is important, families and therapists need <strong className="text-foreground">practical, tangible solutions</strong> to support children every day. This realisation is the foundation of Abley's.
              </p>
            </div>
            <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8 space-y-5">
              {[
                "Founded by parents & professionals",
                "Focused on practical, everyday solutions",
                "Serving families, OTs, schools & clinics",
                "Proudly made for India",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-foreground/90 text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Behind the Brand ── */}
        <section className="bg-muted/40 border-y">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Behind the Brand</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-5 leading-tight">
                Eighth Fold Circle Pvt Ltd.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Abley's is the consumer brand of <strong className="text-foreground">Eighth Fold Circle Private Limited</strong>, a company dedicated to empowering the neurodiversity community through thoughtfully designed products.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our journey began with a simple goal: to make effective sensory products readily available, helping every child explore their world with confidence and comfort. Based in Noida, Uttar Pradesh, we design and source products locally — supporting Indian craftsmanship while meeting global quality standards.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <MapPin className="w-4 h-4" />
                Noida, Uttar Pradesh, India
              </div>
            </div>
          </div>
        </section>

        {/* ── What We Offer ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Our Offerings</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground leading-tight">
              Tools for Growth, Comfort & Joy
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              A carefully curated range of sensory products supporting individuals with Autism, ADHD, and other sensory processing needs.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {offerings.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border bg-card p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Who We Serve ── */}
        <section className="bg-primary text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3 block">Who We Serve</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display leading-tight">
                Made for Everyone on the Journey
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Users, label: "Families at Home", desc: "Bringing therapeutic tools into everyday routines." },
                { icon: Heart, label: "OTs & Therapists", desc: "Professional-grade equipment built for clinical use." },
                { icon: Star, label: "Schools & SEN Centres", desc: "Inclusive learning with the right sensory support." },
                { icon: CheckCircle2, label: "Children with SPD", desc: "Tools for regulation, focus, and motor development." },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="rounded-xl bg-white/10 border border-white/20 p-5 text-center hover:bg-white/15 transition-colors">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-amber-300" />
                  <h3 className="font-semibold mb-2">{label}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Values ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Our Commitment</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground leading-tight">
              Empowering Through Quality & Care
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Our mission is to empower families and therapists by providing reliable, safe, and effective sensory tools.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center px-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Responsible Practices ── */}
        <section className="bg-muted/40 border-y">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
            <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold font-display text-foreground mb-3">Our Commitment to Responsible Practices</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our products are designed to aid in sensory integration and skill development, but they are <strong className="text-foreground">not medical devices</strong> and are not intended to diagnose, treat, cure, or prevent any disease or condition. We encourage you to consult with a qualified therapist or medical professional to determine the best solutions for your specific needs.
            </p>
          </div>
        </section>

        {/* ── Contact CTA ── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <h2 className="text-3xl font-bold font-display text-foreground mb-4">Get in Touch</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Have questions about a product, need a bulk quote, or just want to say hello? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <a
              href="mailto:team@ableys.in"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-email"
            >
              <Mail className="w-4 h-4" />
              team@ableys.in
            </a>
            <span className="hidden sm:block text-border">|</span>
            <a
              href="tel:+917042180166"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-phone"
            >
              <Phone className="w-4 h-4" />
              +91-704-218-0166
            </a>
            <span className="hidden sm:block text-border">|</span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Noida, UP, India
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button size="lg" className="rounded-full px-8" data-testid="button-contact-us">
                Contact Us
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="rounded-full px-8" data-testid="button-shop-products">
                Shop Products
              </Button>
            </Link>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
