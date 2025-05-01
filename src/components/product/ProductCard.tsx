// src\components\product\ProductCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, MapPin } from "lucide-react";
import { toast } from "react-hot-toast";
import type { Product } from "@/types/product";

interface ProductCardProps extends Product {
  viewMode?: "grid" | "list";
  accountName?: string; // Seller name (optional, for ProductWithUser)
  accountRating?: number; // Seller rating (optional, for ProductWithUser)
}

const ProductCard = ({
  id,
  name,
  price = 0,
  description,
  imageUrls,
  rating = 0,
  category,
  stock,
  discount = 0,
  viewMode = "grid",
  labels,
  brand,
  accountId,
  accountName,
}: ProductCardProps) => {
  const discountedPrice = price * (1 - discount / 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success(`${name} added to cart`);
    // Add actual cart logic here
  };

  if (viewMode === "list") {
    return (
      <div className="group flex items-center gap-6 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-300">
        <div className="relative w-48 h-48 flex-shrink-0">
          <Image
            src={imageUrls[0]}
            alt={name}
            fill
            className="object-cover rounded-lg"
            loading="lazy"
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
            <div className="flex items-center gap-2">
              {brand?.map((b) => (
                <span
                  key={b.id}
                  className="text-sm bg-gray-100 px-2 py-1 rounded"
                >
                  {b.name}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <p className="text-gray-600 line-clamp-2">{description}</p>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">
                ${discountedPrice.toFixed(2)}
                {discount > 0 && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${price.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{labels?.[0]?.name || "Global"}</span>
                {accountName && (
                  <>
                    <span className="mx-1">·</span>
                    <Link
                      href={`/seller/${accountId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-500 hover:text-blue-600 hover:underline"
                    >
                      Sold by {accountName}
                    </Link>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <Link
      href={`/products/${id}`}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer h-full flex flex-col"
    >
      <div className="relative aspect-square">
        <Image
          src={imageUrls[0]}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
          loading="lazy"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{name}</h3>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
            {category?.name}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mt-2">{description}</p>

        <div className="mt-auto pt-4">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-xl font-bold text-blue-600">
                ${discountedPrice.toFixed(2)}
              </span>
              {discount > 0 && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${price.toFixed(2)}
                </span>
              )}
            </div>
            <span
              className={`text-sm px-2 py-1 rounded ${
                stock > 10
                  ? "bg-green-100 text-green-700"
                  : stock > 0
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {stock > 0 ? `${stock} in stock` : "Out of stock"}
            </span>
          </div>

          <div className="mt-2">
            {accountName && (
              <Link
                href={`/seller/${accountId}`}
                onClick={(e) => e.stopPropagation()}
                className="text-sm text-gray-500 hover:text-blue-600 hover:underline"
              >
                Sold by {accountName}
              </Link>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
