// src/components/layout/homepage/ProductCard.tsx
"use client";
import React, { useState, useEffect } from "react";
// import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "react-hot-toast";
import { convertProductPrice } from "@/lib/currency/convert";
import type { Product } from "@/types/product";

interface ProductCardProps extends Product {
  badgeText?: string;
  marketType: "domestic" | "global";
  currency: "IDR" | "USD";
  onViewProducts?: (marketType: "domestic" | "global") => void; // Add callback prop
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price = 0,
  description,
  imageUrls = [],
  rating = 0,
  discount = 0,
  badgeText,
  marketType,
  currency,
  onViewProducts, // Destructure the callback prop
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [convertedPrice, setConvertedPrice] = useState<number>(price);

  // Currency conversion
  useEffect(() => {
    if (price <= 0) return;

    const convert = async () => {
      try {
        const newPrice = await convertProductPrice({
          id,
          name,
          price,
          marketType: marketType.toLowerCase() as "domestic" | "global",
          currency,
        });
        setConvertedPrice(newPrice);
      } catch (error) {
        console.error("Currency conversion failed:", error);
        setConvertedPrice(price); // Fallback
      }
    };

    convert();
  }, [price, id, name, marketType, currency]);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, price, quantity: 1 }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      toast.success(`${name} added to cart!`);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  const isDomestic = marketType === "domestic";
  const discountedPrice = convertedPrice * (1 - (discount || 0) / 100);

  return (
    <div className="group flex items-center gap-6 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="relative w-48 h-48 flex-shrink-0">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
        )}
        <Image
          src={imageUrls[0] || "/images/placeholder-product.png"}
          alt={name}
          fill
          onLoad={() => setIsImageLoaded(true)}
          className={`object-cover rounded-lg transition-opacity duration-300 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
            -{discount}%
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{name}</h3>
        </div>

        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              className={`w-4 h-4 ${
                idx < rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-gray-600 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-blue-600">
              {isDomestic
                ? `Rp ${discountedPrice.toLocaleString("id-ID")}`
                : `$${discountedPrice.toFixed(2)}`}
              {discount > 0 && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  {isDomestic
                    ? `Rp ${convertedPrice.toLocaleString("id-ID")}`
                    : `$${convertedPrice.toFixed(2)}`}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`font-medium px-2 py-0.5 rounded-full ${
                  isDomestic
                    ? "bg-blue-100 text-blue-800"
                    : "bg-indigo-100 text-indigo-800"
                }`}
              >
                {marketType === "domestic" ? "Domestic" : "International"}
              </span>
              {badgeText && (
                <>
                  <span className="mx-1">·</span>
                  <span className="text-green-800 bg-green-100 px-2 py-0.5 rounded-full">
                    {badgeText}
                  </span>
                </>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-400 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{isAdding ? "Adding..." : "Add to Cart"}</span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => onViewProducts?.(marketType)}
            className="text-sm text-blue-600 hover:underline"
          >
            View {marketType === "domestic" ? "Domestic" : "International"}{" "}
            Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
