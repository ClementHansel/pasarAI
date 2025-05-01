// src/components/ProductDetailSkeleton.tsx
import React from "react";

export const ProductDetailSkeleton = () => (
  <div className="container mx-auto py-10 px-4 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
      {/* Image Section Skeleton */}
      <div className="bg-gray-200 animate-pulse rounded-2xl shadow-md aspect-square" />

      {/* Details Section Skeleton */}
      <div className="space-y-6">
        <div className="h-8 bg-gray-300 w-3/4 rounded mb-4" />
        <div className="h-6 bg-gray-300 w-1/2 rounded mb-6" />
        <div className="h-10 bg-gray-300 w-1/3 rounded mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 w-full rounded" />
          <div className="h-4 bg-gray-300 w-5/6 rounded" />
          <div className="h-4 bg-gray-300 w-4/6 rounded" />
        </div>
        <div className="h-12 bg-gray-300 w-1/2 rounded mt-8" />
      </div>
    </div>
  </div>
);
