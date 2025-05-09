// src/components/market/SellerCard.tsx
"use client";
import React, { useState } from "react";
import Link from "next/link";
// import Image from "next/image";
import { Star } from "lucide-react";
import { Seller } from "@/types/market";

interface SellerCardProps {
  seller: Seller;
}

export const SellerCard: React.FC<SellerCardProps> = ({ seller }) => {
  const [imageLoaded] = useState(false);
  const [rating] = useState(seller.rating || 0);
  const isVerified = seller.verified || false;

  return (
    <Link
      href={`/profile/${seller.id}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Seller Avatar */}
      <div className="relative h-40 w-full bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        {/* <Image
          src={seller. || "/images/avatar-default.png"}
          alt={seller.name}
          fill
          onLoad={() => setImageLoaded(true)}
          className={`object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
        /> */}
        {isVerified && (
          <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
            Verified
          </span>
        )}
      </div>

      {/* Seller Info */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
          {seller.name}
        </h3>

        <div className="mt-2 flex items-center">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star
              key={idx}
              className={`w-4 h-4 ${
                idx < rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <p className="text-sm text-gray-500 mt-2">
          {seller.productCount || 0} products
        </p>
      </div>
    </Link>
  );
};
