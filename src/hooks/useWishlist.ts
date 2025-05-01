"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export type WishlistItem = {
  id: string;
  productId: string;
  marketId: string;
  createdAt: string;
};

export function useWishlist(accountId: string) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = useCallback(async () => {
    try {
      const res = await fetch(`/api/wishlist?accountId=${accountId}`);
      const data = await res.json();
      setWishlist(data || []);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
      toast.error("Failed to fetch wishlist");
    } finally {
      setLoading(false);
    }
  }, [accountId]);

  const addToWishlist = async (productId: string, marketId: string) => {
    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        body: JSON.stringify({ accountId, productId, marketId }),
      });

      if (!res.ok) throw new Error("Failed to add");

      toast.success("Added to wishlist");
      fetchWishlist();
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      toast.error("Could not add to wishlist");
    }
  };

  const removeFromWishlist = async (productId: string, marketId: string) => {
    try {
      await fetch("/api/wishlist", {
        method: "DELETE",
        body: JSON.stringify({ accountId, productId, marketId }),
      });

      toast.success("Removed from wishlist");
      fetchWishlist();
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      toast.error("Could not remove from wishlist");
    }
  };

  const isWishlisted = (productId: string, marketId: string) => {
    return wishlist.some(
      (item) => item.productId === productId && item.marketId === marketId
    );
  };

  useEffect(() => {
    if (accountId) fetchWishlist();
  }, [accountId, fetchWishlist]);

  return {
    wishlist,
    loading,
    fetchWishlist,
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  };
}
