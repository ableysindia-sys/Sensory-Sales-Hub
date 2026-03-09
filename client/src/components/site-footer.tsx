import { Link } from "wouter";
import { useProducts } from "@/lib/product-provider";
import logoPath from "@assets/ableys_rehab_logo.png";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { Mail, MapPin, Phone } from "lucide-react";

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

export function SiteFooter() {
  const { categories } = useProducts();
  return (
    <footer className="bg-gray-950 text-white" data-testid="footer">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <img
              src={logoPath}
              alt="Abley's Rehab"
              className="h-9 w-auto mb-5 brightness-0 invert"
              data-testid="img-footer-logo"
            />
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Empowering families and therapists with safe, certified therapy
              tools and adaptive products for children with special needs.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
                  data-testid={`link-social-${social.name.toLowerCase()}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white/90 mb-5 uppercase tracking-wider text-[13px]">
              Shop
            </h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                    data-testid={`link-footer-${cat.slug}`}
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                  data-testid="link-footer-all-products"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white/90 mb-5 uppercase tracking-wider text-[13px]">
              Help & Info
            </h4>
            <ul className="space-y-2.5">
              {[
                "About Us",
                "Contact Us",
                "Shipping Policy",
                "Return Policy",
                "Privacy Policy",
                "Terms of Service",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                    data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white/90 mb-5 uppercase tracking-wider text-[13px]">
              Our Commitment
            </h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              At Abley's, we are committed to providing safe, high-quality
              therapy products that support every child's growth and
              development. Every product is designed with care and tested to
              meet the highest safety standards.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">
                  India
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                <a
                  href="mailto:info@ableys.in"
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                  data-testid="link-footer-email"
                >
                  info@ableys.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gray-500 mt-0.5 shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
                  data-testid="link-footer-phone"
                >
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/60">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500" data-testid="text-footer-copy">
            &copy; {new Date().getFullYear()} Abley's Rehab. All rights
            reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1.5"
                data-testid={`link-social-bottom-${social.name.toLowerCase()}`}
              >
                <social.icon className="w-3.5 h-3.5" />
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
