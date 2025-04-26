"use client";

import { useState, useEffect } from "react";
import { Heart, HeartOff } from "lucide-react";
import { toast } from "react-hot-toast";
import {
  toggleWishlist,
  checkWishlistStatus,
} from "@/lib/wishlist/wishlistUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type WishlistButtonProps = {
  accountId: string; // Required directly now
  productId: string;
  marketId: string;
  size?: number;
};

export default function WishlistButton({
  productId,
  marketId,
  accountId,
  size = 20,
}: WishlistButtonProps) {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchStatus = async () => {
      const isInWishlist = await checkWishlistStatus(
        accountId,
        productId,
        marketId
      );
      setIsWishlisted(isInWishlist);
    };
    fetchStatus();
  }, [accountId, productId, marketId]);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const result = await toggleWishlist(accountId, productId, marketId);
      setIsWishlisted(result?.added || false);
      toast.success(result?.message || "Wishlist updated");
    } catch {
      toast.error("Failed to update wishlist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleToggle}
            disabled={loading}
            aria-label="Toggle Wishlist"
            className="hover:scale-110 transition-transform"
          >
            {isWishlisted ? (
              <Heart className="text-red-500 fill-red-500" size={size} />
            ) : (
              <HeartOff className="text-gray-500" size={size} />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
