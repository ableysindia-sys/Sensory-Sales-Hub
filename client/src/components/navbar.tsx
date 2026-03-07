import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoPath from "@assets/ableys_rehab_logo.png";

const navLinks = [
  { label: "Categories", href: "#categories" },
  { label: "Quality", href: "#quality" },
  { label: "Why Us", href: "#features" },
  { label: "Contact", href: "#enquiry" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className="flex items-center gap-2" data-testid="link-home">
            <img src={logoPath} alt="Abley's Rehab" className="h-8 lg:h-10 w-auto" data-testid="img-logo" />
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors rounded-md"
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => scrollTo("#enquiry")}
              data-testid="button-nav-enquiry"
            >
              Bulk Enquiry
            </Button>
            <Button
              size="sm"
              className="rounded-full"
              onClick={() => scrollTo("#categories")}
              data-testid="button-nav-explore"
            >
              Explore
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground transition-colors"
              data-testid={`link-mobile-${link.label.toLowerCase()}`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex gap-2 mt-3 px-4">
            <Button variant="outline" size="sm" className="rounded-full flex-1" onClick={() => scrollTo("#enquiry")} data-testid="button-mobile-enquiry">
              Bulk Enquiry
            </Button>
            <Button size="sm" className="rounded-full flex-1" onClick={() => scrollTo("#categories")} data-testid="button-mobile-explore">
              Explore
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
