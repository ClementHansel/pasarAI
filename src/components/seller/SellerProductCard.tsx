// src/components/seller/SellerProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface SellerProductCardProps {
  product: SellerProduct;
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
          />
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
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
