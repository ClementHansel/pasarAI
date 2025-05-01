// src/components/ui/RatingStars.tsx
"use client";

import { Star } from "lucide-react";

export const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};
