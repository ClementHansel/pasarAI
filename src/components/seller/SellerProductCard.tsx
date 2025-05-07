// src/components/seller/SellerProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { RatingStars } from "@/components/ui/RatingStars";

interface SellerProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    sold: number;
    rating: number;
  };
}

const SellerProductCard = ({ product }: SellerProductCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square rounded-t-xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-transform"
            sizes="(max-width: 640px) 100vw, 50vw, 33vw"
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mt-2">
            <RatingStars rating={product.rating} />
            <span className="text-sm text-gray-500">
              ({product.rating.toFixed(1)})
            </span>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </span>
            <span
              className={`text-sm px-2 py-1 rounded ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SellerProductCard;
