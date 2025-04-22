import React from "react";
import Link from "next/link";
import { TrendingUp, CreditCard, Receipt } from "lucide-react";

const BentoGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
      {/* Featured Products */}
      <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <TrendingUp className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Most Searched Items</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {/* Add your featured products here */}
          {/* Example structure */}
          <div className="bg-white/10 rounded-xl p-4">
            <h3 className="font-semibold">Product 1</h3>
            <p className="text-sm opacity-80">1.2k searches</p>
          </div>
          {/* Repeat for other products */}
        </div>
      </div>

      {/* Top Up Section */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <CreditCard className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Top Up</h2>
        </div>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter amount"
            className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border-2 border-white/30 focus:outline-none focus:border-white"
          />
          <button className="w-full bg-white text-emerald-600 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors">
            Top Up Now
          </button>
        </div>
      </div>

      {/* Bills Section */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white">
        <div className="flex items-center gap-4 mb-6">
          <Receipt className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Bills</h2>
        </div>
        <div className="space-y-4">
          <div className="bg-white/10 rounded-xl p-4">
            <h3 className="font-semibold">Current Balance</h3>
            <p className="text-2xl font-bold">$1,234.56</p>
          </div>
          <Link
            href="/bills"
            className="block text-center bg-white text-red-600 py-2 rounded-lg font-semibold hover:bg-white/90 transition-colors"
          >
            View Bills
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;
