// src/components/seller/ReviewsTab.tsx
"use client";

import { RatingStars } from "@/components/ui/RatingStars";
import { PublicSellerProfile } from "@/lib/data/profile";

interface ReviewsTabProps {
  reviews: PublicSellerProfile["reviews"];
  rating: number;
  products: PublicSellerProfile["products"];
}

export const ReviewsTab = ({ reviews, rating, products }: ReviewsTabProps) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold text-blue-600">
          {rating.toFixed(1)}
        </div>
        <div className="flex flex-col gap-1">
          <RatingStars rating={rating} />
          <span className="text-sm text-gray-600">
            Based on {reviews.length} reviews
          </span>
        </div>
      </div>
    </div>

    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="border-b pb-6 last:border-0">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-medium">{review.buyerName}</span>
            <div className="flex items-center gap-1">
              <RatingStars rating={review.rating} />
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
          </div>
          <p className="text-gray-600">{review.comment}</p>
          {review.productId && (
            <div className="mt-2 text-sm text-blue-600">
              Product:{" "}
              {products.find((p) => p.id === review.productId)?.name ||
                "Unknown Product"}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
