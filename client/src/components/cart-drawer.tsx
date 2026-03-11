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
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight, ShoppingBag, Package, ExternalLink } from "lucide-react";
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
      <div className="flex items-start justify-between gap-2">
        <div className="w-14 h-14 rounded-xl overflow-hidden border border-border/50 flex-shrink-0 bg-muted/20 flex items-center justify-center">
          {item.image ? (
            <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
          ) : (
            <Package className="w-6 h-6 text-muted-foreground/30" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium leading-tight truncate" data-testid={`text-cart-item-name-${item.productId}`}>
            {item.productName}
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
          {configDetails.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {configDetails.join(" · ")}
            </p>
          )}
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
          onClick={() => removeFromCart(item.cartKey)}
          data-testid={`button-remove-item-${item.productId}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="outline"
            onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
            disabled={item.quantity <= 1}
            data-testid={`button-decrease-qty-${item.productId}`}
          >
            <Minus className="w-3 h-3" />
          </Button>
          <span className="w-8 text-center text-sm font-medium tabular-nums" data-testid={`text-qty-${item.productId}`}>
            {item.quantity}
          </span>
          <Button
            size="icon"
            variant="outline"
            onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
            data-testid={`button-increase-qty-${item.productId}`}
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold tabular-nums" data-testid={`text-line-total-${item.productId}`}>
            {formatPrice(lineTotal)}
          </p>
          {item.quantity > 1 && (
            <p className="text-xs text-muted-foreground tabular-nums">
              {formatPrice(item.unitPrice)} each
            </p>
          )}
        </div>
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
    getTaxAmount,
    getTotal,
    getItemCount,
    clearCart,
  } = useShoppingCart();

  const { products } = useProducts();
  const subtotal = getSubtotal();
  const tax = getTaxAmount();
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
        <SheetContent side="right" className="flex flex-col p-0 sm:max-w-md">
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
              <ScrollArea className="flex-1 px-6">
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <CartItemRow key={item.cartKey} item={item} />
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t px-6 py-4 space-y-3 mt-auto">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="tabular-nums" data-testid="text-subtotal">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span className="tabular-nums" data-testid="text-tax">{formatPrice(tax)}</span>
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
                  ) : someShopify ? (
                    <ExternalLink className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  {checkoutLoading
                    ? "Redirecting to Shopify..."
                    : someShopify
                      ? "Checkout on Shopify"
                      : "Proceed to Checkout"}
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
