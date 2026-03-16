export interface ShopifyCartItem {
  handle: string;
  quantity: number;
  variantId?: string;
}

export async function createShopifyCheckout(
  shopifyHandle: string,
  quantity: number = 1,
  variantId?: string
): Promise<string | null> {
  return createShopifyMultiCheckout([{ handle: shopifyHandle, quantity, variantId }]);
}

export async function createShopifyMultiCheckout(
  items: ShopifyCartItem[],
  note?: string
): Promise<string | null> {
  try {
    const res = await fetch("/api/shopify/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, ...(note ? { note } : {}) }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.checkoutUrl || null;
  } catch {
    return null;
  }
}

export function getShopifyItemsFromCart(
  cartItems: Array<{ productId: string; quantity: number; shopifyHandle?: string; shopifyVariantId?: string }>
): { shopifyItems: ShopifyCartItem[]; nonShopifyIds: string[] } {
  const shopifyItems: ShopifyCartItem[] = [];
  const nonShopifyIds: string[] = [];

  for (const item of cartItems) {
    if (item.shopifyHandle) {
      const existing = shopifyItems.find(s =>
        item.shopifyVariantId ? s.variantId === item.shopifyVariantId : s.handle === item.shopifyHandle && !s.variantId
      );
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        shopifyItems.push({ handle: item.shopifyHandle, quantity: item.quantity, variantId: item.shopifyVariantId });
      }
    } else {
      nonShopifyIds.push(item.productId);
    }
  }

  return { shopifyItems, nonShopifyIds };
}
