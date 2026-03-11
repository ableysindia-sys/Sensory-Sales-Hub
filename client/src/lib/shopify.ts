const SHOPIFY_PRODUCT_SLUG_MAP: Record<string, string> = {
  "bolster-swing": "bolster-swing-soft-comfortable-baby-swing-indoor-hammock-style-bolster-jhula-for-kids",
  "t-swing": "t-swing-therapeutic-sensory-swing-for-kids-balance-coordination-calming-vestibular-play",
  "disc-swing": "disc-swing-outdoor-rope-swing-seat-for-kids-fun-balance-coordination-play-equipment-for-gardens-therapy",
  "platform-swing": "platform-swing-heavy-duty-sensory-swing-for-kids-outdoor-indoor-therapy-balance-swing",
  "crash-mat": "abley-s-crash-pad-soft-landing-sensory-cushion-4x4-6x4-ft-for-safe-jumping-deep-pressure-play",
  "interlocking-mat": "interlocking-mats-soft-eva-foam-floor-tiles-non-slip-shock-absorbing-play-exercise-mats",
  "balance-board": "wooden-balance-board-curved-wobble-board-for-kids-balance-core-strength-sensory-development",
  "stepping-stones": "sensory-stepping-stones-for-kids",
  "ballpool-4x4": "abley-s-ball-pool-soft-play-pit-with-colorful-balls-4x4-6x4-ft-for-sensory-motor-skill-development",
  "ballpool-6x4": "abley-s-ball-pool-soft-play-pit-with-colorful-balls-4x4-6x4-ft-for-sensory-motor-skill-development",
  "bosu-ball": "gym-ball-65cm-anti-burst-exercise-ball-for-yoga-fitness-core-strength-training",
  "hexwall-touch-light": "abley-s-hexagon-touch-lights-for-autism-sensory-room-usb-rechargeable-modular-led-panels-tap-sensitive-calming-wall-lights-for-kids-with-spd-adhd-easy-install-soothing-night-light",
  "weighted-vest": "weighted-vest-for-kids-2lbs-3lbs-blue",
  "weighted-blanket": "weighted-blanket-for-kids-5lb",
  "compression-vest": "compression-vest-for-sensory-needs",
  "sensory-sock": "sensory-body-sock-for-kids",
  "lap-pad": "weighted-lap-pad-for-focus-minky-3lb",
};

export function getShopifyHandle(productSlug: string): string | null {
  return SHOPIFY_PRODUCT_SLUG_MAP[productSlug] || null;
}

export function getShopifyProductUrl(productSlug: string): string | null {
  const handle = getShopifyHandle(productSlug);
  if (!handle) return null;
  return `https://www.ableys.in/products/${handle}`;
}

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

export function hasShopifyListing(productSlug: string): boolean {
  return productSlug in SHOPIFY_PRODUCT_SLUG_MAP;
}

export function getShopifyItemsFromCart(
  cartItems: Array<{ productId: string; quantity: number }>
): { shopifyItems: ShopifyCartItem[]; nonShopifyIds: string[] } {
  const shopifyItems: ShopifyCartItem[] = [];
  const nonShopifyIds: string[] = [];

  for (const item of cartItems) {
    const handle = getShopifyHandle(item.productId);
    if (handle) {
      const existing = shopifyItems.find(s => s.handle === handle);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        shopifyItems.push({ handle, quantity: item.quantity });
      }
    } else {
      nonShopifyIds.push(item.productId);
    }
  }

  return { shopifyItems, nonShopifyIds };
}
