import { Link } from "wouter";
import { categories } from "@/lib/catalogue-data";
import logoPath from "@assets/ableys_rehab_logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-gray-950 text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <img src={logoPath} alt="Abley's Rehab" className="h-9 w-auto mb-5 brightness-0 invert" data-testid="img-footer-logo" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Professional therapy tools for experts. Equipping therapists, centres, clinics, and institutions.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1.5 rounded-full border border-gray-800 text-gray-500">Made in India</span>
              <span className="px-3 py-1.5 rounded-full border border-gray-800 text-gray-500">6 Months Warranty</span>
              <span className="px-3 py-1.5 rounded-full border border-gray-800 text-gray-500">B2B Ready</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white/90 mb-5 uppercase tracking-wider text-[13px]">Categories</h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    data-testid={`link-footer-${cat.slug}`}
                  >
                    {cat.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white/90 mb-5 uppercase tracking-wider text-[13px]">Services</h4>
            <ul className="space-y-2.5">
              {["Bulk Orders", "Customization", "New Centre Setup", "Consultation"].map((link) => (
                <li key={link}>
                  <Link
                    href="/enquiry"
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white/90 mb-5 uppercase tracking-wider text-[13px]">Company</h4>
            <ul className="space-y-2.5">
              {["About Us", "Quality Standards", "Contact", "Careers"].map((link) => (
                <li key={link}>
                  <Link
                    href="/"
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600" data-testid="text-footer-copy">
            &copy; {new Date().getFullYear()} Abley's Rehab. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Twitter", "LinkedIn", "Instagram"].map((social) => (
              <button key={social} className="text-xs text-gray-600 hover:text-gray-400 transition-colors" data-testid={`link-social-${social.toLowerCase()}`}>
                {social}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
