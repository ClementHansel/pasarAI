// src/components/seller/MarketInfo.tsx
"use client";

import { Calendar, MapPin, Users } from "lucide-react";
import { PublicSellerProfile } from "@/lib/data/profile";
import { cn } from "@/lib/utils"; // Ensure you have a cn utility for class merging

interface MarketInfoProps {
  seller: PublicSellerProfile;
}

export const MarketInfo = ({ seller }: MarketInfoProps) => (
  <div className="mt-6 pt-6 border-t border-gray-100">
    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
      {/* Selling Since */}
      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
        <Calendar className="w-5 h-5 text-purple-600" />
        <span>
          Selling since:{" "}
          <span className="font-medium text-gray-700">
            {new Date(seller.sellerSince).toLocaleDateString()}
          </span>
        </span>
      </div>

      {/* Operational Markets */}
      <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
        <MapPin className="w-5 h-5 text-green-600" />
        <span>
          Operates in:{" "}
          <span className="font-medium text-gray-700">
            {seller.markets.join(", ")}
          </span>
        </span>
      </div>

      {/* Seller Status */}
      <div
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg",
          seller.verificationStatus === "new"
            ? "bg-blue-50 text-blue-700"
            : "bg-amber-50 text-amber-700"
        )}
      >
        <Users className="w-5 h-5" />
        <span className="font-medium">
          {seller.verificationStatus === "new"
            ? "New Seller"
            : "Established Seller"}
        </span>
      </div>
    </div>
  </div>
);
