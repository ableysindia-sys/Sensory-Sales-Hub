import { Link, useLocation } from "wouter";
import { Home, Grid3x3, Send, FileDown } from "lucide-react";

const tabs = [
  { label: "Home",        icon: Home,     href: "/",           external: false },
  { label: "Products",    icon: Grid3x3,  href: "/products",   external: false },
  { label: "Get a Quote", icon: Send,     href: "/enquiry",    external: false, primary: true },
  { label: "Catalogue",   icon: FileDown, href: "/api/catalog", external: true },
];

export function MobileBottomNav() {
  const [location] = useLocation();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom"
      aria-label="Main navigation"
      data-testid="mobile-bottom-nav"
    >
      <div className="grid grid-cols-4 h-16">
        {tabs.map(({ label, icon: Icon, href, primary, external }) => {
          const isActive = !external && (href === "/" ? location === "/" : location.startsWith(href));
          const cls = `flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors touch-manipulation ${
            primary
              ? "text-primary-foreground bg-primary mx-1.5 my-2 rounded-xl shadow-lg shadow-primary/30"
              : isActive
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`;

          if (external) {
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
                aria-label={`${label} (opens in new tab)`}
                data-testid={`tab-${label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span>{label}</span>
              </a>
            );
          }
          return (
            <Link
              key={label}
              href={href}
              className={cls}
              aria-current={isActive ? "page" : undefined}
              data-testid={`tab-${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Icon className={`w-5 h-5 ${primary ? "text-primary-foreground" : ""}`} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
