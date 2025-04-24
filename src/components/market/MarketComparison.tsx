// src/components/market/MarketComparison.tsx
"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MarketType } from "@/types/market";
import { domesticMarkets, globalMarkets } from "@/lib/data/markets";

interface MarketStat {
  name: string;
  sellerCount: number;
  avgRating?: number;
  regions: number;
}

interface MarketComparisonProps {
  marketType: MarketType;
}

export const MarketComparison = ({ marketType }: MarketComparisonProps) => {
  const [comparisonData, setComparisonData] = useState<MarketStat[]>([]);
  const [comparisonMetric, setComparisonMetric] = useState<
    "sellerCount" | "avgRating" | "regions"
  >("sellerCount");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate comparison data from the markets
    setIsLoading(true);

    const domesticData = calculateMarketStats(domesticMarkets);
    const globalData = calculateMarketStats(globalMarkets);

    // Create our comparison dataset
    const data = [
      {
        name: "Domestic",
        ...domesticData,
      },
      {
        name: "Global",
        ...globalData,
      },
    ];

    setComparisonData(data);
    setIsLoading(false);
  }, [marketType]);

  // Helper function to calculate statistics for a market
  const calculateMarketStats = (markets: any[]): MarketStat => {
    let totalSellers = 0;
    let totalRating = 0;
    let sellerCount = 0;

    markets.forEach((region) => {
      region.subregions.forEach((subregion) => {
        subregion.cities.forEach((city) => {
          totalSellers += city.sellers.length;

          // Calculate average rating if ratings exist
          city.sellers.forEach((seller) => {
            if (seller.rating) {
              totalRating += seller.rating;
              sellerCount++;
            }
          });
        });
      });
    });

    const avgRating = sellerCount > 0 ? totalRating / sellerCount : 0;

    return {
      name: markets[0]?.name || "Unknown",
      sellerCount: totalSellers,
      avgRating: parseFloat(avgRating.toFixed(1)),
      regions: markets.length,
    };
  };

  const formatYLabel = (value: number) => {
    switch (comparisonMetric) {
      case "avgRating":
        return `${value.toFixed(1)}`;
      case "regions":
      case "sellerCount":
      default:
        return value.toString();
    }
  };

  const metricLabels = {
    sellerCount: "Seller Count",
    avgRating: "Average Rating",
    regions: "Region Count",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-gray-700">
          Comparing Domestic vs Global Markets
        </h3>

        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          {(Object.keys(metricLabels) as Array<keyof typeof metricLabels>).map(
            (metric) => (
              <button
                key={metric}
                onClick={() => setComparisonMetric(metric)}
                className={`px-3 py-1 text-sm transition-colors ${
                  comparisonMetric === metric
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {metricLabels[metric]}
              </button>
            )
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatYLabel} />
              <Tooltip
                formatter={(value) => [value, metricLabels[comparisonMetric]]}
              />
              <Legend />
              <Bar
                dataKey={comparisonMetric}
                name={metricLabels[comparisonMetric]}
                fill="#3B82F6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-4">
        {comparisonData.map((market) => (
          <div key={market.name} className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">{market.name} Market Summary</h4>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-600">Total Sellers:</span>
                <span className="font-medium">{market.sellerCount}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Average Rating:</span>
                <span className="font-medium">
                  {market.avgRating?.toFixed(1) || "N/A"}
                </span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Total Regions:</span>
                <span className="font-medium">{market.regions}</span>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
