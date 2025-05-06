// src/components/dashboard/marketing/ProductList.tsx

"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductListProps {
  products: Product[];
  openModal: (product: Product) => void;
}

export default function ProductList({ products, openModal }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No products available for marketing.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 bg-white"
        >
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-md overflow-hidden">
              <Image
                src={product.image || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-lg truncate">{product.name}</h2>
              <p className="text-sm text-gray-600 mt-1">
                Rp {product.price.toLocaleString()}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {product.isFeatured && (
                  <Badge variant="default" className="bg-yellow-500 text-white">
                    🔥 Featured
                  </Badge>
                )}
                {product.isNewArrival && (
                  <Badge variant="outline">🆕 New Arrival</Badge>
                )}
                {product.isBestSeller && (
                  <Badge variant="outline">🏆 Best Seller</Badge>
                )}
                {product.isOnSale && (
                  <Badge
                    variant="destructive"
                    className="bg-red-500 text-white"
                  >
                    💰 On Sale
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <Button
            onClick={() => openModal(product)}
            className="mt-4 w-full"
            variant="secondary"
          >
            Set Promotion
          </Button>
        </div>
      ))}
    </div>
  );
}
