"use client";

import Image from "next/image";
import { ShieldCheck, BadgeCheck, Star } from "lucide-react";
import { PublicSellerProfile } from "@/lib/data/profile";

interface SellerHeaderProps {
  seller: PublicSellerProfile;
}

export const SellerHeader = ({ seller }: SellerHeaderProps) => {
  const verificationStyles = {
    new: "bg-gray-100 text-gray-800",
    verified: "bg-blue-100 text-blue-800",
    premium: "bg-purple-100 text-purple-800",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8 relative">
      {/* Verification Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            verificationStyles[seller.verificationStatus]
          }`}
        >
          <ShieldCheck className="inline mr-1 h-4 w-4" />
          {seller.verificationStatus.toUpperCase()}
        </span>
      </div>

      {/* Main Header Content */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <Image
            src={seller.avatar || "/images/default-avatar.png"}
            alt={seller.name}
            fill
            className="object-cover"
            sizes="(max-width: 128px)"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {seller.name}
            {seller.verificationStatus === "verified" && (
              <BadgeCheck className="inline ml-2 text-blue-600" size={24} />
            )}
          </h1>
          <p className="text-gray-600 text-lg mb-4">{seller.description}</p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Star className="w-5 h-5 text-blue-600" />
              <span className="font-medium">
                {seller.rating.toFixed(1)}/5.0 ({seller.reviews.length} reviews)
              </span>
            </div>
            {/* Other stats... */}
          </div>
        </div>
      </div>
    </div>
  );
};
