import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Link } from "wouter";
import { api } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { PhoneSignupInline } from "@/components/phone-signup-inline";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logoPath from "@assets/ableys_rehab_logo.png";
import heroBgImg from "@assets/generated_images/hero-banner.png";
import swingImg from "@assets/generated_images/acrobat-swing.png";
import crashMatImg from "@assets/generated_images/crash-mat.png";
import therapyMatImg from "@assets/generated_images/therapy-mat.png";
import ballpoolImg from "@assets/generated_images/ballpool-4x4.png";
import {
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Star,
  Building2,
  GraduationCap,
  Home,
  Dumbbell,
  Sparkles,
  ShieldCheck,
  Truck,
  BadgeIndianRupee,
  Receipt,
  Headset,
  Award,
  Users,
  Package,
  Zap,
  ChevronDown,
  MessageCircle,
  Send,
  Loader2,
  TrendingUp,
  Heart,
} from "lucide-react";

const formSchema = api.leads.create.input.extend({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(10, "Enter a valid phone number"),
  organisation: z.string().min(2, "Organisation name is required"),
  city: z.string().min(2, "Please enter your city"),
  requirementType: z.string().min(1, "Please select your requirement type"),
});

type FormValues = z.infer<typeof formSchema>;

const SETUP_TYPES = [
  { id: "therapy-centre", label: "Therapy Centre / Clinic", icon: Building2, desc: "OT clinics, rehab facilities, physiotherapy centres", count: "43+ products" },
  { id: "school", label: "School / Institution", icon: GraduationCap, desc: "Special education schools, inclusive classrooms", count: "30+ products" },
  { id: "sensory-room", label: "Sensory Room Setup", icon: Sparkles, desc: "Complete sensory integration room design", count: "43 products" },
  { id: "home-setup", label: "Home Therapy Setup", icon: Home, desc: "Home-based therapy corners for families", count: "25+ products" },
  { id: "gym-fitness", label: "Rehab Gym / Centre", icon: Dumbbell, desc: "Rehabilitation gyms and motor skill centres", count: "20+ products" },
];

const BENEFITS = [
  { icon: BadgeIndianRupee, title: "Bulk Pricing", desc: "Significant discounts on volume orders. The more you order, the more you save — with transparent pricing tiers." },
  { icon: Receipt, title: "GST Invoices", desc: "All orders include proper GST-compliant tax invoices, ready for institutional accounting and reimbursement." },
  { icon: Truck, title: "Free Pan-India Shipping", desc: "No shipping charges, anywhere in India — whether you're in Mumbai, Shillong, or a Tier-3 town." },
  { icon: Award, title: "OT-Curated Selection", desc: "Every product is vetted by practicing occupational therapists for clinical efficacy and safety." },
  { icon: Headset, title: "Dedicated B2B Support", desc: "WhatsApp-first support for institutions. Get quotes, track orders, and resolve issues — fast." },
  { icon: ShieldCheck, title: "Quality Guaranteed", desc: "Durable, safe, and clinically appropriate. We stand behind every product we supply." },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Share Your Requirements", desc: "Fill out the quick form below with your facility type, location, and what you need. It takes under 2 minutes." },
  { step: "02", title: "Get a Custom Quote", desc: "Our B2B team reviews your request and sends a tailored quote with bulk pricing within 24 working hours." },
  { step: "03", title: "Receive & Set Up", desc: "Order confirmed, products dispatched pan-India. Your equipment arrives ready to use with no hidden charges." },
];

const FAQS = [
  {
    q: "What is the minimum order quantity for bulk pricing?",
    a: "There is no strict minimum order quantity — we work with single-product purchases all the way up to full sensory room setups. Bulk discounts typically kick in for orders above ₹25,000. Contact us for a custom quote based on your list.",
  },
  {
    q: "Do you provide GST invoices for institutional purchases?",
    a: "Yes, absolutely. Every order comes with a proper GST-compliant tax invoice issued by Eighth Fold Circle Private Limited (GSTIN available). Our invoices are accepted by hospitals, schools, and government institutions.",
  },
  {
    q: "Can you help design and supply a complete sensory room?",
    a: "Yes — this is one of our most popular services. Share your room dimensions and budget, and our team will recommend a complete equipment list optimised for sensory integration therapy. We've helped set up 50+ sensory rooms across India.",
  },
  {
    q: "How long does delivery take for bulk orders?",
    a: "Most in-stock products ship within 2–3 business days. Bulk or custom orders typically ship within 5–7 working days. Delivery timelines depend on your location — metro cities are usually faster.",
  },
  {
    q: "Do you offer EMI or credit terms for institutions?",
    a: "We can discuss credit terms for established institutions on a case-by-case basis. For schools and government bodies with purchase orders, we accommodate flexible payment structures. Reach out to discuss.",
  },
  {
    q: "Are your products safe and clinically appropriate?",
    a: "Every product in our catalogue is curated by practicing occupational therapists and assessed for clinical suitability, safety, and durability. We source from verified manufacturers and can share product specifications on request.",
  },
];

const STATS = [
  { value: "500+", label: "OTs & Therapists Served" },
  { value: "116+", label: "Products in Catalogue" },
  { value: "50+", label: "Sensory Rooms Set Up" },
  { value: "24 hr", label: "Quote Turnaround" },
];

const AUDIENCES = [
  { icon: Building2, label: "OT & Rehab Clinics", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/30" },
  { icon: GraduationCap, label: "Special Education Schools", color: "text-green-600 bg-green-50 dark:bg-green-950/30" },
  { icon: Sparkles, label: "Sensory Room Projects", color: "text-violet-600 bg-violet-50 dark:bg-violet-950/30" },
  { icon: Heart, label: "Child Development Centres", color: "text-rose-600 bg-rose-50 dark:bg-rose-950/30" },
  { icon: Dumbbell, label: "Rehab Gyms", color: "text-orange-600 bg-orange-50 dark:bg-orange-950/30" },
  { icon: Users, label: "NGOs & Institutions", color: "text-teal-600 bg-teal-50 dark:bg-teal-950/30" },
];

function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    const prevDesc = meta.content;
    meta.content = description;
    return () => { document.title = prev; meta!.content = prevDesc; };
  }, [title, description]);
}

function useUtmParams() {
  const [utms, setUtms] = useState<Record<string, string>>({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const captured: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
      const v = params.get(k);
      if (v) captured[k] = v;
    });
    setUtms(captured);
  }, []);
  return utms;
}

export default function B2BLandingPage() {
  const { toast } = useToast();
  const formRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const utms = useUtmParams();

  usePageMeta(
    "Bulk Sensory & OT Equipment for Clinics & Schools | Abley's Rehab B2B",
    "India's most trusted B2B source for clinical-grade sensory tools, OT equipment & sensory room setups. Bulk pricing, GST invoices, free pan-India shipping. Trusted by 500+ occupational therapists."
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organisation: "",
      city: "",
      requirementType: "",
      category: "b2b-landing",
      interest: "",
      message: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data: FormValues) => {
      const utmNote = Object.keys(utms).length
        ? `\n\n[Source: ${Object.entries(utms).map(([k, v]) => `${k}=${v}`).join(", ")}]`
        : "";
      return apiRequest("POST", api.leads.create.path, {
        ...data,
        interest: `B2B Enquiry – ${data.requirementType}`,
        message: (data.message || "") + utmNote,
      });
    },
    onSuccess: () => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try WhatsApp or email us directly.", variant: "destructive" });
    },
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Announcement Bar ── */}
      <div className="bg-primary text-white text-center text-xs font-medium py-2 px-4 tracking-wide">
        🇮🇳 Free Shipping Pan India &nbsp;·&nbsp; GST Invoices Provided &nbsp;·&nbsp; 500+ OTs Trust Abley's Rehab
      </div>

      {/* ── Minimal Header ── */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <img src={logoPath} alt="Abley's Rehab" className="h-9 object-contain" data-testid="img-logo-header" />
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/917042180166?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20bulk%20B2B%20pricing%20for%20my%20institution."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-whatsapp-header"
            >
              <MessageCircle className="w-4 h-4" />
              +91 70421 80166
            </a>
            <Button size="sm" className="rounded-full px-5" onClick={scrollToForm} data-testid="button-get-quote-header">
              Get a Quote
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gray-950 text-white" data-testid="section-b2b-hero">

          {/* Background image */}
          <img
            src={heroBgImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ opacity: 0.35 }}
            loading="eager"
          />

          {/* Rich layered gradient — deep navy left, brand blue mid, transparent right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1033] via-[#1f2880]/90 to-[#4A53A0]/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
          {/* Subtle radial highlight top-right */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_90%_20%,rgba(255,255,255,0.04),transparent)]" />

          {/* Content grid */}
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-28">
            <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">

              {/* Left: copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs font-semibold tracking-widest uppercase mb-6 border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  For OT Clinics · Schools · Rehab Centres
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold font-display leading-[1.08] mb-6 drop-shadow-xl">
                  Set Up a World-Class<br />
                  Sensory Room —{" "}
                  <span className="italic text-amber-300">Without</span><br />
                  the Import Headache.
                </h1>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-7 max-w-lg">
                  India's most trusted source for clinical-grade sensory and OT equipment. Bulk pricing, GST invoices, free pan-India shipping — tailored for institutions.
                </p>

                {/* ── Primary lead capture ── */}
                <div className="rounded-2xl bg-white/8 backdrop-blur-sm border border-white/12 p-4 sm:p-5 mb-5">
                  <PhoneSignupInline
                    variant="dark"
                    label="Register to get your custom quote"
                    sublabel="Bulk pricing · GST invoice · 24-hr turnaround"
                    containerId="recaptcha-lp-hero"
                  />
                </div>

                {/* Secondary CTAs */}
                <div className="flex flex-wrap gap-3 items-center">
                  <button
                    onClick={scrollToForm}
                    className="text-white/70 hover:text-white text-sm font-medium underline underline-offset-2 transition-colors"
                    data-testid="button-get-quote-hero"
                  >
                    Fill detailed enquiry form →
                  </button>
                  <span className="text-white/30 hidden sm:inline">·</span>
                  <a
                    href="https://wa.me/917042180166?text=Hi%2C%20I%27d%20like%20to%20discuss%20bulk%20B2B%20pricing%20for%20my%20institution."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-white/70 hover:text-white font-medium transition-colors"
                    data-testid="link-whatsapp-hero"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> WhatsApp us
                  </a>
                </div>

                {/* Inline trust cues */}
                <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-6">
                  {[
                    { icon: ShieldCheck, text: "OT-curated catalogue" },
                    { icon: Truck, text: "Free shipping across India" },
                    { icon: Receipt, text: "GST invoices included" },
                  ].map(({ icon: Icon, text }) => (
                    <span key={text} className="flex items-center gap-1.5 text-xs text-white/60">
                      <Icon className="w-3.5 h-3.5 text-white/40" /> {text}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: product image mosaic (desktop only) */}
              <div className="hidden lg:grid grid-cols-2 gap-3" aria-hidden="true">
                <div className="col-span-2 rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 shadow-2xl">
                  <img src={swingImg} alt="Therapy swing" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square border border-white/10 shadow-xl">
                  <img src={crashMatImg} alt="Crash mat" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square border border-white/10 shadow-xl">
                  <img src={therapyMatImg} alt="Therapy mat" className="w-full h-full object-cover" />
                </div>
                <div className="col-span-2 rounded-2xl overflow-hidden aspect-[16/7] border border-white/10 shadow-xl">
                  <img src={ballpoolImg} alt="Ball pool" className="w-full h-full object-cover" />
                </div>
                <div className="col-span-2 text-center">
                  <p className="text-xs text-white/40 font-medium tracking-wider uppercase">116+ products in catalogue</p>
                </div>
              </div>

            </div>
          </div>

          {/* Stats ribbon */}
          <div className="relative border-t border-white/10 bg-black/35 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-2xl sm:text-3xl font-bold text-amber-300 font-display">{s.value}</p>
                  <p className="text-xs text-white/65 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trust Signals ── */}
        <section className="border-b bg-muted/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              {[
                { icon: ShieldCheck, text: "OT-Approved Products" },
                { icon: Receipt, text: "GST-Compliant Invoices" },
                { icon: Truck, text: "Free Shipping Across India" },
                { icon: Star, text: "Trusted by 500+ Therapists" },
                { icon: Award, text: "Made for Indian Clinical Settings" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pain Points ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid sm:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Sound Familiar?</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-6 leading-tight">
                Sourcing OT Equipment in India Has Always Been Painful.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Importing from international brands takes 2–3 months, arrives at inflated prices, and comes with zero local support. Indian manufacturers often compromise on clinical quality.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Meanwhile, your clients need intervention <em>today</em> — and your budget doesn't stretch to premium imports.
              </p>
            </div>
            <div className="space-y-3">
              {[
                "Overpriced imports with 3-month lead times",
                "No single vendor for a complete sensory room setup",
                "Products that aren't designed for Indian clinical settings",
                "No GST invoices — or complications with institutional billing",
                "Inconsistent quality with zero after-sale support",
                "Having to source from 5 different vendors for one setup",
              ].map((pain) => (
                <div key={pain} className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                  <span className="text-destructive mt-0.5 shrink-0">✕</span>
                  <p className="text-sm text-foreground/80">{pain}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Solution / Who It's For ── */}
        <section className="bg-primary/5 border-y">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Who This Is For</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground leading-tight">
                Built for Every Professional on the Path.
              </h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Whether you're stocking a single therapy room or outfitting an entire institution, we've done this before.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {AUDIENCES.map(({ icon: Icon, label, color }) => (
                <div key={label} className="rounded-xl border bg-card p-4 text-center hover:shadow-md transition-shadow cursor-default">
                  <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-foreground leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Setup Types ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Our Catalogue</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground leading-tight">
              Equipment for Every Setup Type
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Tell us your setup type and we'll recommend the exact products you need — no guesswork.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SETUP_TYPES.map(({ id, label, icon: Icon, desc, count }) => (
              <div
                key={id}
                className="group rounded-2xl border bg-card p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-200 cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/8 px-2 py-1 rounded-full">{count}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                <button
                  onClick={scrollToForm}
                  className="text-xs font-semibold text-primary flex items-center gap-1 hover:gap-2 transition-all"
                  data-testid={`button-enquire-${id}`}
                >
                  Get a quote <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ))}
            {/* Browse all CTA card */}
            <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5 p-6 flex flex-col items-center justify-center text-center hover:border-primary/60 transition-colors cursor-pointer" onClick={scrollToForm}>
              <Package className="w-8 h-8 text-primary mb-3" />
              <p className="font-semibold text-foreground mb-1">Have a Custom Need?</p>
              <p className="text-sm text-muted-foreground mb-3">Describe your requirement and we'll sort it out.</p>
              <span className="text-xs font-bold text-primary uppercase tracking-wide">Tell us more →</span>
            </div>
          </div>
        </section>

        {/* ── B2B Benefits ── */}
        <section className="bg-primary text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-300 mb-3 block">Why Abley's Rehab</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display leading-tight">
                The Institutional Advantage
              </h2>
              <p className="mt-4 text-white/75 max-w-xl mx-auto">
                We've built our entire operation around making life easier for institutions — not individual retail buyers.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl bg-white/10 border border-white/15 p-6 hover:bg-white/15 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-amber-300" />
                  </div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">The Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground leading-tight">
              From Enquiry to Delivery in 3 Steps
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 relative">
            {/* connector line desktop */}
            <div className="hidden sm:block absolute top-12 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px border-t-2 border-dashed border-primary/25" />
            {HOW_IT_WORKS.map(({ step, title, desc }) => (
              <div key={step} className="text-center relative">
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mx-auto mb-5">
                  <span className="text-2xl font-bold text-primary font-display">{step}</span>
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" className="rounded-full px-10" onClick={scrollToForm} data-testid="button-start-enquiry">
              Start Your Enquiry <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </section>

        {/* ── Lead Form ── */}
        <section ref={formRef} className="bg-muted/50 border-y" id="enquiry-form">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* Left — pitch */}
              <div className="lg:sticky lg:top-24">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Get Started</span>
                <h2 className="text-3xl sm:text-4xl font-bold font-display text-foreground mb-5 leading-tight">
                  Get Your Custom B2B Quote — Free, in 24 Hours.
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Tell us about your facility and what you need. Our B2B team will get back to you with a tailored quote, product recommendations, and bulk pricing — within one business day.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: Clock, text: "Response within 24 working hours" },
                    { icon: BadgeIndianRupee, text: "Custom bulk pricing, no obligations" },
                    { icon: Headset, text: "Dedicated B2B support via WhatsApp" },
                    { icon: ShieldCheck, text: "No spam — only a quote tailored to you" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-foreground/80">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      {text}
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                  <p className="text-sm text-amber-900 dark:text-amber-300 font-medium mb-1">Prefer WhatsApp?</p>
                  <a
                    href="https://wa.me/917042180166?text=Hi%2C%20I%27d%20like%20a%20bulk%20B2B%20quote%20from%20Abley%27s%20Rehab."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-amber-700 dark:text-amber-400 font-semibold hover:underline flex items-center gap-1"
                    data-testid="link-whatsapp-form-aside"
                  >
                    <MessageCircle className="w-4 h-4" /> Message us on +91 70421 80166
                  </a>
                </div>
              </div>

              {/* Right — form or success state */}
              <div className="bg-card rounded-2xl border shadow-sm p-6 sm:p-8">
                {submitted ? (
                  <div className="text-center py-10" data-testid="state-form-success">
                    <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Enquiry Received!</h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      Thank you — our B2B team will review your request and send you a custom quote within 24 working hours.
                    </p>
                    <a
                      href="https://wa.me/917042180166?text=Hi%2C%20I%20just%20submitted%20a%20B2B%20enquiry%20on%20rehab.ableys.in%20and%20wanted%20to%20follow%20up."
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="link-whatsapp-success"
                    >
                      <Button className="rounded-full px-8">
                        <MessageCircle className="mr-2 w-4 h-4" /> Follow Up on WhatsApp
                      </Button>
                    </a>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-foreground mb-6">Your B2B Enquiry</h3>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
                        className="space-y-4"
                        data-testid="form-b2b-enquiry"
                      >
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Dr. Priya Sharma" {...field} data-testid="input-name" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="organisation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Organisation *</FormLabel>
                                <FormControl>
                                  <Input placeholder="ABC Rehab Centre" {...field} value={field.value ?? ""} data-testid="input-organisation" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone / WhatsApp *</FormLabel>
                                <FormControl>
                                  <Input placeholder="+91 98765 43210" {...field} value={field.value ?? ""} data-testid="input-phone" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address *</FormLabel>
                                <FormControl>
                                  <Input placeholder="priya@rehabcentre.in" type="email" {...field} data-testid="input-email" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City *</FormLabel>
                                <FormControl>
                                  <Input placeholder="Mumbai" {...field} value={field.value ?? ""} data-testid="input-city" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="requirementType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>I Need *</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value ?? ""}>
                                  <FormControl>
                                    <SelectTrigger data-testid="select-requirement-type">
                                      <SelectValue placeholder="Select requirement" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="sensory-room-setup">Complete Sensory Room Setup</SelectItem>
                                    <SelectItem value="bulk-order">Bulk Order of Products</SelectItem>
                                    <SelectItem value="clinic-equipment">Clinic / OT Equipment</SelectItem>
                                    <SelectItem value="school-setup">School / Institutional Setup</SelectItem>
                                    <SelectItem value="rehab-gym">Rehab Gym Equipment</SelectItem>
                                    <SelectItem value="custom-quote">Custom / Other Quote</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tell Us More (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="E.g. We need equipment for a 300 sq ft sensory room at our school in Pune. Budget approx ₹1.5L..."
                                  className="resize-none"
                                  rows={3}
                                  {...field}
                                  value={field.value ?? ""}
                                  data-testid="textarea-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="w-full rounded-xl h-12 text-base font-semibold"
                          disabled={mutation.isPending}
                          data-testid="button-submit-enquiry"
                        >
                          {mutation.isPending ? (
                            <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Submitting…</>
                          ) : (
                            <><Send className="mr-2 w-4 h-4" /> Submit Enquiry — Get My Quote</>
                          )}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          No spam. Your details are only used to prepare your quote.
                        </p>
                      </form>
                    </Form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Social Proof / Testimonial Strip ── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                quote: "Abley's made it incredibly easy to stock our sensory room. The bulk pricing was fair and the GST invoice was ready within the hour.",
                author: "Ruchika M.",
                role: "Occupational Therapist, Mumbai",
              },
              {
                quote: "We set up our school's entire sensory corner through Abley's. Quick delivery, great quality — and they even recommended the right products for our budget.",
                author: "Ananya K.",
                role: "Special Educator, Bengaluru",
              },
              {
                quote: "Finally, a reliable Indian vendor for OT equipment that doesn't cut corners on quality. Our clinic swears by Abley's Rehab.",
                author: "Dr. Suresh P.",
                role: "Rehab Consultant, Delhi NCR",
              },
            ].map(({ quote, author, role }) => (
              <div key={author} className="rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground/85 leading-relaxed mb-4 italic">"{quote}"</p>
                <p className="text-sm font-semibold text-foreground">{author}</p>
                <p className="text-xs text-muted-foreground">{role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-muted/40 border-y">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">FAQ</span>
              <h2 className="text-3xl font-bold font-display text-foreground">Questions We Get a Lot</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-2" data-testid="accordion-faq">
              {FAQS.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card rounded-xl border px-5">
                  <AccordionTrigger className="text-sm font-semibold text-foreground text-left hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="relative overflow-hidden bg-primary text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_70%)]" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white/80 text-xs font-semibold uppercase tracking-widest mb-6">
              <TrendingUp className="w-3.5 h-3.5" /> Trusted by 500+ OTs Across India
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display leading-tight mb-5">
              Ready to Equip Your<br />
              <span className="italic text-amber-300">Facility the Right Way?</span>
            </h2>
            <p className="text-lg text-white/75 mb-8 max-w-xl mx-auto leading-relaxed">
              Register with your phone — we'll send you a custom quote within 24 hours, no commitment needed.
            </p>

            <div className="max-w-md mx-auto mb-6">
              <PhoneSignupInline
                variant="dark"
                label="Register for your free quote"
                sublabel="Get bulk pricing, GST invoice, and free shipping info"
                containerId="recaptcha-lp-final"
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={scrollToForm}
                className="text-white/65 hover:text-white text-sm font-medium underline underline-offset-2 transition-colors"
                data-testid="button-get-quote-final"
              >
                Fill detailed enquiry form instead →
              </button>
              <a
                href="https://wa.me/917042180166?text=Hi%2C%20I%27d%20like%20a%20bulk%20B2B%20quote%20from%20Abley%27s%20Rehab."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/65 hover:text-white text-sm font-medium transition-colors"
                data-testid="link-whatsapp-final"
              >
                <MessageCircle className="w-3.5 h-3.5" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Slim Footer ── */}
      <footer className="border-t bg-background py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <img src={logoPath} alt="Abley's Rehab" className="h-7 object-contain opacity-80" />
            <span className="text-xs">A brand of Eighth Fold Circle Pvt Ltd.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="mailto:team@ableys.in" className="flex items-center gap-1.5 hover:text-primary transition-colors" data-testid="link-email-footer">
              <Mail className="w-3.5 h-3.5" /> team@ableys.in
            </a>
            <a href="tel:+917042180166" className="flex items-center gap-1.5 hover:text-primary transition-colors" data-testid="link-phone-footer">
              <Phone className="w-3.5 h-3.5" /> +91 70421 80166
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Noida, India
            </span>
          </div>
          <p className="text-xs">© {new Date().getFullYear()} Abley's Rehab</p>
        </div>
      </footer>
    </div>
  );
}
