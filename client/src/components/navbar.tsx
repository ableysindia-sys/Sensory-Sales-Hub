import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, ChevronDown, Send } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { categories } from "@/lib/catalogue-data";
import logoPath from "@assets/ableys_rehab_logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products", hasDropdown: true },
  { label: "Categories", href: "/#categories" },
  { label: "Bulk Orders", href: "/enquiry" },
  { label: "Custom Tools", href: "/enquiry" },
  { label: "Contact", href: "/#enquiry" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { getItemCount } = useEnquiryCart();
  const [location, navigate] = useLocation();
  const itemCount = getItemCount();

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setProductsOpen(false);
    if (href.startsWith("/#")) {
      if (location !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(href.replace("/#", ""))?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.getElementById(href.replace("/#", ""))?.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-border/40" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <img src={logoPath} alt="Abley's Rehab" className="h-8 lg:h-10 w-auto" data-testid="img-logo" />
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => setProductsOpen(!productsOpen)}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                    data-testid="link-nav-products"
                  >
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
                  </button>
                  {productsOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProductsOpen(false)} />
                      <div className="absolute top-full left-0 mt-2 w-72 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl z-50 p-2 animate-fade-up" data-testid="dropdown-products">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/category/${cat.slug}`}
                            onClick={() => setProductsOpen(false)}
                            className="flex items-center justify-between px-3.5 py-2.5 text-sm text-muted-foreground rounded-xl hover:bg-muted/60 hover:text-foreground transition-all"
                            data-testid={`link-dropdown-${cat.slug}`}
                          >
                            <span className="font-medium text-foreground">{cat.title}</span>
                            <span className="text-[11px] text-muted-foreground/70 bg-muted/80 px-2 py-0.5 rounded-full">{cat.products.length}</span>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </button>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/enquiry">
              <Button variant="outline" size="sm" className="rounded-full relative gap-2 border-border/60 hover:border-primary/30 hover:bg-primary/5 transition-all" data-testid="button-nav-cart">
                <ShoppingCart className="w-4 h-4" />
                Enquiry Cart
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-primary/30" data-testid="badge-cart-count">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link href="/#enquiry">
              <Button size="sm" className="rounded-full gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all" data-testid="button-nav-bulk-enquiry">
                <Send className="w-3.5 h-3.5" />
                Bulk Enquiry
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link href="/enquiry">
              <Button variant="ghost" size="icon" className="relative" data-testid="button-mobile-cart">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/40 px-4 pb-6 animate-fade-up">
          <div className="py-2 space-y-1">
            <button
              onClick={() => handleNavClick("/")}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
              data-testid="link-mobile-home"
            >
              Home
            </button>
            <div>
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
                data-testid="link-mobile-products"
              >
                Products
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
              </button>
              {productsOpen && (
                <div className="pl-4 pb-2 space-y-0.5">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      onClick={() => { setMobileOpen(false); setProductsOpen(false); }}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                      data-testid={`link-mobile-category-${cat.slug}`}
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => handleNavClick("/#categories")}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
              data-testid="link-mobile-categories"
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick("/enquiry")}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
              data-testid="link-mobile-bulk-orders"
            >
              Bulk Orders
            </button>
            <button
              onClick={() => handleNavClick("/enquiry")}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
              data-testid="link-mobile-custom-tools"
            >
              Custom Tools
            </button>
            <button
              onClick={() => handleNavClick("/#enquiry")}
              className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl transition-all"
              data-testid="link-mobile-contact"
            >
              Contact
            </button>
          </div>
          <div className="px-4 pt-4 border-t border-border/30">
            <Button
              size="lg"
              className="w-full rounded-full gap-2"
              onClick={() => handleNavClick("/#enquiry")}
              data-testid="button-mobile-bulk-enquiry"
            >
              <Send className="w-4 h-4" />
              Bulk Enquiry
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
