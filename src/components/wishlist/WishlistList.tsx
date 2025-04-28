// src/components/wishlist/WishlistList.tsx
"use client";

import { useState, useCallback } from "react";
import { Currency } from "@/types/market";
import { domesticProducts, globalProducts } from "@/lib/data/products";
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

// Mock data generator
const generateMockWishlist = (): WishlistItem[] => {
  const domesticItems = domesticProducts.flatMap((region) =>
    region.subregions.flatMap((subregion) =>
      subregion.cities.flatMap((city) =>
        city.products.map((product) => ({
          id: `domestic-${product.id}`,
          productId: product.id.toString(),
          marketId: `market-${city.id}`,
          product: {
            name: product.name,
            image: product.imageUrls[0],
            price: product.price,
          },
          market: {
            name: city.name,
            currency: Currency.IDR,
          },
        }))
      )
    )
  );

  const globalItems = globalProducts.flatMap((region) =>
    region.subregions.flatMap((subregion) =>
      subregion.cities.flatMap((city) =>
        city.products.map((product) => ({
          id: `global-${product.id}`,
          productId: product.id.toString(),
          marketId: `market-${city.id}`,
          product: {
            name: product.name,
            image: product.imageUrls[0],
            price: product.price,
          },
          market: {
            name: city.name,
            currency: Currency.USD,
          },
        }))
      )
    )
  );

  return [...domesticItems.slice(0, 3), ...globalItems.slice(0, 3)];
};

export default function WishlistList({ accountId }: { accountId: string }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(
    generateMockWishlist()
  );
  const [filter, setFilter] = useState<"all" | "domestic" | "global">("all");

  const handleRemove = useCallback((productId: string, marketId: string) => {
    setWishlist((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.marketId === marketId)
      )
    );
  }, []);

  const filteredItems = wishlist.filter((item) =>
    filter === "all"
      ? true
      : filter === "domestic"
      ? item.market.currency === Currency.IDR
      : item.market.currency === Currency.USD
  );

  if (!wishlist.length) {
    return <WishlistEmpty />;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4">
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
