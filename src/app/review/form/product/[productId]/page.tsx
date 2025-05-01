"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

export default function ProductReviewPage() {
  const { productId } = useParams();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace with real API call
    setTimeout(() => {
      console.log("Review submitted:", { productId, rating, comment });
      setSubmitted(true);
      setIsSubmitting(false);
      setRating("");
      setComment("");
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Review Product</h1>

      {/* Product preview (mock) */}
      <div className="bg-white p-4 mb-6 rounded shadow">
        <p className="text-sm text-gray-600">
          Reviewing product with ID: <strong>{productId}</strong>
        </p>
        {/* Replace with actual product info if available */}
        <div className="mt-2 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded" />
          <div>
            <h2 className="text-lg font-semibold">Sample Product Name</h2>
            <p className="text-sm text-gray-500">
              Product description goes here
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-6"
      >
        {/* Rating */}
        <div>
          <label htmlFor="rating" className="block mb-1 font-medium">
            Rating
          </label>
          <select
            id="rating"
            name="rating"
            className="w-full border rounded p-2"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="" disabled>
              Select rating
            </option>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star{star > 1 && "s"}
              </option>
            ))}
          </select>
        </div>

        {/* Comment */}
        <div>
          <label htmlFor="comment" className="block mb-1 font-medium">
            Review
          </label>
          <textarea
            id="comment"
            name="comment"
            className="w-full border rounded p-2"
            rows={5}
            placeholder="Share your thoughts about this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 w-full disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>

        {submitted && (
          <p className="text-green-600 text-center">Review submitted! ✅</p>
        )}
      </form>
    </div>
  );
}
