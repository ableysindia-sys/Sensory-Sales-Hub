import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Feather } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-secondary/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" />
      <div className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-accent/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20" data-testid="badge-hero-callout">
            <Feather className="w-4 h-4" />
            <span>Discover inner peace</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-medium leading-[1.1] text-foreground mb-6" data-testid="heading-hero">
            Calm your mind, <br/>
            <span className="text-primary italic">soothe your senses.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg" data-testid="text-hero-desc">
            Curated sensory tools and calming products designed to help you find focus, relieve stress, and embrace moments of tranquility.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="rounded-full text-base"
              onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-hero-explore"
            >
              Explore Collection
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full text-base group"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              data-testid="button-hero-waitlist"
            >
              Join Waitlist
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 aspect-[4/5] max-w-[500px] mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-transparent z-10 mix-blend-overlay" />
            {/* landing page hero calming soft abstract textures pastels */}
            <img 
              src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?q=80&w=1200&auto=format&fit=crop" 
              alt="Soft abstract waves representing calm and focus" 
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-out"
              data-testid="img-hero"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
