"use client";

import React, { useEffect, useState } from "react";
import CartSection from "@/components/Cart/full/CartSection";
import { useCartStore } from "@/lib/cartStore";
import type { CartState } from "@/lib/cartStore";
import { CartItem } from "@/types/cart";
import { WishlistItem } from "@/hooks/useWishlist";
// Make sure this type exists

const CartPage: React.FC = () => {
  const cartItems = useCartStore((state: CartState) => state.items);
  const updateQuantity = useCartStore(
    (state: CartState) => state.updateQuantity
  );
  const removeItem = useCartStore((state: CartState) => state.removeItem);
  const addItem = useCartStore((state: CartState) => state.addItem);
  const clearCart = useCartStore((state: CartState) => state.clearCart);

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // const session = useSession(); // <-- Commented out until session is ready
  const accountId = "demo-account-id"; // Replace with session?.user.id later

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch("/api/cart");
        if (response.ok) {
          const data = await response.json();
          data.forEach((item: CartItem) => addItem(item));
        }
      } catch (error) {
        console.error("Failed to fetch cart data", error);
      }
    };
    fetchCart();
  }, [addItem]);

  // Fetch wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!accountId) return;
      try {
        const res = await fetch(`/api/wishlist?accountId=${accountId}`);
        if (res.ok) {
          const json = await res.json();
          setWishlistItems(json.items);
        }
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
      }
    };
    fetchWishlist();
  }, [accountId]);

  const handleToggleWishlist = async (productId: string, marketId: string) => {
    if (!accountId) return;
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId, productId, marketId }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.removed) {
          setWishlistItems((prev) =>
            prev.filter(
              (item) =>
                item.productId !== productId || item.marketId !== marketId
            )
          );
        } else if (data.added) {
          setWishlistItems((prev) => [...prev, data.added]);
        }
      }
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
    }
  };

  const handleMoveToWishlist = async (
    id: string,
    productId: string,
    marketId: string
  ) => {
    await handleToggleWishlist(productId, marketId);
    removeItem(id); // Also remove from cart store
    try {
      await fetch(`/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id] }),
      });
    } catch (err) {
      console.error("Failed to remove from cart on move to wishlist", err);
    }
  };

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    await updateQuantity(id, quantity);
    try {
      await fetch(`/api/cart`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, quantity }),
      });
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const handleRemoveItem = async (ids: string[]) => {
    for (const id of ids) {
      await removeItem(id);
    }
    try {
      await fetch(`/api/cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });
    } catch (error) {
      console.error("Failed to remove items from cart", error);
    }
  };

  const handleClearCart = async () => {
    clearCart();
    try {
      await fetch("/api/cart", {
        method: "DELETE",
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
        onToggleWishlist={handleToggleWishlist}
        wishlistItems={wishlistItems}
      />
    </div>
  );
};

export default CartPage;
