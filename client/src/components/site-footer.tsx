import logoPath from "@assets/ableys_rehab_logo.png";

const footerLinks = {
  categories: ["Swings", "Ballpool", "Mats", "Movement & Balance", "Climbing", "ADL Kit", "Therapy Balls", "Deep Pressure", "Visual"],
  services: ["Bulk Orders", "Customization", "New Centre Setup", "Consultation"],
  company: ["About Us", "Quality Standards", "Contact", "Careers"],
};

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <img src={logoPath} alt="Abley's Rehab" className="h-8 w-auto mb-4 brightness-0 invert" data-testid="img-footer-logo" />
            <p className="text-background/60 text-sm leading-relaxed mb-6">
              Professional therapy tools for experts. Equipping therapists, centres, clinics, and institutions.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-background/40">
              <span className="px-2.5 py-1 rounded-full border border-background/10">Made in India</span>
              <span className="px-2.5 py-1 rounded-full border border-background/10">6 Months Warranty</span>
              <span className="px-2.5 py-1 rounded-full border border-background/10">B2B Ready</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-background/90 mb-4">Categories</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-sm text-background/50 transition-colors"
                    data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-background/90 mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-sm text-background/50 transition-colors"
                    data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-background/90 mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <button
                    className="text-sm text-background/50 transition-colors"
                    data-testid={`link-footer-${link.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40" data-testid="text-footer-copy">
            &copy; {new Date().getFullYear()} Abley's Rehab. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Twitter", "LinkedIn", "Instagram"].map((social) => (
              <button key={social} className="text-xs text-background/40 transition-colors" data-testid={`link-social-${social.toLowerCase()}`}>
                {social}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
