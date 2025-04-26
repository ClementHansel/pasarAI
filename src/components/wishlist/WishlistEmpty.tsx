"use client";

import { useRouter } from "next/navigation";
import { HeartOff } from "lucide-react";

export default function WishlistEmpty() {
  const router = useRouter();

  return (
    <div className="text-center py-16 text-gray-500">
      <HeartOff className="mx-auto mb-4" size={48} strokeWidth={1.5} />
      <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
      <p className="text-sm mt-2 mb-6">Start adding your favorite products!</p>

      <button
        onClick={() => router.push("/product")}
        className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Shop Now
      </button>
    </div>
  );
}
