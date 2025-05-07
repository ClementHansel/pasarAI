// src/components/dashboard/marketing/ProductList.tsx

"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductListProps {
  products: Product[];
  openModal: (product: Product) => void;
}

export default function ProductList({ products, openModal }: ProductListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center gap-4">
            <Image
              src={product.image || "/placeholder.png"}
              alt={product.name}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-sm text-muted-foreground">
                Price: Rp {product.price.toLocaleString()}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {product.isFeatured && (
                  <Badge variant="default">🔥 Featured</Badge>
                )}
                {product.isNewArrival && (
                  <Badge variant="outline">🆕 New Arrival</Badge>
                )}
                {product.isBestSeller && (
                  <Badge variant="outline">🏆 Best Seller</Badge>
                )}
                {product.isOnSale && (
                  <Badge variant="destructive">💰 On Sale</Badge>
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
