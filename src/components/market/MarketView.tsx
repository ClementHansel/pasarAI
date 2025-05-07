// src/components/market/MarketView.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, Map } from "lucide-react";
import { SellerCard } from "./SellerCard";
import type { MarketRegion, MarketType } from "@/types/market";

interface MarketViewProps {
  type: MarketType;
  regions: MarketRegion[];
}

export const MarketView = ({ type, regions }: MarketViewProps) => {
  const [expandedRegions, setExpandedRegions] = useState<
    Record<string, boolean>
  >(regions.reduce((acc, region) => ({ ...acc, [region.name]: true }), {}));

  const [expandedSubregions, setExpandedSubregions] = useState<
    Record<string, boolean>
  >({});

  const toggleRegion = (regionName: string) => {
    setExpandedRegions((prev) => ({
      ...prev,
      [regionName]: !prev[regionName],
    }));
  };

  const toggleSubregion = (subregionName: string) => {
    setExpandedSubregions((prev) => ({
      ...prev,
      [subregionName]: !prev[subregionName],
    }));
  };

  return (
    <div className="space-y-4 w-full px-2 sm:px-4">
      {regions.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
          No markets found matching your search criteria
        </div>
      ) : (
        regions.map((region) => (
          <div
            key={region.name}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div
              className="bg-blue-50 p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleRegion(region.name)}
            >
              <div className="flex items-center">
                <Map className="text-blue-600 mr-2 shrink-0" size={20} />
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                  {type === "domestic" ? "Province: " : "Country: "}
                  <span className="text-blue-600">{region.name}</span>
                </h2>
              </div>
              {expandedRegions[region.name] ? (
                <ChevronDown className="text-gray-500 shrink-0" />
              ) : (
                <ChevronRight className="text-gray-500 shrink-0" />
              )}
            </div>

            {expandedRegions[region.name] && (
              <div className="p-2 sm:p-4">
                {region.subRegions.map((sub) => (
                  <div key={sub.name} className="mb-4 last:mb-0">
                    <div
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg cursor-pointer"
                      onClick={() => toggleSubregion(sub.name)}
                    >
                      <h3 className="text-base sm:text-lg font-semibold text-gray-700 truncate">
                        {type === "domestic" ? "City: " : "State/Province: "}
                        <span>{sub.name}</span>
                      </h3>
                      {expandedSubregions[sub.name] !== false ? (
                        <ChevronDown
                          className="text-gray-500 shrink-0"
                          size={18}
                        />
                      ) : (
                        <ChevronRight
                          className="text-gray-500 shrink-0"
                          size={18}
                        />
                      )}
                    </div>

                    {expandedSubregions[sub.name] !== false && (
                      <div className="mt-3 pl-3 border-l-2 border-gray-200">
                        {sub.cities.map((city) => (
                          <div key={city.name} className="mb-4 last:mb-0">
                            <h4 className="text-sm sm:text-md font-medium text-gray-600 mb-2 pl-2">
                              City:{" "}
                              <span className="text-gray-500">{city.name}</span>
                              <span className="text-sm ml-2 text-gray-400">
                                ({city.sellers.length}{" "}
                                {city.sellers.length === 1
                                  ? "seller"
                                  : "sellers"}
                                )
                              </span>
                            </h4>

                            <div className="space-y-2 pl-2">
                              {city.sellers.map((seller) => (
                                <SellerCard key={seller.id} seller={seller} />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
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
