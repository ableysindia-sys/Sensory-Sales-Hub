import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, ChevronDown, Send, LogIn, LogOut, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { useShoppingCart } from "@/lib/shopping-cart";
import { useProducts } from "@/lib/product-provider";
import { useAuth } from "@/lib/auth-context";
import logoPath from "@assets/ableys_rehab_logo.png";

const ANNOUNCEMENTS = [
  "🚚 Free Shipping All Over India",
  "🏷️ GST Invoices for All Institutional Orders",
  "💬 Bulk pricing for OT Clinics & Schools — Chat with us",
  "⭐ Trusted by 500+ Occupational Therapists Across India",
];

const navLinks = [
  { label: "Products", href: "#products", hasDropdown: true },
  { label: "Bulk Orders", href: "/enquiry" },
  { label: "Contact", href: "/contact" },
];

export function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % ANNOUNCEMENTS.length);
        setVisible(true);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary text-primary-foreground text-xs py-2 px-4 overflow-hidden" data-testid="announcement-bar">
      <div className="max-w-page mx-auto text-center">
        <p
          className="font-medium tracking-wide transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
          data-testid="text-announcement"
        >
          {ANNOUNCEMENTS[idx]}
        </p>
      </div>
    </div>
  );
}

function UserAvatar() {
  const { user, logout, openAuthDrawer } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!user) {
    return (
      <button
        onClick={() => openAuthDrawer()}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-foreground/70 hover:text-foreground border border-border rounded-full transition-colors"
        data-testid="button-sign-in"
      >
        <LogIn className="w-3.5 h-3.5" />
        Sign In
      </button>
    );
  }

  const display = user.displayName
    ? user.displayName
    : user.phoneNumber
    ? user.phoneNumber.replace("+91", "+91 ")
    : user.email ?? "User";

  const initial = user.displayName
    ? user.displayName[0].toUpperCase()
    : user.phoneNumber
    ? user.phoneNumber.slice(-2, -1)
    : user.email
    ? user.email[0].toUpperCase()
    : "U";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors"
        data-testid="button-user-avatar"
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt={display} className="w-7 h-7 rounded-full object-cover" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
            {initial}
          </div>
        )}
        <span className="text-xs font-semibold text-foreground max-w-[100px] truncate">{display}</span>
        <ChevronDown className={`w-3 h-3 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-muted/30">
            <p className="text-xs text-muted-foreground">Signed in as</p>
            <p className="text-sm font-semibold text-foreground truncate">{display}</p>
          </div>
          <button
            onClick={() => { logout(); setOpen(false); }}
            className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            data-testid="button-sign-out"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const { getItemCount: getEnquiryCount } = useEnquiryCart();
  const { getItemCount: getCartCount, openDrawer } = useShoppingCart();
  const { categories } = useProducts();
  const { user, logout, openAuthDrawer } = useAuth();
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
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
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
                      className={`flex items-center gap-1 px-4 py-2 text-[13px] font-semibold uppercase tracking-wider transition-colors ${
                        location.startsWith("/product") || location.startsWith("/category")
                          ? "text-primary"
                          : "text-foreground/70 hover:text-foreground"
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
                            <span className="font-semibold text-foreground">All Products</span>
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
                              <span className="text-xs">{cat.products?.length ?? ""}</span>
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
                    className={`px-4 py-2 text-[13px] font-semibold uppercase tracking-wider transition-colors ${
                      isActive(link.href)
                        ? "text-primary"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </button>
                )
              )}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <UserAvatar />
              <button
                onClick={openDrawer}
                className="relative p-2 text-foreground/60 hover:text-foreground transition-colors"
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
                <Button size="sm" className="gap-2 rounded-none text-xs font-semibold uppercase tracking-wider" data-testid="button-nav-bulk-enquiry">
                  <Send className="w-3.5 h-3.5" />
                  Get a Quote
                  {enquiryCount > 0 && (
                    <span className="ml-1 w-5 h-5 bg-white/20 text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center" data-testid="badge-cart-count">
                      {enquiryCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-1 lg:hidden">
              <button
                onClick={openDrawer}
                className="relative p-2.5 text-foreground/60 hover:text-foreground transition-colors"
                data-testid="button-mobile-shopping-cart"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(!mobileOpen)}
                data-testid="button-mobile-menu"
                aria-label="Menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-background border-t border-border px-4 pb-6">
            <div className="py-2 space-y-1">
              {user && (
                <div className="flex items-center gap-3 px-4 py-3 mb-1 bg-primary/5 rounded-xl border border-primary/10">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {user.displayName?.[0]?.toUpperCase() ?? user.phoneNumber?.slice(-2, -1) ?? user.email?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {user.displayName ?? user.phoneNumber ?? user.email ?? "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">Signed in</p>
                  </div>
                </div>
              )}

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
                    <Link
                      href="/products"
                      onClick={() => { setMobileOpen(false); setProductsOpen(false); }}
                      className="block px-4 py-2.5 text-sm font-medium text-foreground rounded-md transition-colors"
                      data-testid="link-mobile-all-products"
                    >
                      All Products
                    </Link>
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

              {user ? (
                <button
                  onClick={() => { logout(); setMobileOpen(false); }}
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors"
                  data-testid="button-mobile-sign-out"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => { openAuthDrawer(); setMobileOpen(false); }}
                  className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-primary hover:bg-primary/5 rounded-md transition-colors"
                  data-testid="button-mobile-sign-in"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In / Register
                </button>
              )}
            </div>
            <div className="px-4 pt-4 border-t border-border">
              <Button
                size="lg"
                className="w-full gap-2 rounded-none font-semibold uppercase tracking-wider"
                onClick={() => handleNavClick("/enquiry")}
                data-testid="button-mobile-bulk-enquiry"
              >
                <Send className="w-4 h-4" />
                Get a Quote
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
