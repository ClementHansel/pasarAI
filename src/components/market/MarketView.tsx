// src/components/market/MarketView.tsx
"use client";

import { SellerCard } from "./SellerCard";
import type { MarketRegion, MarketType } from "@/types/market";

interface MarketViewProps {
  type: MarketType;
  regions: MarketRegion[];
}

export const MarketView = ({ type, regions }: MarketViewProps) => {
  return (
    <div className="space-y-8">
      {regions.map((region) => (
        <div key={region.name}>
          <h2 className="text-2xl font-semibold mb-2">
            {type === "domestic" ? "Province: " : "Country: "}
            {region.name}
          </h2>

          {region.subregions.map((sub) => (
            <div key={sub.name} className="ml-4">
              <h3 className="text-xl font-medium text-gray-700 mb-1">
                {type === "domestic" ? "City: " : "State/Province: "}
                {sub.name}
              </h3>

              {sub.cities.map((city) => (
                <div key={city.name} className="ml-6 mb-4">
                  <h4 className="text-lg font-semibold text-gray-600 mb-2">
                    City: {city.name}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {city.sellers.map((seller) => (
                      <SellerCard key={seller.id} seller={seller} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
