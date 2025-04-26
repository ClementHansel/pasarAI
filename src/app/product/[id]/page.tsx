"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Product } from "@/types/product";
import { domesticProducts, globalProducts } from "@/lib/data/products";

const ProductDetailPage = () => {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const id = params?.id;
    if (!id || Array.isArray(id)) return;

    const productId = parseInt(id, 10);
    if (isNaN(productId)) return;

    const allProducts = [
      ...domesticProducts.flatMap((region) =>
        region.subregions.flatMap((sub) =>
          sub.cities.flatMap((city) => city.products)
        )
      ),
      ...globalProducts.flatMap((region) =>
        region.subregions.flatMap((sub) =>
          sub.cities.flatMap((city) => city.products)
        )
      ),
    ];

    const selectedProduct = allProducts.find((p) => p.id === productId);
    setProduct(selectedProduct || null);
  }, [params]);

  if (!product) {
    return (
      <div className="container mx-auto py-10 text-center text-red-500">
        <p className="text-xl">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Image Section */}
        <div className="w-full">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            width={700}
            height={700}
            className="rounded-2xl w-full object-cover shadow-md"
            priority
          />
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>

          <p className="text-xl text-gray-700">{product.description}</p>

          <div className="text-3xl font-semibold text-green-600">
            ${product.price.toFixed(2)}
          </div>

          {/* Optional tags */}
          <div className="flex gap-2">
            <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              Category: {product.category?.name ?? "Uncategorized"}
            </span>
            <span className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              In Stock
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-black text-white text-lg px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              Add to Cart
            </button>
            <button className="border border-gray-300 text-gray-800 text-lg px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
