// src/components/market/SellerCard.tsx
"use client";

import { useRouter } from "next/navigation";
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
      className="cursor-pointer p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border hover:border-blue-400"
    >
      <h3 className="text-lg font-semibold">{seller.name}</h3>
      <p className="text-sm text-gray-500">{seller.currency}</p>
    </div>
  );
};
