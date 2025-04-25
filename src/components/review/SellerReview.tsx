"use client";

import React, { useEffect, useState } from "react";

interface Review {
  id: number;
  rating: number;
  comment: string;
  reviewerName: string;
}

interface SellerReviewProps {
  sellerId: string;
  currentUserId?: string;
  currentUserRole?: "admin" | "seller" | "buyer";
}

// Replace with actual fetch logic later
const fetchSellerReviews = async (sellerId: string): Promise<Review[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          rating: 5,
          comment: "Awesome experience. Highly recommend this seller!",
          reviewerName: "Alice",
        },
        {
          id: 2,
          rating: 4,
          comment: "Good seller, will buy again.",
          reviewerName: "Bob",
        },
      ]);
    }, 800);
  });
};

export default function SellerReview({
  sellerId,
  currentUserId,
  currentUserRole,
}: SellerReviewProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      if (!sellerId) return;
      const data = await fetchSellerReviews(sellerId);
      setReviews(data);
      setLoading(false);
    };
    loadReviews();
  }, [sellerId]);

  const canManage =
    currentUserRole === "admin" ||
    (currentUserRole === "seller" && currentUserId === sellerId);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Seller Reviews</h2>

      {loading ? (
        <div className="text-gray-500">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-gray-500">No reviews yet.</div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{review.reviewerName}</span>
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}

      {canManage && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Manage Reviews</h3>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
            Edit or Respond to Reviews
          </button>
        </div>
      )}
    </div>
  );
}
