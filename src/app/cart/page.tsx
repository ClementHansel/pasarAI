"use client";

import React from "react";
import CartSection from "@/components/Cart/full/CartSection";
import { useCartStore } from "@/lib/cartStore";
import type { CartState } from "@/lib/cartStore";

const CartPage: React.FC = () => {
  const cartItems = useCartStore((state: CartState) => state.items);
  const updateQuantity = useCartStore(
    (state: CartState) => state.updateQuantity
  );
  const removeItem = useCartStore((state: CartState) => state.removeItem);

  const handleMoveToWishlist = (id: string) => {
    console.log(`Moved item ${id} to wishlist`);
    removeItem(id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <CartSection
        items={cartItems}
        onUpdate={updateQuantity}
        onRemove={(ids) => ids.forEach((id) => removeItem(id))}
        onMoveToWishlist={handleMoveToWishlist}
      />
    </div>
  );
};

export default CartPage;
