// src/app/products/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import type { CartState } from "@/lib/cartStore";
import type { Product } from "@/types/product";
import ProductImages from "@/components/product/ProductImage";
import ProductDetails from "@/components/product/ProductDetails";
import { ProductDetailSkeleton } from "@/components/product/ProductDetailSkleton";
import { Currency } from "@/types/market";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addItem = useCartStore((state: CartState) => state.addItem);

  useEffect(() => {
    const id = params?.id;
    if (!id || Array.isArray(id)) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.status === 404) {
          router.push("/product");
          return;
        }
        if (!res.ok) {
          throw new Error(res.statusText || "Failed to fetch product");
        }
        const data: Product = await res.json();
        setProduct(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params, router]);

  const handleAddToCart = (p: Product) => {
    addItem({
      id: p.id.toString(),
      name: p.name,
      price: p.price,
      discountedPrice: p.originalPrice ?? 0,
      quantity: 1,
      image: p.imageUrls[0],
      marketId: p.marketId,
      marketName: p.location?.region ?? p.marketId,
    });
  };

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!product) return <div className="text-red-500">Not found</div>;

  return (
    <div className="container mx-auto py-10 px-4 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Product Images */}
        <ProductImages images={product.imageUrls} />

        {/* Product Details */}
        <ProductDetails
          product={product}
          marketId={product.marketId}
          currency={product.currency as Currency}
          isDomestic={product.marketType === "domestic"}
        />
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => handleAddToCart(product)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
