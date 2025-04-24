"use client";

import { useState } from "react";
import { HeartOff } from "lucide-react";
import { toast } from "react-hot-toast";
import WishlistButton from "./WishlistButton";

type WishlistCardProps = {
  accountId: string;
  productId: string;
  marketId: string;
  product: {
    name: string;
    image: string;
    price: number;
  };
  market: {
    name: string;
  };
  onRemove: (productId: string, marketId: string) => void;
};

export default function WishlistCard({
  accountId,
  productId,
  marketId,
  product,
  market,
  onRemove,
}: WishlistCardProps) {
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRemoveClick = () => {
    setShowConfirmation(true); // Show confirmation before removal
  };

  const handleRemove = async () => {
    setLoading(true); // Set loading state while removing
    try {
      const res = await fetch("/api/wishlist", {
        method: "DELETE",
        body: JSON.stringify({ accountId, productId, marketId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to remove item");
      }

      toast.success("Removed from wishlist");
      onRemove(productId, marketId); // Trigger parent function to update the list
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setLoading(false); // Reset loading state
      setShowConfirmation(false); // Hide confirmation dialog after action
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-md hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-2"
      />
      <div className="font-semibold text-lg">{product.name}</div>
      <div className="text-gray-600 mb-1">Market: {market.name}</div>
      <div className="text-blue-600 font-bold mb-2">
        IDR {product.price.toLocaleString()}
      </div>

      <div className="flex justify-between items-center">
        <WishlistButton
          accountId={accountId}
          productId={productId}
          marketId={marketId}
        />

        {/* Remove Button */}
        <button
          onClick={handleRemoveClick}
          disabled={loading}
          className="flex items-center gap-1 text-sm text-red-500 hover:underline disabled:opacity-50"
        >
          <HeartOff size={16} />
          {loading ? "Removing..." : "Remove"}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-lg font-semibold mb-4">
              Are you sure you want to remove this item from your wishlist?
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleRemove}
                className="px-4 py-2 text-white bg-red-500 rounded-md"
                disabled={loading}
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-700 border rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
