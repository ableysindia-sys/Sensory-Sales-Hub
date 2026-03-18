import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, BadgeIndianRupee, Users, Send, MessageCircle } from "lucide-react";
import { Link } from "wouter";
import heroBannerImg from "@assets/generated_images/hero-banner.png";

const WHATSAPP_URL = "https://wa.me/917042180166?text=Hi%20Abley%27s%2C%20I%27m%20interested%20in%20bulk%20rehab%20equipment%20for%20my%20institution.";

export function Hero() {
  return (
    <section className="relative w-full" data-testid="section-hero">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBannerImg}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
          loading="eager"
          data-testid="img-hero"
        />
        {/* Mobile: top-to-bottom dark curtain */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/82 to-black/92 sm:hidden" />
        {/* Desktop: left reading lane + bottom vignette */}
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-black/90 via-black/68 to-black/15" />
        <div className="absolute inset-0 hidden sm:block bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-page mx-auto px-5 sm:px-10 lg:px-14 w-full
                      pt-28 pb-10
                      sm:pt-32 sm:pb-14
                      lg:pt-40 lg:pb-20">
        <div className="max-w-[560px]">

          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/90 text-white text-[10px] sm:text-[11px] font-semibold tracking-[0.1em] uppercase mb-4 shadow-lg"
            data-testid="text-hero-label"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            India's Leading OT Equipment Supplier
          </div>

          {/* Headline */}
          <h1
            className="text-[1.9rem] sm:text-5xl lg:text-[3.2rem] font-bold text-white leading-[1.1] mb-3 sm:mb-4 font-display drop-shadow-xl"
            data-testid="heading-hero"
          >
            Equip Your Clinic,<br />
            School or{" "}
            <span className="italic text-amber-300">Sensory Room.</span>
          </h1>

          {/* Descriptor */}
          <p
            className="text-sm sm:text-[1.05rem] text-white/85 leading-relaxed mb-6 sm:mb-7 max-w-[440px]"
            data-testid="text-hero-desc"
          >
            Premium rehab &amp; sensory equipment with bulk pricing, GST invoices, and custom setup support for OT clinics, schools &amp; hospitals across India.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Link href="/enquiry">
              <Button
                size="lg"
                className="!bg-white !text-gray-900 hover:!bg-amber-50 rounded-full text-sm px-7 h-12 gap-2 font-semibold shadow-xl shadow-black/30 !border-0 w-full sm:w-auto justify-center"
                data-testid="button-hero-quote"
              >
                <Send className="w-4 h-4" /> Get a Bulk Quote
              </Button>
            </Link>
            <Link href="/products">
              <button
                className="h-12 px-7 rounded-full border border-white/60 bg-white/10 text-white text-sm font-semibold hover:bg-white/20 hover:border-white/80 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
                data-testid="button-hero-browse"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* WhatsApp quick-connect */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-7"
            data-testid="link-hero-whatsapp"
          >
            <MessageCircle className="w-4 h-4 text-green-400" />
            <span>Or chat on <span className="text-green-400 font-semibold">WhatsApp</span> — we reply within minutes</span>
          </a>

          {/* Trust callouts — pill grid on mobile, inline row on desktop */}
          <div className="sm:hidden grid grid-cols-3 gap-2">
            {[
              { icon: Users,            text: "500+\nInstitutions" },
              { icon: BadgeIndianRupee, text: "GST\nInvoices" },
              { icon: ShieldCheck,      text: "OT-\nApproved" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex flex-col items-center gap-1.5 rounded-xl bg-white/20 border border-white/35 py-3 px-2 text-center backdrop-blur-sm"
              >
                <Icon className="w-4 h-4 text-amber-300 flex-shrink-0" />
                <span className="text-[10px] leading-tight text-white/90 whitespace-pre-line font-medium">{text}</span>
              </div>
            ))}
          </div>

          <div className="hidden sm:flex flex-wrap gap-x-5 gap-y-1.5">
            {[
              { icon: Users,            text: "Trusted by 500+ institutions" },
              { icon: BadgeIndianRupee, text: "GST invoices · Bulk discounts" },
              { icon: ShieldCheck,      text: "OT-validated products" },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5 text-xs text-white/80">
                <Icon className="w-3.5 h-3.5 text-amber-300/80" />
                {text}
              </span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
