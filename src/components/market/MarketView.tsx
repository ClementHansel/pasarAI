// src/components/market/MarketView.tsx
"use client";
import React, { useState } from "react";
import { SellerCard } from "./SellerCard";
import type { MarketRegion, MarketType } from "@/types/market";
import { ChevronDown, Map } from "lucide-react";

interface MarketViewProps {
  type: MarketType;
  regions: MarketRegion[];
  viewMode?: "grid" | "list";
}

export const MarketView: React.FC<MarketViewProps> = ({
  type,
  regions,
  // viewMode = "grid",
}) => {
  const [expandedRegions, setExpandedRegions] = useState<
    Record<string, boolean>
  >(
    regions.reduce((acc, region) => {
      acc[region.name] = true;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleRegion = (regionName: string) => {
    setExpandedRegions((prev) => ({
      ...prev,
      [regionName]: !prev[regionName],
    }));
  };

  return (
    <div className="space-y-6">
      {regions.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
          No markets found matching your search criteria
        </div>
      ) : (
        regions.map((region) => (
          <div
            key={region.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            {/* Region Header */}
            <div
              className="bg-blue-50 p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleRegion(region.name)}
            >
              <div className="flex items-center">
                <Map className="text-blue-600 mr-2" size={20} />
                <h2 className="text-xl font-bold text-gray-800">
                  {type === "domestic" ? "Province: " : "Country: "}
                  <span className="text-blue-600">{region.name}</span>
                </h2>
              </div>
              {expandedRegions[region.name] ? (
                <ChevronDown className="text-gray-500" />
              ) : (
                <ChevronDown className="text-gray-500" />
              )}
            </div>

            {/* Market Content */}
            {expandedRegions[region.name] && (
              <div className="p-4">
                {region.subRegions.map((sub) => (
                  <div key={sub.id} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg cursor-pointer">
                      <h3 className="text-lg font-semibold text-gray-700">
                        {type === "domestic" ? "City: " : "State/Province: "}
                        <span>{sub.name}</span>
                      </h3>
                    </div>

                    <div className="mt-3 pl-3 border-l-2 border-gray-200">
                      {sub.cities.map((city) => (
                        <div key={city.id} className="mb-4 last:mb-0">
                          <h4 className="text-md font-medium text-gray-600 mb-2 pl-2">
                            {city.name}
                            <span className="text-sm ml-2 text-gray-400">
                              ({city.sellers.length}{" "}
                              {city.sellers.length === 1 ? "seller" : "sellers"}
                              )
                            </span>
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-2">
                            {city.sellers.map((seller) => (
                              <SellerCard key={seller.id} seller={seller} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};
