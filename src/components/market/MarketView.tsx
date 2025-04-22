"use client";

import { SellerCard } from "./SellerCard";
import type { MarketRegion, MarketType } from "@/types/market";

interface MarketViewProps {
  type: MarketType;
  regions: MarketRegion[];
}

export const MarketView = ({ type, regions }: MarketViewProps) => {
  return (
    <div className="space-y-10">
      {regions.map((region) => (
        <div
          key={region.name}
          className="space-y-6 border-b pb-6 last:border-none"
        >
          <h2 className="text-2xl font-bold text-gray-900">
            {type === "domestic" ? "Province: " : "Country: "}
            <span className="text-blue-600">{region.name}</span>
          </h2>

          {region.subregions.map((sub) => (
            <div
              key={sub.name}
              className="space-y-4 pl-4 border-l-2 border-gray-200"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {type === "domestic" ? "City: " : "State/Province: "}
                <span className="text-gray-700">{sub.name}</span>
              </h3>

              {sub.cities.map((city) => (
                <div key={city.name} className="space-y-3 pl-4">
                  <h4 className="text-lg font-medium text-gray-600">
                    City: <span className="text-gray-500">{city.name}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
