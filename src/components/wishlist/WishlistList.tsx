"use client";

import { useEffect, useState, useCallback } from "react";
import { Currency } from "@/types/market";
import WishlistCard from "./WishlistCard";
import WishlistEmpty from "./WishlistEmpty";
import Button from "../common/Button";

type WishlistItem = {
  id: string;
  productId: string;
  marketId: string;
  product: {
    name: string;
    image: string;
    price: number;
  };
  market: {
    name: string;
    currency: Currency;
  };
};

type WishlistResponse = {
  items: WishlistItem[];
};

type WishlistRemoveResponse = {
  removed: boolean;
};

export default function WishlistList({ accountId }: { accountId: string }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [filter, setFilter] = useState<"all" | "domestic" | "global">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/wishlist?accountId=${accountId}`);
      if (!res.ok) {
        throw new Error("Failed to fetch wishlist");
      }
      const data: WishlistResponse = await res.json();
      setWishlist(data.items);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error loading wishlist");
      }
    } finally {
      setIsLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const handleRemove = useCallback(
    async (productId: string, marketId: string) => {
      try {
        const res = await fetch("/api/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accountId, productId, marketId }),
        });

        const result: WishlistRemoveResponse = await res.json();
        if (result.removed) {
          setWishlist((prev) =>
            prev.filter(
              (item) =>
                !(item.productId === productId && item.marketId === marketId)
            )
          );
        }
      } catch (err) {
        console.error("Remove wishlist error:", err);
      }
    },
    [accountId]
  );

  const filteredItems = wishlist.filter((item) =>
    filter === "all"
      ? true
      : filter === "domestic"
      ? item.market.currency === Currency.IDR
      : item.market.currency !== Currency.IDR
  );

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading wishlist...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load wishlist: {error}
      </div>
    );
  }

  if (!wishlist.length) {
    return <WishlistEmpty />;
  }

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={
            filter === "all"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-transparent text-gray-600 hover:bg-gray-100"
          }
        >
          All Markets
        </Button>
        <Button
          variant={filter === "domestic" ? "default" : "outline"}
          onClick={() => setFilter("domestic")}
          className={
            filter === "domestic"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-transparent text-gray-600 hover:bg-gray-100"
          }
        >
          Domestic
        </Button>
        <Button
          variant={filter === "global" ? "default" : "outline"}
          onClick={() => setFilter("global")}
          className={
            filter === "global"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-transparent text-gray-600 hover:bg-gray-100"
          }
        >
          International
        </Button>
      </div>

      {/* Wishlist cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <WishlistCard
            key={item.id}
            accountId={accountId}
            productId={item.productId}
            marketId={item.marketId}
            product={item.product}
            market={item.market}
            onRemove={handleRemove}
          />
        ))}
      </div>
    </div>
  );
}
