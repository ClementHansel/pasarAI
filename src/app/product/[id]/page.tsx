// src/app/products/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProductDetails from "@/components/product/ProductDetails";
import ProductImages from "@/components/product/ProductImage";
import { ProductDetailSkeleton } from "@/components/product/ProductDetailSkleton";
import { Star } from "lucide-react";
import { Product } from "@/types/product";
import { Currency } from "@/types/market";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          router.push("/product"); // redirect to listing or 404
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

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <ProductDetailSkeleton />
          <div className="space-y-6">
            <ProductDetailSkeleton />
            <ProductDetailSkeleton />
            <ProductDetailSkeleton />
            <ProductDetailSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p className="text-xl text-red-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <ProductImages images={product.imageUrls} />
        <ProductDetails
          product={product}
          marketId={product.marketId}
          currency={product.currency as Currency}
          isDomestic={product.currency === Currency.IDR}
        />
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {product.reviews.map((review) => (
            <div key={review.id} className="border-b pb-6">
              <div className="flex items-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
