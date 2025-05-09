// src/components/market/MarketComparison.tsx
"use client";
import React, { useState } from "react";
import type { MarketType } from "@/types/market";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MarketComparisonProps {
  marketType: MarketType;
}

export const MarketComparison: React.FC<MarketComparisonProps> = ({
  marketType,
}) => {
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Example comparison cards */}
        <Card className="p-4">
          <h3 className="font-semibold mb-2">
            {marketType === "domestic" ? "East Java" : "Singapore"}
          </h3>
          <ul className="text-sm space-y-1">
            <li>• 120 verified sellers</li>
            <li>• 3,400 products listed</li>
            <li>
              • Average price:{" "}
              {marketType === "domestic" ? "Rp 250,000" : "$18.50"}
            </li>
          </ul>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => {
              if (!selectedMarkets.includes("East Java")) {
                setSelectedMarkets((prev) => [...prev, "East Java"]);
              }
            }}
          >
            Add to Comparison
          </Button>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-2">
            {marketType === "domestic" ? "West Java" : "Malaysia"}
          </h3>
          <ul className="text-sm space-y-1">
            <li>• 80 verified sellers</li>
            <li>• 2,100 products listed</li>
            <li>
              • Average price:{" "}
              {marketType === "domestic" ? "Rp 180,000" : "$15.00"}
            </li>
          </ul>
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => {
              if (!selectedMarkets.includes("West Java")) {
                setSelectedMarkets((prev) => [...prev, "West Java"]);
              }
            }}
          >
            Add to Comparison
          </Button>
        </Card>
      </div>

      {/* Selected Market Comparison */}
      {selectedMarkets.length > 0 && (
        <Card className="p-4">
          <h4 className="font-semibold mb-4">Selected Market Comparison</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-4 text-left">Market</th>
                  <th className="py-2 px-4 text-right">Sellers</th>
                  <th className="py-2 px-4 text-right">Products</th>
                  <th className="py-2 px-4 text-right">Avg Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedMarkets.map((market) => (
                  <tr key={market} className="border-b">
                    <td className="py-2 px-4">{market}</td>
                    <td className="py-2 px-4 text-right">120</td>
                    <td className="py-2 px-4 text-right">3,400</td>
                    <td className="py-2 px-4 text-right">
                      {marketType === "domestic" ? "Rp 250,000" : "$18.50"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
