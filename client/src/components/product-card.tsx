import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, CheckCircle2, Package, Star, MessageSquare } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { useShoppingCart } from "@/lib/shopping-cart";
import type { CatalogueProduct } from "@/lib/catalogue-data";
import { useProducts, formatPrice, getDiscountPercent } from "@/lib/product-provider";
import { generatedProductImages } from "@/lib/product-images";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: CatalogueProduct;
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1" data-testid="star-rating">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${i <= rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
          />
        ))}
      </div>
      <span className="text-[11px] text-muted-foreground">({count})</span>
    </div>
  );
}

function getSeededRating(id: string): { rating: number; count: number } {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  return { rating: 4 + (Math.abs(hash) % 2), count: 3 + (Math.abs(hash >> 3) % 45) };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useEnquiryCart();
  const { addToCart, items: cartItems } = useShoppingCart();
  const { getProductCategory } = useProducts();
  const [added, setAdded] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const category = getProductCategory(product);
  const inEnquiry = isInCart(product.id);
  const inCart = cartItems.some((i) => i.productId === product.id);
  const discount = getDiscountPercent(product);
  const { rating, count } = getSeededRating(product.id);
  const imgSrc = product.images?.[0] || generatedProductImages[product.id];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      productName: product.name,
      category: category?.title || "",
      unitPrice: product.basePrice,
      shopifyHandle: product.shopifyHandle,
      config: { addons: [] },
      image: imgSrc,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      className="group bg-card border border-border rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:shadow-md hover:shadow-primary/[0.08] hover:border-primary/20"
      data-testid={`product-card-${product.id}`}
    >
      {/* Image */}
      <Link href={`/product/${product.id}`} className="relative aspect-[4/3] bg-muted/20 flex items-center justify-center overflow-hidden block">
        {discount && (
          <Badge
            variant="destructive"
            className="absolute top-2 left-2 z-10 text-[10px] px-2 py-0.5 rounded-full"
            data-testid={`badge-sale-${product.id}`}
          >
            -{discount}%
          </Badge>
        )}
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
            loading="lazy"
            data-testid={`img-product-${product.id}`}
          />
        ) : (
          <div className="text-center p-6">
            <div className="w-14 h-14 mx-auto mb-2 rounded-lg bg-muted/40 flex items-center justify-center">
              <Package className="w-6 h-6 text-muted-foreground/40" />
            </div>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1">
        {category && (
          <span className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1">
            {category.title}
          </span>
        )}

        <Link href={`/product/${product.id}`}>
          <h3
            className="text-sm font-semibold text-foreground mb-1.5 line-clamp-2 hover:text-primary transition-colors leading-snug"
            data-testid={`text-product-name-${product.id}`}
          >
            {product.name}
          </h3>
        </Link>

        <StarRating rating={rating} count={count} />

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-2 flex-wrap" data-testid={`text-product-price-${product.id}`}>
          <span className="text-base font-bold text-foreground tabular-nums">
            {formatPrice(product.basePrice)}
          </span>
          {product.comparePrice && product.comparePrice > product.basePrice && (
            <span className="text-xs text-muted-foreground line-through tabular-nums">
              {formatPrice(product.comparePrice)}
            </span>
          )}
          <span className="text-[10px] text-green-600 font-medium ml-auto">Free shipping</span>
        </div>

        {/* CTAs */}
        <div className="mt-3 space-y-1.5">
          {/* Primary: B2B quote */}
          <button
            className={`w-full h-9 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-all ${
              inEnquiry
                ? "bg-primary/10 text-primary border border-primary/30"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (!inEnquiry) {
                addItem(product.id, product.name, category?.title || "");
                toast({
                  title: "Added to your B2B quote",
                  description: "Review all selected products and submit your enquiry.",
                  action: (
                    <button
                      onClick={() => navigate("/enquiry")}
                      className="shrink-0 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground ring-offset-background transition-opacity hover:opacity-90"
                    >
                      View Quote →
                    </button>
                  ),
                } as Parameters<typeof toast>[0]);
              }
            }}
            data-testid={`button-add-enquiry-${product.id}`}
          >
            {inEnquiry ? (
              <><CheckCircle2 className="w-3.5 h-3.5" /> Added to Quote</>
            ) : (
              <><MessageSquare className="w-3.5 h-3.5" /> Get B2B Quote</>
            )}
          </button>

          {/* Secondary: individual cart */}
          <button
            className={`w-full h-8 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all border ${
              added || inCart
                ? "text-green-700 border-green-200 bg-green-50 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800"
                : "text-muted-foreground border-border/60 hover:text-foreground hover:border-border"
            }`}
            onClick={handleAddToCart}
            data-testid={`button-add-cart-${product.id}`}
          >
            {added || inCart ? (
              <><CheckCircle2 className="w-3 h-3" /> In Cart</>
            ) : (
              <><ShoppingCart className="w-3 h-3" /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
