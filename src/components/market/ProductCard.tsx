"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { Heart, ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  rating?: number;
  labels?: { name: string; id: string };
  discount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  description,
  imageUrl,
  rating = 0,
  labels,
  discount,
}) => {
  const router = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);

  const handleClick = () => {
    router.push(`/products/${id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          name,
          price,
          quantity: 1,
          labels,
        }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
      toast.success(`${name} added to cart!`);
    } catch (error) {
      console.error("Error adding product to cart", error);
      toast.error("Failed to add to cart.");
    } finally {
      setIsAdding(false);
    }
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsWishlist(!isWishlist);
    toast.success(isWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <div className="relative aspect-square">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          onLoad={() => setIsImageLoaded(true)}
          loading="lazy"
        />
        <button
          onClick={toggleWishlist}
          className={`absolute top-4 right-4 p-2 rounded-full ${
            isWishlist ? "bg-red-500 text-white" : "bg-white text-gray-600"
          } shadow-md hover:scale-110 transition-all`}
        >
          <Heart className={`w-5 h-5 ${isWishlist ? "fill-current" : ""}`} />
        </button>
        {discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
          {labels?.name && (
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {labels.name}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{description}</p>

        <div className="flex items-center gap-2 mb-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-4 h-4 ${
                index < rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600">({rating})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {discount && (
              <span className="text-sm text-gray-500 line-through mr-2">
                ${((price * 100) / (100 - discount)).toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-blue-600">
              ${price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
            {isAdding ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
