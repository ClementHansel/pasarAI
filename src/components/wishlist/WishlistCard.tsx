// src/components/wishlist/WishlistCard.tsx
"use client";

import { useState } from "react";
import { HeartOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { Currency } from "@/types/market";
import Image from "next/image";
import Button from "../common/Button";

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
    currency: Currency;
  };
  onRemove: (productId: string, marketId: string) => void;
};

export default function WishlistCard({
  productId,
  marketId,
  product,
  market,
  onRemove,
}: WishlistCardProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await onRemove(productId, marketId);
      toast.success("Item removed from wishlist");
    } catch {
      toast.error("Failed to remove item");
    } finally {
      setIsRemoving(false);
      setShowConfirmation(false);
    }
  };

  return (
    <div className="relative border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <Image
        width={400}
        height={300}
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{market.name}</p>
        <p className="text-lg font-bold">
          {market.currency === Currency.IDR ? "IDR" : "USD"}{" "}
          {product.price.toLocaleString()}
        </p>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowConfirmation(true)}
          disabled={isRemoving}
          className="text-red-500 hover:bg-red-50"
        >
          <HeartOff className="mr-2 h-4 w-4" />
          {isRemoving ? "Removing..." : "Remove from Wishlist"}
        </Button>
      </div>

      {showConfirmation && (
        <div className="absolute inset-0 bg-background/95 flex items-center justify-center p-4 rounded-xl">
          <div className="text-center space-y-4">
            <p className="font-medium">Remove from wishlist?</p>
            <div className="flex gap-3 justify-center">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                disabled={isRemoving}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
