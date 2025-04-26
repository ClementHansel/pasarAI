"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "react-hot-toast";

interface ProductCardProps {
  id: string;
  name: string;
  price?: number; // made optional to allow defaulting
  description: string;
  imageUrl: string;
  rating?: number;
  labels?: { name: string; id: string };
  discount?: number;
  badgeText?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price = 0, // default price = 0
  description,
  imageUrl,
  rating = 0,
  labels,
  discount = 0, // default discount = 0
  badgeText,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
    } catch {
      toast.error("Failed to add to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  const discountedPrice = (
    Number(price) *
    (1 - Number(discount) / 100)
  ).toFixed(2);

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
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhESMIAAAAABJRU5ErkJggg=="
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-base font-semibold line-clamp-1 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>

        {/* Badge Placeholder */}
        <div className="h-5 mt-1">
          {badgeText && (
            <span className="text-xs font-medium px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
              {badgeText}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 my-2">{description}</p>

        {/* Rating Stars Only */}
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

      {/* Footer: Fixed layout for price & cart */}
      <div className="relative px-4 pb-4 pt-1 border-t min-h-[4.5rem]">
        <div className="flex items-end justify-between h-full">
          {/* Price Block */}
          <div className="flex flex-col justify-center">
            {discount > 0 ? (
              <>
                <span className="text-sm text-gray-500 line-through mb-1">
                  ${price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-blue-600">
                    ${discountedPrice}
                  </span>
                  <span className="text-xs text-red-500">-{discount}%</span>
                </div>
              </>
            ) : (
              <>
                <span className="text-sm text-transparent mb-1">&nbsp;</span>
                <span className="text-lg font-bold text-blue-600">
                  ${price.toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Add to Cart Button */}
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
