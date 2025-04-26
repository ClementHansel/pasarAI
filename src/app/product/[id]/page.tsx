// src/app/products/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { domesticProducts, globalProducts } from "@/lib/data/products";
import ProductDetails from "@/components/product/ProductDetails";
import { Currency } from "@/types/market";
import ProductImages from "@/components/product/ProductImage";
import { ProductDetailSkeleton } from "@/components/product/ProductDetailSkleton";
import { Star } from "lucide-react";

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<any>(null);
  const [marketId, setMarketId] = useState("");
  const [currency, setCurrency] = useState<Currency>(Currency.IDR);
  const [loading, setLoading] = useState(true);
  const [isDomestic, setIsDomestic] = useState(false);

  useEffect(() => {
    const findProduct = () => {
      const id = params?.id;
      if (!id || Array.isArray(id)) return;

      const productId = parseInt(id, 10);
      if (isNaN(productId)) return;

      // Search domestic products
      for (const region of domesticProducts) {
        for (const subregion of region.subregions) {
          for (const city of subregion.cities) {
            const found = city.products.find((p) => p.id === productId);
            if (found) {
              setCurrency(Currency.IDR);
              setMarketId(city.id);
              setIsDomestic(true);
              return found;
            }
          }
        }
      }

      // Search global products
      for (const region of globalProducts) {
        for (const subregion of region.subregions) {
          for (const city of subregion.cities) {
            const found = city.products.find((p) => p.id === productId);
            if (found) {
              setCurrency(Currency.USD);
              setMarketId(city.id);
              setIsDomestic(false);
              return found;
            }
          }
        }
      }

      return null;
    };

    const selectedProduct = findProduct();
    if (!selectedProduct) {
      router.push("/product");
      return;
    }

    setProduct(selectedProduct);
    setLoading(false);
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
          marketId={marketId}
          currency={currency}
          isDomestic={isDomestic}
        />
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
        <div className="space-y-6">
          {product.reviews?.map((review: any) => (
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
