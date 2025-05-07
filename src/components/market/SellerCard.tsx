// src/components/market/SellerCard.tsx
"use client";

import { useRouter } from "next/navigation";
import { Store, TrendingUp, MapPin, Globe } from "lucide-react";
import type { Seller } from "@/types/market";

interface SellerCardProps {
  seller: Seller;
}

export const SellerCard = ({ seller }: SellerCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/market/seller/${seller.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-300 flex flex-row w-full"
    >
      <div className="bg-blue-50 p-4 flex items-center">
        <Store className="text-blue-600" size={24} />
      </div>

      <div className="flex-1 p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800 line-clamp-1">
            {seller.name}
          </h3>
          {seller.rating && (
            <div className="flex items-center bg-white px-2 py-1 rounded-full border border-gray-100">
              <TrendingUp className="text-green-500 mr-1" size={14} />
              <span className="text-xs font-medium">{seller.rating}/5</span>
            </div>
          )}
        </div>

        <div className="flex items-center text-gray-500 text-sm mt-2">
          <MapPin size={14} className="mr-1" />
          <span className="line-clamp-1">
            {seller.location || "Location not specified"}
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500 text-sm">
            <Globe size={14} className="mr-1" />
            <span>{seller.currency}</span>
          </div>

          <button className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded-md transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
