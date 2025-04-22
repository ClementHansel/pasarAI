import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CartItem from "./CartItem";
import { CartItem as CartItemType } from "@/types/cart";

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);

  useEffect(() => {
    // Fetch the cart from the API on component mount
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/cart");
        if (!res.ok) throw new Error("Failed to fetch cart");
        const data = await res.json();
        setCart(data);
      } catch {
        toast.error("Could not load cart. Please try again.");
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (id: string) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ removeId: id }),
      });

      if (!res.ok) throw new Error("Failed to remove item");

      // After removing, re-fetch the updated cart
      const updatedCart = await res.json();
      setCart(updatedCart);
      toast.success("Item removed from cart");
    } catch {
      toast.error("Could not remove item. Please try again.");
    }
  };

  const updateCart = async (id: string, newQuantity: number) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updateId: id, newQuantity }),
      });

      if (!res.ok) throw new Error("Failed to update cart");

      // After updating, re-fetch the updated cart
      const updatedCart = await res.json();
      setCart(updatedCart);
      toast.success("Cart updated successfully");
    } catch {
      toast.error("Could not update cart. Please try again.");
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
              updateCart={updateCart}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CartPage;
