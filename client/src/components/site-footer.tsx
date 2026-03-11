import { Link } from "wouter";
import logoPath from "@assets/ableys_rehab_logo.png";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    icon: SiFacebook,
    url: "https://www.facebook.com/ableysrehab",
  },
  {
    name: "Instagram",
    icon: SiInstagram,
    url: "https://www.instagram.com/ableysrehab",
  },
  {
    name: "YouTube",
    icon: SiYoutube,
    url: "https://www.youtube.com/@ableysrehab",
  },
];

const quickLinks = [
  { label: "All Products", href: "/products" },
  { label: "Bulk / Custom Enquiry", href: "/enquiry" },
  { label: "About Us", href: "/page/about-ableys-sensory-tools" },
  { label: "Affiliate Program", href: "/page/affiliate-program-for-sensory-products" },
  { label: "Contact Us", href: "/contact" },
];

const resourceLinks = [
  { label: "Weighted Vest Size Chart", href: "/page/weighted-vest-size-chart" },
  { label: "Body Sock Size Guide", href: "/page/sensory-body-sock-sizing-guide" },
  { label: "Affiliate Program FAQ", href: "/page/ableys-affiliate-program-faq" },
];

const policyLinks = [
  { label: "Shipping Policy", href: "/page/shipping-policy" },
  { label: "Return Policy", href: "/page/return-policy" },
  { label: "Privacy Policy", href: "/page/privacy-policy" },
  { label: "Terms of Service", href: "/page/terms-of-service" },
];

export function SiteFooter() {
  return (
    <footer className="bg-gray-950 text-white" data-testid="footer">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="lg:col-span-3">
            <img
              src={logoPath}
              alt="Abley's Rehab"
              className="h-9 w-auto mb-5 brightness-0 invert"
              data-testid="img-footer-logo"
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Professional therapy tools for occupational therapists, clinics,
              and sensory rooms. Made in India with love.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-gray-800/60 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  data-testid={`link-social-${social.name.toLowerCase()}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-sm text-white/90 mb-5 uppercase tracking-wider text-[13px]">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-sm text-white/90 mb-5 uppercase tracking-wider text-[13px]">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-semibold text-sm text-white/90 mb-5 uppercase tracking-wider text-[13px]">
              Policies
            </h4>
            <ul className="space-y-3">
              {policyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="font-semibold text-sm text-white/90 mb-5 uppercase tracking-wider text-[13px]">
              Get in Touch
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">A brand of Eighth Fold Circle Pvt Ltd.</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400 leading-relaxed">Khasra No. 227 PS Tower, Village Mamura Sector 66, 201301 Noida, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                <a
                  href="tel:+917042180166"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  data-testid="link-footer-phone"
                >
                  +91-704-218-0166
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                <a
                  href="mailto:team@ableys.in"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                  data-testid="link-footer-email"
                >
                  team@ableys.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/50">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-gray-500" data-testid="text-footer-copy">
            &copy; {new Date().getFullYear()} Abley's Rehab. All rights
            reserved.
          </p>
          <p className="text-xs text-gray-600">
            Made with care in India
          </p>
        </div>
      </div>
    </footer>
  );
}
