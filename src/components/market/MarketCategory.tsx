"use client";

import { useState, useEffect } from "react";
import { MarketFilter } from "./MarketFilter";
import { MarketView } from "./MarketView";
import { domesticMarkets, globalMarkets } from "@/lib/data/markets";
import { MarketRegion, MarketType, Seller } from "@/types/market";

interface MarketCategoryProps {
  type: MarketType; // "domestic" | "global"
}

export const MarketCategory = ({ type }: MarketCategoryProps) => {
  const [filteredData, setFilteredData] = useState<MarketRegion[]>([]);
  const [allData, setAllData] = useState<MarketRegion[]>([]);

  // Function to get market data based on the type
  const getMockMarketData = (type: MarketType): MarketRegion[] => {
    return type === "domestic" ? domesticMarkets : globalMarkets;
  };

  // Fetch the initial data when the type changes
  useEffect(() => {
    const data = getMockMarketData(type);
    setAllData(data);
    setFilteredData(data); // Initially set filtered data to all data
  }, [type]);

  // Handle the filter for the search term
  const handleFilter = (search: string) => {
    if (!search.trim()) {
      setFilteredData(allData); // If no search term, reset the data to original
      return;
    }

    const lowerSearch = search.toLowerCase().trim();

    // Filter data based on the search term
    const filtered = allData
      .map((region) => {
        const filteredSubregions = region.subregions
          .map((subregion) => {
            const filteredCities = subregion.cities
              .map((city) => {
                const matchingSellers = city.sellers.filter((seller: Seller) =>
                  seller.name.toLowerCase().includes(lowerSearch)
                );
                return { ...city, sellers: matchingSellers };
              })
              .filter((city) => city.sellers.length > 0);

            return { ...subregion, cities: filteredCities };
          })
          .filter((subregion) => subregion.cities.length > 0);

        return { ...region, subregions: filteredSubregions };
      })
      .filter((region) => region.subregions.length > 0);

    setFilteredData(filtered); // Set the filtered data
  };

  return (
    <div className="space-y-6">
      {/* Market Filter: Allows for searching within the market */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Search Markets</h2>
        <MarketFilter onSearch={handleFilter} />
      </div>

      {/* Market View: Renders the market data based on the current filter */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MarketView type={type} regions={filteredData} />
      </div>
    </div>
  );
};
