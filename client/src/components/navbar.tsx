import { Link } from "wouter";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer" data-testid="link-home">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Sparkles className="w-5 h-5 text-primary" data-testid="icon-brand" />
          </div>
          <span className="font-display font-semibold text-xl tracking-tight text-foreground" data-testid="text-brand">
            AuraSensory
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <Button 
            variant="ghost" 
            className="hidden md:flex text-muted-foreground transition-colors"
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="button-nav-products"
          >
            Products
          </Button>
          <Button 
            onClick={scrollToContact}
            className="rounded-full"
            data-testid="button-nav-contact"
          >
            Stay Connected
          </Button>
        </div>
      </div>
    </nav>
  );
}
