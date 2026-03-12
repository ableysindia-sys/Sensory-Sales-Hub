import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItemConfig {
  color?: string;
  material?: string;
  size?: string;
  addons: string[];
}

export interface CartItem {
  cartKey: string;
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  unitPrice: number;
  config: CartItemConfig;
  image?: string;
  shopifyHandle?: string;
  shopifyVariantId?: string;
  variantTitle?: string;
}

function generateCartKey(productId: string, config: CartItemConfig): string {
  const parts = [
    productId,
    config.color || "",
    config.material || "",
    config.size || "",
    ...(config.addons || []).slice().sort(),
  ];
  return parts.join("|");
}

interface ShoppingCartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  addToCart: (item: Omit<CartItem, "quantity" | "cartKey">, quantity?: number) => void;
  removeFromCart: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getTaxAmount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

export const useShoppingCart = create<ShoppingCartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addToCart: (newItem, qty = 1) => {
        const key = generateCartKey(newItem.productId, newItem.config);
        set((state) => {
          const existing = state.items.find((i) => i.cartKey === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartKey === key ? { ...i, quantity: i.quantity + qty } : i
              ),
              isDrawerOpen: true,
            };
          }
          return {
            items: [...state.items, { ...newItem, cartKey: key, quantity: qty }],
            isDrawerOpen: true,
          };
        });
      },

      removeFromCart: (cartKey) => {
        set((state) => ({
          items: state.items.filter((i) => i.cartKey !== cartKey),
        }));
      },

      updateQuantity: (cartKey, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((i) =>
            i.cartKey === cartKey ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
      },

      getTaxAmount: () => 0,

      getTotal: () => get().getSubtotal(),

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    }),
    {
      name: "ableys-shopping-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
