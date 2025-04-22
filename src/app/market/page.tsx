// src/app/market/page.tsx
"use client";

import { useState } from "react";
import { MarketCategory } from "@/components/market/MarketCategory";

const MarketPage = () => {
  // State to track the selected market type
  const [marketType, setMarketType] = useState<"domestic" | "global">(
    "domestic"
  );

  // Toggle between domestic and global markets
  const toggleMarketType = (type: "domestic" | "global") => {
    setMarketType(type);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Market</h1>

      {/* Toggle buttons for switching between market types */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          className={`px-4 py-2 border rounded-md ${
            marketType === "domestic" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => toggleMarketType("domestic")}
        >
          Domestic Markets (IDR)
        </button>
        <button
          className={`px-4 py-2 border rounded-md ${
            marketType === "global" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => toggleMarketType("global")}
        >
          Global Markets (USD)
        </button>
      </div>

      {/* Render market categories based on selected market type */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Markets</h2>
        <MarketCategory type={marketType} />
      </div>
    </div>
  );
};

export default MarketPage;
