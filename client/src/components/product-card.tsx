import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, CheckCircle2, Package, Star } from "lucide-react";
import { Link } from "wouter";
import { useEnquiryCart } from "@/lib/enquiry-cart";
import { useShoppingCart } from "@/lib/shopping-cart";
import type { CatalogueProduct } from "@/lib/catalogue-data";
import { useProducts, formatPrice, getDiscountPercent } from "@/lib/product-provider";
import { generatedProductImages } from "@/lib/product-images";

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
            className={`w-3.5 h-3.5 ${
              i <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">({count})</span>
    </div>
  );
}

function getSeededRating(id: string): { rating: number; count: number } {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = ((hash << 5) - hash + id.charCodeAt(i)) | 0;
  }
  const rating = 4 + (Math.abs(hash) % 2);
  const count = 3 + (Math.abs(hash >> 3) % 45);
  return { rating, count };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isInCart } = useEnquiryCart();
  const { addToCart } = useShoppingCart();
  const { getProductCategory } = useProducts();
  const category = getProductCategory(product);
  const inCart = isInCart(product.id);
  const discount = getDiscountPercent(product);
  const { rating, count } = getSeededRating(product.id);
  const colors = product.configOptions?.colors;

  return (
    <div
      className="group bg-card border border-border rounded-md overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg hover:shadow-primary/[0.06] hover:border-primary/20"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative aspect-square bg-muted/20 flex items-center justify-center overflow-hidden">
        {discount && (
          <Badge
            variant="destructive"
            className="absolute top-2 left-2 z-10 text-xs no-default-hover-elevate no-default-active-elevate"
            data-testid={`badge-sale-${product.id}`}
          >
            Save {discount}%
          </Badge>
        )}
        {(() => {
          const imgSrc = product.images?.[0] || generatedProductImages[product.id];
          return imgSrc ? (
            <Link href={`/product/${product.id}`} className="w-full h-full">
              <img
                src={imgSrc}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                data-testid={`img-product-${product.id}`}
              />
            </Link>
          ) : (
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-3 rounded-md bg-muted/40 flex items-center justify-center">
                <Package className="w-7 h-7 text-muted-foreground/40" />
              </div>
              <p className="text-xs text-muted-foreground/40 font-medium">Product Image</p>
            </div>
          );
        })()}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-xs text-muted-foreground mb-1" data-testid={`text-vendor-${product.id}`}>Abley's</p>
          <Link href={`/product/${product.id}`}>
            <h3
              className="text-sm font-medium text-foreground mb-1.5 line-clamp-2 hover:underline cursor-pointer"
              data-testid={`text-product-name-${product.id}`}
            >
              {product.name}
            </h3>
          </Link>

          <StarRating rating={rating} count={count} />

          <div className="flex items-baseline gap-2 mt-2 flex-wrap" data-testid={`text-product-price-${product.id}`}>
            <span className="text-base font-semibold text-foreground tabular-nums">
              {formatPrice(product.basePrice)}
            </span>
            {product.comparePrice && product.comparePrice > product.basePrice && (
              <span className="text-sm text-muted-foreground line-through tabular-nums">
                {formatPrice(product.comparePrice)}
              </span>
            )}
          </div>

          {colors && colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2 flex-wrap" data-testid={`swatches-${product.id}`}>
              {colors.slice(0, 6).map((color) => (
                <span
                  key={color.name}
                  title={color.name}
                  className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-border"
                  style={{ backgroundColor: color.hex }}
                  data-testid={`swatch-${product.id}-${color.name}`}
                />
              ))}
              {colors.length > 6 && (
                <span className="text-xs text-muted-foreground">+{colors.length - 6}</span>
              )}
            </div>
          )}
        </div>

        <div className="mt-3 space-y-2">
          <Button
            size="sm"
            className="w-full text-xs gap-1.5"
            onClick={() => addToCart({
              productId: product.id,
              productName: product.name,
              category: category?.title || "",
              unitPrice: product.basePrice,
              config: { addons: [] },
              image: product.images?.[0] || generatedProductImages[product.id],
            })}
            data-testid={`button-add-cart-${product.id}`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add to Cart
          </Button>
          <div className="flex gap-2">
            <Link href={`/product/${product.id}`} className="flex-1">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs gap-1.5"
                data-testid={`button-view-${product.id}`}
              >
                <Eye className="w-3.5 h-3.5" />
                View
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-xs gap-1.5 text-muted-foreground"
              onClick={() => addItem(product.id, product.name, category?.title || "")}
              data-testid={`button-add-enquiry-${product.id}`}
            >
              {inCart ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  In Enquiry
                </>
              ) : (
                <>
                  <Package className="w-3.5 h-3.5" />
                  Enquiry
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
