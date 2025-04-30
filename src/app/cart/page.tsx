"use client";

import React, { useEffect } from "react";
import CartSection from "@/components/Cart/full/CartSection";
import { useCartStore } from "@/lib/cartStore";
import type { CartState } from "@/lib/cartStore";
import { CartItem } from "@/types/cart";

const CartPage: React.FC = () => {
  const cartItems = useCartStore((state: CartState) => state.items);
  const updateQuantity = useCartStore(
    (state: CartState) => state.updateQuantity
  );
  const removeItem = useCartStore((state: CartState) => state.removeItem);
  const addItem = useCartStore((state: CartState) => state.addItem);
  const clearCart = useCartStore((state: CartState) => state.clearCart);

  // Fetch cart data from backend when the component mounts
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart");
        if (response.ok) {
          const data = await response.json();
          // Assuming the data structure matches your CartItem type
          data.forEach((item: CartItem) => addItem(item));
        }
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }
    };

    fetchCart();
  }, [addItem]);

  const handleMoveToWishlist = (id: string) => {
    console.log(`Moved item ${id} to wishlist`);
    removeItem(id); // Also remove from backend
  };

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    await updateQuantity(id, quantity); // Sync with backend
  };

  const handleRemoveItem = async (ids: string[]) => {
    for (const id of ids) {
      await removeItem(id); // Sync with backend
    }
  };

  const handleClearCart = async () => {
    clearCart();
    try {
      await fetch("/api/cart", {
        method: "DELETE", // Clear the cart from the backend
      });
    } catch (error) {
      console.error("Failed to clear cart on the server", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <CartSection
        items={cartItems}
        onUpdate={handleUpdateQuantity}
        onRemove={handleRemoveItem}
        onMoveToWishlist={handleMoveToWishlist}
        onClearCart={handleClearCart}
      />
    </div>
  );
};

export default CartPage;
