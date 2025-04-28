import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item: CartItem): void => {
        set((state) => {
          const exists = state.items.find((i) => i.id === item.id);
          if (exists) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
        // TODO: POST to backend (e.g., /api/cart) to persist on server
      },
      removeItem: (id: string): void => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));
        // TODO: DELETE from backend
      },
      updateQuantity: (id: string, quantity: number): void => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }));
        // TODO: PATCH to backend
      },
      clearCart: (): void => set({ items: [] }),
      totalCount: (): number =>
        get().items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0),
    }),
    {
      name: "cart-storage", // name of item in localStorage
      // Optionally, you can add migrations or custom serialize/deserialize
    }
  )
);
