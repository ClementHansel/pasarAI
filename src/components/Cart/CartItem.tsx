import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { CartItem } from "../../types/cart";

interface CartItemProps {
  item: CartItem;
  removeFromCart: (id: string) => void;
  updateCart: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  removeFromCart,
  updateCart,
}) => {
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item]);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    setQuantity(newQuantity);
    updateCart(item.id, newQuantity);

    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updateId: item.id, newQuantity }),
      });

      if (!res.ok) throw new Error("Failed to update cart");
      toast.success(`${item.name} updated to quantity ${newQuantity}`);
    } catch {
      toast.error("Could not update cart. Please try again.");
    }
  };

  const handleRemove = async () => {
    removeFromCart(item.id);

    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ removeId: item.id }),
      });

      if (!res.ok) throw new Error("Failed to remove item");
      toast.success(`${item.name} removed from cart`);
    } catch {
      toast.error("Could not remove item. Please try again.");
    }
  };

  return (
    <div className="p-4 border rounded mb-4 shadow-sm">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="text-sm text-gray-600">${item.price} each</p>

      <div className="flex items-center mt-2 gap-2">
        <label htmlFor={`qty-${item.id}`} className="sr-only">
          Quantity
        </label>

        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          −
        </button>

        <input
          id={`qty-${item.id}`}
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
          className="w-16 text-center border border-gray-300 rounded"
          placeholder="Qty"
          title={`Quantity for ${item.name}`}
        />

        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <p className="mt-2 font-medium">
        Total: ${Number(item.price * quantity).toFixed(2)}
      </p>

      <button
        onClick={handleRemove}
        className="mt-2 text-sm text-red-500 hover:underline"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
