import { useState } from "react";
import { useShoppingCart, type CartItem } from "@/lib/shopping-cart";
import { getShopifyItemsFromCart, createShopifyMultiCheckout } from "@/lib/shopify";
import { useProducts } from "@/lib/product-provider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, ShoppingBag, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeFromCart } = useShoppingCart();

  const configDetails: string[] = [];
  if (item.variantTitle) configDetails.push(item.variantTitle);
  else {
    if (item.config.color) configDetails.push(item.config.color);
    if (item.config.material) configDetails.push(item.config.material);
    if (item.config.size) configDetails.push(item.config.size);
    if (item.config.addons.length > 0) configDetails.push(...item.config.addons);
  }

  const lineTotal = item.unitPrice * item.quantity;

  return (
    <div className="flex flex-col gap-3 py-4" data-testid={`cart-item-${item.productId}`}>
      {/* Top row: image + name + price */}
      <div className="flex items-start gap-3">
        <div className="w-16 h-16 rounded-xl overflow-hidden border border-border/50 flex-shrink-0 bg-muted/20 flex items-center justify-center">
          {item.image ? (
            <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
          ) : (
            <Package className="w-6 h-6 text-muted-foreground/30" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium leading-snug line-clamp-2 pr-1" data-testid={`text-cart-item-name-${item.productId}`}>
            {item.productName}
          </h4>
          {configDetails.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {configDetails.join(" · ")}
            </p>
          )}
          <p className="text-sm font-semibold tabular-nums mt-1.5" data-testid={`text-line-total-${item.productId}`}>
            {formatPrice(lineTotal)}
            {item.quantity > 1 && (
              <span className="text-xs font-normal text-muted-foreground ml-1.5">
                ({formatPrice(item.unitPrice)} each)
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Bottom row: qty controls + remove */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted transition-colors"
            data-testid={`button-decrease-qty-${item.productId}`}
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-sm font-semibold tabular-nums" data-testid={`text-qty-${item.productId}`}>
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors"
            data-testid={`button-increase-qty-${item.productId}`}
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Remove button — always visible */}
        <button
          type="button"
          onClick={() => removeFromCart(item.cartKey)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 transition-colors"
          data-testid={`button-remove-item-${item.productId}`}
          aria-label={`Remove ${item.productName} from cart`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          Remove
        </button>
      </div>
    </div>
  );
}

function EmptyCartState({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 py-12">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted">
        <ShoppingBag className="w-7 h-7 text-muted-foreground" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium" data-testid="text-empty-cart">Your cart is empty</p>
        <p className="text-xs text-muted-foreground mt-1">Add some products to get started</p>
      </div>
      <Button variant="outline" onClick={onClose} data-testid="button-continue-shopping-empty">
        Continue Shopping
      </Button>
    </div>
  );
}

export function CartDrawer() {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { toast } = useToast();
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    getSubtotal,
    getTotal,
    getItemCount,
    clearCart,
  } = useShoppingCart();

  const { products } = useProducts();
  const subtotal = getSubtotal();
  const total = getTotal();
  const itemCount = getItemCount();

  const { shopifyItems, nonShopifyIds } = getShopifyItemsFromCart(
    items.map(i => {
      const handle = i.shopifyHandle || products.find(p => p.id === i.productId)?.shopifyHandle;
      return { productId: i.productId, quantity: i.quantity, shopifyHandle: handle, shopifyVariantId: i.shopifyVariantId };
    })
  );
  const allShopify = nonShopifyIds.length === 0 && shopifyItems.length > 0;
  const someShopify = shopifyItems.length > 0;

  const handleCheckout = async () => {
    if (someShopify) {
      const newTab = window.open("", "_blank");
      setCheckoutLoading(true);
      const checkoutUrl = await createShopifyMultiCheckout(shopifyItems);
      setCheckoutLoading(false);
      if (checkoutUrl && newTab) {
        closeDrawer();
        newTab.location.href = checkoutUrl;
        return;
      }
      if (newTab) newTab.close();
      toast({
        title: "Checkout unavailable",
        description: "Could not connect to Shopify. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Sheet open={isDrawerOpen} onOpenChange={(open) => { if (!open) closeDrawer(); }}>
        <SheetContent side="right" className="flex flex-col p-0 sm:max-w-md h-full overflow-hidden">
          <SheetHeader className="px-6 pt-6 pb-2">
            <SheetTitle className="flex items-center gap-2" data-testid="text-cart-title">
              <ShoppingCart className="w-5 h-5" />
              Shopping Cart
              {itemCount > 0 && (
                <span className="text-xs font-normal text-muted-foreground">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              )}
            </SheetTitle>
            <SheetDescription className="sr-only">Your shopping cart items</SheetDescription>
          </SheetHeader>

          {items.length === 0 ? (
            <EmptyCartState onClose={closeDrawer} />
          ) : (
            <>
              <ScrollArea className="flex-1 min-h-0 px-6">
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <CartItemRow key={item.cartKey} item={item} />
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t px-6 py-4 space-y-3 mt-auto">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Subtotal (incl. GST)</span>
                    <span className="tabular-nums" data-testid="text-subtotal">{formatPrice(subtotal)}</span>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-base font-semibold">
                    <span>Total</span>
                    <span className="tabular-nums" data-testid="text-total">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  className="w-full gap-2"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  data-testid="button-proceed-checkout"
                >
                  {checkoutLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  {checkoutLoading ? "Opening checkout…" : "Proceed to Checkout"}
                </Button>

                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <Button variant="ghost" onClick={closeDrawer} data-testid="button-continue-shopping">
                    Continue Shopping
                  </Button>
                  <Button variant="ghost" onClick={clearCart} className="text-muted-foreground" data-testid="button-clear-cart">
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
