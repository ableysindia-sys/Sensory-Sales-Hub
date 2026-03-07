import { motion } from "framer-motion";
import type { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
      data-testid={`card-product-${product.id}`}
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted relative">
        {/* Soft overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
          data-testid={`img-product-${product.id}`}
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-display text-xl text-foreground font-medium line-clamp-1" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <span className="text-primary font-medium bg-primary/10 px-3 py-1 rounded-full text-sm" data-testid={`text-product-price-${product.id}`}>
            {formattedPrice}
          </span>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-6 leading-relaxed" data-testid={`text-product-desc-${product.id}`}>
          {product.description}
        </p>
        
        <Button 
          className="w-full rounded-xl"
          variant="secondary"
          onClick={() => {
            // Smooth scroll to lead form and pre-fill interest
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          data-testid={`button-product-interest-${product.id}`}
        >
          Express Interest
        </Button>
      </div>
    </motion.div>
  );
}
