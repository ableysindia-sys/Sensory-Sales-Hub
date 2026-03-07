import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, CheckCircle2, Package } from "lucide-react";
import { Link } from "wouter";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import type { CatalogueProduct } from "@/lib/catalogue-data";
import { getProductCategory } from "@/lib/catalogue-data";

interface ProductCardProps {
  product: CatalogueProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useEnquiryCart();
  const category = getProductCategory(product);
  const inCart = isInCart(product.id);

  return (
    <div
      className="bg-card rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 flex flex-col"
      data-testid={`product-card-${product.id}`}
    >
      <div className="aspect-[4/3] bg-muted/30 flex items-center justify-center border-b border-border/30">
        <div className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/8 flex items-center justify-center">
            <Package className="w-7 h-7 text-primary/40" />
          </div>
          <p className="text-xs text-muted-foreground/50 font-medium">Product Image</p>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1.5">{category?.title}</p>
          <h3 className="text-base font-bold text-foreground mb-2" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.shortDescription}</p>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <Link href={`/product/${product.id}`} className="flex-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-full text-xs gap-1.5"
                data-testid={`button-view-${product.id}`}
              >
                <Eye className="w-3.5 h-3.5" />
                View Details
              </Button>
            </Link>
            <Button
              size="sm"
              className="flex-1 rounded-full text-xs gap-1.5"
              onClick={() => addItem(product.id, product.name, category?.title || "")}
              data-testid={`button-add-enquiry-${product.id}`}
            >
              {inCart ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add to Enquiry
                </>
              )}
            </Button>
          </div>
          <Link href="/enquiry" className="block">
            <Button
              variant="ghost"
              size="sm"
              className="w-full rounded-full text-xs gap-1.5 text-primary"
              data-testid={`button-bulk-quote-${product.id}`}
            >
              Request Bulk Quote
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
