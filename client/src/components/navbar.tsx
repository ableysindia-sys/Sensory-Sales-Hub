import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, ChevronDown, Send, LogIn, LogOut, FileDown, Building2, FlaskConical, Info, Phone, Home, Grid3X3 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { useShoppingCart } from "@/lib/shopping-cart";
import { useProducts } from "@/lib/product-provider";
import { useAuth } from "@/lib/auth-context";
import logoPath from "@assets/ableys_rehab_logo.png";

const ANNOUNCEMENTS = [
  "🏷️ GST Invoices Provided for All Institutional Orders",
  "📦 Bulk Pricing for OT Clinics, Schools & Hospitals — Get a Quote",
  "🚚 Free Shipping Across India · Dispatch in 1–2 Business Days",
  "⭐ Trusted by 500+ Institutions · Custom Setups Available",
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
    navigate(href);
  };

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const display = user
    ? (user.displayName ?? user.phoneNumber ?? user.email ?? "User")
    : null;

  const initial = user
    ? (user.displayName?.[0]?.toUpperCase() ?? user.phoneNumber?.slice(-2, -1) ?? user.email?.[0]?.toUpperCase() ?? "U")
    : "U";

  return (
    <header className="fixed top-0 w-full z-50" data-testid="navbar">
      <a href="#main-content" className="skip-to-content" data-testid="link-skip-to-content">
        Skip to content
      </a>
      <AnnouncementBar />
      <nav className="bg-background/95 backdrop-blur-md border-b border-border supports-[backdrop-filter]:bg-background/80">
        <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0" data-testid="link-home">
              <img src={logoPath} alt="Abley's Rehab" className="h-11 lg:h-14 w-auto" data-testid="img-logo" />
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-0.5">

              {/* Products dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProductsOpen(!productsOpen)}
                  className={`flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold transition-colors rounded-md ${
                    location.startsWith("/product") || location.startsWith("/category")
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  }`}
                  data-testid="link-nav-products"
                >
                  Products
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
                </button>
                {productsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProductsOpen(false)} />
                    <div className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-xl shadow-xl z-50 py-2 overflow-hidden" data-testid="dropdown-products">
                      <Link
                        href="/products"
                        onClick={() => setProductsOpen(false)}
                        className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                        data-testid="link-dropdown-all"
                      >
                        <span className="font-semibold text-foreground">All Products</span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">116+</span>
                      </Link>
                      <div className="border-t border-border my-1.5 mx-3" />
                      <p className="px-4 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Browse by Category</p>
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/category/${cat.slug}`}
                          onClick={() => setProductsOpen(false)}
                          className="flex items-center justify-between px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          data-testid={`link-dropdown-${cat.slug}`}
                        >
                          <span>{cat.title}</span>
                          <span className="text-xs text-muted-foreground/60">{cat.products?.length ?? ""}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* B2B / Bulk Orders */}
              <Link href="/lp">
                <button
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold transition-colors rounded-md ${
                    isActive("/lp") ? "text-primary" : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  }`}
                  data-testid="link-nav-b2b"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  B2B / Bulk
                </button>
              </Link>

              {/* Sample Kit */}
              <Link href="/sample">
                <button
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold transition-colors rounded-md ${
                    isActive("/sample") ? "text-primary" : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  }`}
                  data-testid="link-nav-sample"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  Sample Kit
                </button>
              </Link>

              {/* About */}
              <Link href="/about">
                <button
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold transition-colors rounded-md ${
                    isActive("/about") ? "text-primary" : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  }`}
                  data-testid="link-nav-about"
                >
                  <Info className="w-3.5 h-3.5" />
                  About
                </button>
              </Link>

              {/* Contact */}
              <Link href="/contact">
                <button
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-[13px] font-semibold transition-colors rounded-md ${
                    isActive("/contact") ? "text-primary" : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  }`}
                  data-testid="link-nav-contact"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Contact
                </button>
              </Link>
            </div>

            {/* Desktop right actions */}
            <div className="hidden lg:flex items-center gap-2">
              <a
                href="/api/catalog"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-colors border border-border"
                data-testid="link-nav-catalogue-pdf"
              >
                <FileDown className="w-3.5 h-3.5" />
                Catalogue
              </a>
              <UserAvatar />
              <button
                onClick={openDrawer}
                className="relative p-2 text-foreground/60 hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
                data-testid="button-nav-shopping-cart"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center" data-testid="badge-shopping-cart-count">
                    {cartCount}
                  </span>
                )}
              </button>
              <Link href="/enquiry">
                <Button size="sm" className="gap-1.5 rounded-full text-xs font-semibold px-4" data-testid="button-nav-bulk-enquiry">
                  <Send className="w-3.5 h-3.5" />
                  Get a Quote
                  {enquiryCount > 0 && (
                    <span className="ml-0.5 w-4 h-4 bg-white/25 text-[10px] font-bold rounded-full flex items-center justify-center" data-testid="badge-cart-count">
                      {enquiryCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile right: cart + enquiry + hamburger */}
            <div className="flex items-center gap-0.5 lg:hidden">
              {/* Enquiry cart badge */}
              <Link href="/enquiry">
                <button
                  className="relative p-2.5 text-foreground/60 hover:text-foreground transition-colors"
                  data-testid="button-mobile-enquiry-cart"
                  aria-label="Enquiry cart"
                >
                  <Send className="w-[18px] h-[18px]" />
                  {enquiryCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center" data-testid="badge-mobile-enquiry-count">
                      {enquiryCount}
                    </span>
                  )}
                </button>
              </Link>

              {/* Shopping cart */}
              <button
                onClick={openDrawer}
                className="relative p-2.5 text-foreground/60 hover:text-foreground transition-colors"
                data-testid="button-mobile-shopping-cart"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-[18px] h-[18px]" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-[9px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 text-foreground/70 hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                data-testid="button-mobile-menu"
                aria-label="Menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className={`lg:hidden fixed top-0 right-0 bottom-0 z-[70] w-full max-w-sm bg-background shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
        data-testid="mobile-nav-drawer"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <img src={logoPath} alt="Abley's Rehab" className="h-9 w-auto" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close menu"
            data-testid="button-mobile-menu-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User section */}
        {user ? (
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-border bg-primary/5 shrink-0">
            {user.photoURL ? (
              <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">
                {initial}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{display}</p>
              <p className="text-xs text-muted-foreground">Signed in</p>
            </div>
            <button
              onClick={() => { logout(); setMobileOpen(false); }}
              className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-red-600 border border-red-200 dark:border-red-900 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
              data-testid="button-mobile-sign-out"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign out
            </button>
          </div>
        ) : (
          <button
            onClick={() => { openAuthDrawer(); setMobileOpen(false); }}
            className="flex items-center gap-3 px-5 py-3.5 border-b border-border hover:bg-primary/5 transition-colors shrink-0"
            data-testid="button-mobile-sign-in"
          >
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
              <LogIn className="w-4.5 h-4.5 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-foreground">Sign In / Register</p>
              <p className="text-xs text-muted-foreground">Track orders & get bulk quotes</p>
            </div>
          </button>
        )}

        {/* Scrollable nav body */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <nav className="px-3 py-3 space-y-0.5" aria-label="Mobile navigation">

            {/* Home */}
            <button
              onClick={() => handleNavClick("/")}
              className={`flex items-center gap-3 w-full px-3 py-3 text-sm font-medium rounded-xl transition-colors ${location === "/" ? "text-primary bg-primary/8 font-semibold" : "text-foreground/70 hover:text-foreground hover:bg-muted"}`}
              data-testid="link-mobile-home"
            >
              <Home className="w-4.5 h-4.5 shrink-0" />
              Home
            </button>

            {/* Products expandable */}
            <div>
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                className={`flex items-center gap-3 justify-between w-full px-3 py-3 text-sm font-medium rounded-xl transition-colors ${(location.startsWith("/product") || location.startsWith("/category")) ? "text-primary bg-primary/8 font-semibold" : "text-foreground/70 hover:text-foreground hover:bg-muted"}`}
                data-testid="link-mobile-products"
              >
                <span className="flex items-center gap-3">
                  <Grid3X3 className="w-4.5 h-4.5 shrink-0" />
                  Products
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`} />
              </button>

              {productsOpen && (
                <div className="mt-1 mb-2 mx-1 rounded-xl border border-border bg-muted/30 overflow-hidden">
                  {/* All Products row */}
                  <Link
                    href="/products"
                    onClick={() => { setMobileOpen(false); setProductsOpen(false); }}
                    className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors border-b border-border"
                    data-testid="link-mobile-all-products"
                  >
                    All Products
                    <span className="text-xs font-normal text-muted-foreground bg-background px-2 py-0.5 rounded-full border border-border">116+</span>
                  </Link>

                  {/* Category label */}
                  <p className="px-4 pt-2.5 pb-1.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Browse by Category</p>

                  {/* 2-column chip grid */}
                  <div className="px-3 pb-3 grid grid-cols-2 gap-1.5">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/category/${cat.slug}`}
                        onClick={() => { setMobileOpen(false); setProductsOpen(false); }}
                        className={`block px-3 py-2.5 text-xs font-medium rounded-lg border transition-colors text-center leading-snug ${location === `/category/${cat.slug}` ? "bg-primary/10 text-primary border-primary/30" : "bg-background text-foreground/70 border-border hover:bg-muted hover:text-foreground"}`}
                        data-testid={`link-mobile-category-${cat.slug}`}
                      >
                        {cat.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="!my-2 border-t border-border mx-1" />

            {/* B2B / Bulk */}
            <button
              onClick={() => handleNavClick("/lp")}
              className={`flex items-center gap-3 w-full px-3 py-3 text-sm font-medium rounded-xl transition-colors ${isActive("/lp") ? "text-primary bg-primary/8 font-semibold" : "text-foreground/70 hover:text-foreground hover:bg-muted"}`}
              data-testid="link-mobile-b2b"
            >
              <Building2 className="w-4.5 h-4.5 shrink-0" />
              <span>B2B &amp; Bulk Orders</span>
            </button>

            {/* Sample Kit */}
            <button
              onClick={() => handleNavClick("/sample")}
              className={`flex items-center gap-3 w-full px-3 py-3 text-sm font-medium rounded-xl transition-colors ${isActive("/sample") ? "text-primary bg-primary/8 font-semibold" : "text-foreground/70 hover:text-foreground hover:bg-muted"}`}
              data-testid="link-mobile-sample"
            >
              <FlaskConical className="w-4.5 h-4.5 shrink-0" />
              <span className="flex-1 text-left">Sample Kit</span>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">₹1,499</span>
            </button>

            {/* About */}
            <button
              onClick={() => handleNavClick("/about")}
              className={`flex items-center gap-3 w-full px-3 py-3 text-sm font-medium rounded-xl transition-colors ${isActive("/about") ? "text-primary bg-primary/8 font-semibold" : "text-foreground/70 hover:text-foreground hover:bg-muted"}`}
              data-testid="link-mobile-about"
            >
              <Info className="w-4.5 h-4.5 shrink-0" />
              About Us
            </button>

            {/* Contact */}
            <button
              onClick={() => handleNavClick("/contact")}
              className={`flex items-center gap-3 w-full px-3 py-3 text-sm font-medium rounded-xl transition-colors ${isActive("/contact") ? "text-primary bg-primary/8 font-semibold" : "text-foreground/70 hover:text-foreground hover:bg-muted"}`}
              data-testid="link-mobile-contact"
            >
              <Phone className="w-4.5 h-4.5 shrink-0" />
              Contact
            </button>

            {/* Catalogue */}
            <a
              href="/api/catalog"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 w-full px-3 py-3 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-xl transition-colors"
              data-testid="link-mobile-catalogue-pdf"
            >
              <FileDown className="w-4.5 h-4.5 shrink-0" />
              Download Catalogue
            </a>

          </nav>
        </div>

        {/* Sticky CTA footer */}
        <div className="px-4 pt-3 pb-5 border-t border-border bg-background shrink-0">
          <Button
            size="lg"
            className="w-full gap-2 rounded-xl font-semibold text-base h-12"
            onClick={() => handleNavClick("/enquiry")}
            data-testid="button-mobile-bulk-enquiry"
          >
            <Send className="w-4 h-4" />
            Get a Quote
            {enquiryCount > 0 && (
              <span className="ml-1 w-5 h-5 bg-white/25 text-[11px] font-bold rounded-full flex items-center justify-center">
                {enquiryCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
