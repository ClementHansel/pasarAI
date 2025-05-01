// src/components/product/ProductDetails.tsx
"use client";

import { Currency } from "@/types/market";
import { Star, MapPin, Truck, ShieldCheck, ShoppingCart } from "lucide-react";
import WishlistButton from "@/components/wishlist/WishlistButton";
import { Product } from "@/types/product";

export default function ProductDetails({
  product,
  marketId,
  currency,
  isDomestic,
}: {
  product: Product;
  marketId: string;
  currency: Currency;
  isDomestic: boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="border-b pb-6">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          {product.name}
        </h1>
        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <Star
                key={rating}
                className={`h-5 w-5 ${
                  rating < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {product.reviews?.length} reviews
          </span>
        </div>
      </div>

      {/* Product Origin Badges */}
      <div className="flex items-center gap-2">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {isDomestic ? "Domestic Product" : "International Product"}
        </span>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          {currency === Currency.IDR ? "Local Currency" : "USD Pricing"}
        </span>
      </div>

      {/* Pricing Section */}
      <div className="flex items-center gap-4">
        <p className="text-3xl font-bold text-gray-900">
          {currency === Currency.IDR ? "IDR" : "USD"}{" "}
          {product.price.toLocaleString()}
        </p>
        {product.discount &&
          product.discount > 0 &&
          product.originalPrice !== null && (
            <span className="text-xl text-gray-500 line-through">
              {currency === Currency.IDR ? "IDR" : "USD"}{" "}
              {product.originalPrice?.toLocaleString()}
            </span>
          )}
      </div>

      {/* Product Metadata */}
      <div className="flex gap-2">
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {product.category?.name}
        </span>
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            product.stock > 0
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Product Description */}
      <p className="text-gray-700 leading-relaxed">{product.description}</p>

      {/* Enhanced CTA Section */}
      <div className="flex flex-col gap-4">
        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-lg font-semibold">
          <ShoppingCart className="w-6 h-6" />
          Add to Cart
        </button>

        <div className="flex items-center gap-4 justify-center">
          <WishlistButton
            accountId="mock-account-123"
            productId={product.id.toString()}
            marketId={marketId}
            size={24}
            className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
          />
          <span className="text-gray-600 text-sm">Add to Wishlist</span>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 mt-6 border-t pt-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck className="w-5 h-5 text-green-600" />
          <span>
            {isDomestic ? "1-3 Day Delivery" : "International Shipping"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          <span>Buyer Protection Guarantee</span>
        </div>
      </div>
    </div>
  );
}
