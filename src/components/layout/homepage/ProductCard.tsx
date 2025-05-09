"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "react-hot-toast";
import { Label } from "@prisma/client";
import { convertProductPrice } from "@/lib/currency/convert";
import { Currency } from "@/types/product";

interface ProductCardProps {
  id: string;
  name: string;
  price?: number;
  description: string;
  imageUrl: string;
  rating?: number;
  labels?: Label[];
  discount?: number;
  badgeText?: string;
  marketType: "domestic" | "global"; // required
  currency: Currency; // use Currency type from product.ts
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price = 0,
  description,
  imageUrl,
  rating = 0,
  labels,
  discount = 0,
  badgeText,
  marketType,
  currency,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [convertedPrice, setConvertedPrice] = useState<number>(price);
  const isDomestic = marketType === "domestic";

  // Currency conversion
  useEffect(() => {
    if (price <= 0) return;

    const convert = async () => {
      try {
        const newPrice = await convertProductPrice({
          id,
          name,
          price,
          marketType,
          currency,
          description,
        });
        setConvertedPrice(newPrice);
      } catch (error) {
        console.error("Currency conversion failed:", error);
        setConvertedPrice(price); // Fallback
      }
    };

    convert();
  }, [price, id, name, marketType, currency, description]);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, price, quantity: 1, labels }),
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

  const discountedPrice = convertedPrice * (1 - (discount || 0) / 100);

  return (
    <Link
      href={`/products/${id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded shadow-md z-10">
          {isDomestic ? "Domestic" : "International"}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-semibold line-clamp-1 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
        <div className="h-5 mt-1">
          {badgeText && (
            <span className="text-xs font-medium px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
              {badgeText}
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 my-2">{description}</p>
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star
                key={idx}
                className={`w-4 h-4 ${
                  idx < rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative px-4 pb-4 pt-1 border-t min-h-[4.5rem]">
        <div className="flex items-end justify-between h-full">
          <div className="flex flex-col justify-center">
            {discount ? (
              <>
                <span className="text-sm text-gray-500 line-through mb-1">
                  {isDomestic
                    ? `Rp ${convertedPrice.toLocaleString("id-ID")}`
                    : `$${convertedPrice.toFixed(2)}`}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-blue-600">
                    {isDomestic
                      ? `Rp ${discountedPrice.toLocaleString("id-ID")}`
                      : `$${discountedPrice.toFixed(2)}`}
                  </span>
                  <span className="text-xs text-red-500">-{discount}%</span>
                </div>
              </>
            ) : (
              <span className="text-lg font-bold text-blue-600">
                {isDomestic
                  ? `Rp ${convertedPrice.toLocaleString("id-ID")}`
                  : `$${convertedPrice.toFixed(2)}`}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">
              {isAdding ? "Adding..." : "Add"}
            </span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
