import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";

export interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  totalCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: async (item: CartItem): Promise<void> => {
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

        try {
          await fetch("/api/cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          });
        } catch (error) {
          console.error("Failed to add item to cart", error);
        }
      },
      removeItem: async (id: string): Promise<void> => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));

        try {
          await fetch(`/api/cart/${id}`, {
            method: "DELETE",
          });
        } catch (error) {
          console.error("Failed to remove item from cart", error);
        }
      },
      updateQuantity: async (id: string, quantity: number): Promise<void> => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
          ),
        }));

        try {
          await fetch(`/api/cart/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity }),
          });
        } catch (error) {
          console.error("Failed to update item quantity", error);
        }
      },
      clearCart: (): void => set({ items: [] }),
      totalCount: (): number =>
        get().items.reduce((sum: number, i: CartItem) => sum + i.quantity, 0),
    }),
    {
      name: "cart-storage", // name of item in localStorage
    }
  )
);
