export interface ShopifyCartItem {
  handle: string;
  quantity: number;
}

export async function createShopifyCheckout(
  shopifyHandle: string,
  quantity: number = 1
): Promise<string | null> {
  return createShopifyMultiCheckout([{ handle: shopifyHandle, quantity }]);
}

export async function createShopifyMultiCheckout(
  items: ShopifyCartItem[]
): Promise<string | null> {
  try {
    const res = await fetch("/api/shopify/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.checkoutUrl || null;
  } catch {
    return null;
  }
}

export function getShopifyItemsFromCart(
  cartItems: Array<{ productId: string; quantity: number; shopifyHandle?: string }>
): { shopifyItems: ShopifyCartItem[]; nonShopifyIds: string[] } {
  const shopifyItems: ShopifyCartItem[] = [];
  const nonShopifyIds: string[] = [];

  for (const item of cartItems) {
    if (item.shopifyHandle) {
      const existing = shopifyItems.find(s => s.handle === item.shopifyHandle);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        shopifyItems.push({ handle: item.shopifyHandle, quantity: item.quantity });
      }
    } else {
      nonShopifyIds.push(item.productId);
    }
  }

  return { shopifyItems, nonShopifyIds };
}
