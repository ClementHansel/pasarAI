// src/components/review/SellerReview.tsx
"use client";

import { Review } from "@/types/reviews";
import React, { useEffect, useState } from "react";

interface SellerReviewProps {
  sellerId: string;
  currentUserId?: string;
  currentUserRole?: "admin" | "seller" | "buyer";
}

// Mock fetch — replace with real API call
const fetchSellerReviews = async (sellerId: string): Promise<Review[]> => {
  console.log(`Fetching reviews for sellerId: ${sellerId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          rating: 5,
          comment: "Awesome experience. Highly recommend this seller!",
          reviewerName: "Alice",
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          rating: 4,
          comment: "Good seller, will buy again.",
          reviewerName: "Bob",
          timestamp: new Date().toISOString(),
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
    if (!sellerId) return;
    const load = async () => {
      try {
        const data = await fetchSellerReviews(sellerId);
        setReviews(data);
      } catch {
        // handle error if needed
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [sellerId]);

  const canManage =
    currentUserRole === "admin" ||
    (currentUserRole === "seller" && currentUserId === sellerId);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      {/* Using sellerId prop explicitly */}
      <h2 className="text-2xl font-bold mb-4">
        Reviews for seller <span className="font-mono">{sellerId}</span>
      </h2>

      {loading ? (
        <div className="text-gray-500">Loading reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-gray-500">No reviews yet.</div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{rev.reviewerName}</span>
                <span className="text-yellow-500">
                  {"★".repeat(rev.rating)}
                  {"☆".repeat(5 - rev.rating)}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{rev.comment}</p>
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
