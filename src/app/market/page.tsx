// src/app/market/page.tsx
"use client";

import { MarketCategory } from "@/components/market/MarketCategory";

const MarketPage = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Market</h1>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Domestic Markets</h2>
        <MarketCategory type="domestic" /> {/* Use string literals */}
        <h2 className="text-2xl font-semibold mt-6">Global Markets</h2>
        <MarketCategory type="global" /> {/* Use string literals */}
      </div>
    </div>
  );
};

export default MarketPage;
