"use client";

import { useEffect, useState, useCallback } from "react";
import { HeartOff } from "lucide-react";
import { toast } from "react-hot-toast";
import WishlistButton from "./WishlistButton";
import WishlistEmpty from "./WishlistEmpty";

type WishlistItem = {
  id: string;
  productId: string;
  marketId: string;
  createdAt: string;
  product: {
    name: string;
    image: string;
    price: number;
  };
  market: {
    name: string;
  };
};

type WishlistListProps = {
  accountId: string;
};

export default function WishlistList({ accountId }: WishlistListProps) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = useCallback(async () => {
    try {
      const res = await fetch(`/api/wishlist?accountId=${accountId}`);
      const data = await res.json();
      setWishlist(data || []);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
      toast.error("Failed to load wishlist.");
    } finally {
      setLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleRemove = async (productId: string, marketId: string) => {
    try {
      await fetch("/api/wishlist", {
        method: "DELETE",
        body: JSON.stringify({ accountId, productId, marketId }),
      });
      toast.success("Removed from wishlist");
      fetchWishlist(); // Refresh list
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      toast.error("Failed to remove item");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading wishlist...</div>;
  }

  if (wishlist.length === 0) {
    return <WishlistEmpty />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {wishlist.map((item) => (
        <div
          key={item.id}
          className="border rounded-xl p-4 shadow-md hover:shadow-lg transition"
        >
          <img
            src={item.product.image}
            alt={item.product.name}
            className="w-full h-48 object-cover rounded-md mb-2"
          />
          <div className="font-semibold text-lg">{item.product.name}</div>
          <div className="text-gray-600 mb-1">Market: {item.market.name}</div>
          <div className="text-blue-600 font-bold mb-2">
            IDR {item.product.price.toLocaleString()}
          </div>

          <div className="flex justify-between items-center">
            <WishlistButton
              accountId={accountId}
              productId={item.productId}
              marketId={item.marketId}
            />
            <button
              onClick={() => handleRemove(item.productId, item.marketId)}
              className="text-sm text-red-500 hover:underline"
            >
              <HeartOff size={16} />
              {loading ? "Removing..." : "Remove"}
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
