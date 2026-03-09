import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, ChevronDown, Send, Box } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { Link, useLocation } from "wouter";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { useShoppingCart } from "@/lib/shopping-cart";
import { categories } from "@/lib/catalogue-data";
import logoPath from "@assets/ableys_rehab_logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "#products", hasDropdown: true },
  { label: "Categories", href: "/#categories" },
  { label: "Room Builder", href: "/sensory-room-builder" },
  { label: "Bulk Orders", href: "/enquiry" },
  { label: "Contact", href: "/contact" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-foreground text-background text-xs py-2 px-4" data-testid="announcement-bar">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <a href="https://www.facebook.com/ableysrehab" target="_blank" rel="noopener noreferrer" aria-label="Facebook" data-testid="link-social-facebook" className="opacity-70 hover:opacity-100 transition-opacity p-1.5 min-w-[28px] min-h-[28px] flex items-center justify-center">
            <SiFacebook className="w-3.5 h-3.5" />
          </a>
          <a href="https://www.instagram.com/ableysrehab" target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-testid="link-social-instagram" className="opacity-70 hover:opacity-100 transition-opacity p-1.5 min-w-[28px] min-h-[28px] flex items-center justify-center">
            <SiInstagram className="w-3.5 h-3.5" />
          </a>
          <a href="https://www.youtube.com/@ableysrehab" target="_blank" rel="noopener noreferrer" aria-label="YouTube" data-testid="link-social-youtube" className="opacity-70 hover:opacity-100 transition-opacity p-1.5 min-w-[28px] min-h-[28px] flex items-center justify-center">
            <SiYoutube className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="font-medium tracking-wide text-center flex-1" data-testid="text-announcement">
          Free Shipping All Over India
        </p>
        <div className="w-[72px] hidden sm:block" />
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { getItemCount: getEnquiryCount } = useEnquiryCart();
  const { getItemCount: getCartCount, openDrawer } = useShoppingCart();
  const [location, navigate] = useLocation();
  const enquiryCount = getEnquiryCount();
  const cartCount = getCartCount();

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

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    if (href.startsWith("/#")) return false;
    return location.startsWith(href);
  };

  return (
    <header className="fixed top-0 w-full z-50" data-testid="navbar">
      <a href="#main-content" className="skip-to-content" data-testid="link-skip-to-content">
        Skip to content
      </a>
      <AnnouncementBar />
      <nav className="bg-background/95 backdrop-blur-md border-b border-border supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0" data-testid="link-home">
              <img src={logoPath} alt="Abley's Rehab" className="h-8 lg:h-10 w-auto" data-testid="img-logo" />
            </Link>

            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => setProductsOpen(!productsOpen)}
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                        location.startsWith("/product") || location.startsWith("/category")
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      data-testid="link-nav-products"
                    >
                      {link.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
                    </button>
                    {productsOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setProductsOpen(false)} />
                        <div className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-md shadow-lg z-50 py-1" data-testid="dropdown-products">
                          <Link
                            href="/products"
                            onClick={() => setProductsOpen(false)}
                            className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                            data-testid="link-dropdown-all"
                          >
                            <span className="font-medium text-foreground">All Products</span>
                            <span className="text-xs text-muted-foreground">View All</span>
                          </Link>
                          <div className="border-t border-border my-1" />
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/category/${cat.slug}`}
                              onClick={() => setProductsOpen(false)}
                              className="flex items-center justify-between px-4 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                              data-testid={`link-dropdown-${cat.slug}`}
                            >
                              <span>{cat.title}</span>
                              <span className="text-xs">{cat.products.length}</span>
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
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={openDrawer}
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-nav-shopping-cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center" data-testid="badge-shopping-cart-count">
                    {cartCount}
                  </span>
                )}
              </button>
              <Link href="/enquiry">
                <Button variant="outline" size="sm" className="relative gap-2" data-testid="button-nav-cart">
                  <Box className="w-4 h-4" />
                  Enquiry
                  {enquiryCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center" data-testid="badge-cart-count">
                      {enquiryCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/enquiry">
                <Button size="sm" className="gap-2" data-testid="button-nav-bulk-enquiry">
                  <Send className="w-3.5 h-3.5" />
                  Bulk Enquiry
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={openDrawer}
                className="relative p-2 text-muted-foreground"
                data-testid="button-mobile-shopping-cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <Link href="/enquiry">
                <Button variant="ghost" size="icon" className="relative" data-testid="button-mobile-cart">
                  <Box className="w-5 h-5" />
                  {enquiryCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                      {enquiryCount}
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
          <div className="lg:hidden bg-background border-t border-border px-4 pb-6">
            <div className="py-2 space-y-1">
              <button
                onClick={() => handleNavClick("/")}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                data-testid="link-mobile-home"
              >
                Home
              </button>
              <div>
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
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
                        className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md transition-colors"
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
                className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                data-testid="link-mobile-categories"
              >
                Categories
              </button>
              <button
                onClick={() => handleNavClick("/sensory-room-builder")}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                data-testid="link-mobile-room-builder"
              >
                Room Builder
              </button>
              <button
                onClick={() => handleNavClick("/enquiry")}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                data-testid="link-mobile-bulk-orders"
              >
                Bulk Orders
              </button>
              <button
                onClick={() => handleNavClick("/contact")}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                data-testid="link-mobile-contact"
              >
                Contact
              </button>
            </div>
            <div className="px-4 pt-4 border-t border-border">
              <Button
                size="lg"
                className="w-full gap-2"
                onClick={() => handleNavClick("/enquiry")}
                data-testid="button-mobile-bulk-enquiry"
              >
                <Send className="w-4 h-4" />
                Bulk Enquiry
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
