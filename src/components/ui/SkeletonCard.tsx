import React from "react";

const SkeletonCard = () => (
  <div className="p-4 bg-gray-200 animate-pulse rounded-lg shadow-md">
    <div className="h-4 bg-gray-300 w-2/3 mb-4"></div>
    <div className="h-24 bg-gray-300 rounded mb-4"></div>
    <div className="h-4 bg-gray-300 w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-300 w-3/4"></div>
  </div>
);

export default SkeletonCard;
