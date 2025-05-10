"use client";
import React, { useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Star, Box } from "lucide-react";
import type { MarketRegion, MarketType } from "@/types/market";

interface MarketListViewProps {
  type: MarketType;
  regions: MarketRegion[];
  searchQuery?: string;
}

export const MarketListView: React.FC<MarketListViewProps> = ({
  regions,
  type,
  searchQuery = "",
}) => {
  const router = useRouter();

  // Memoize the click handler
  const handleSellerClick = useCallback(
    (sellerId: string) => {
      router.push(`/seller/${sellerId}`);
    },
    [router]
  );

  // Filter regions based on search query
  const filteredRegions = useMemo(() => {
    if (!searchQuery) return regions;

    const query = searchQuery.toLowerCase();
    return regions
      .map((region) => {
        // Filter subregions
        const filteredSubRegions = region.subRegions
          .map((subRegion) => {
            // Filter cities
            const filteredCities = subRegion.cities
              .map((city) => {
                // Filter sellers
                const filteredSellers = city.sellers.filter(
                  (seller) =>
                    seller.name.toLowerCase().includes(query) ||
                    (seller.location &&
                      seller.location.toLowerCase().includes(query)) ||
                    (seller.role &&
                      seller.role.toLowerCase().includes(query)) ||
                    // Match "verified" in search to find verified sellers
                    (seller.verified && "verified".includes(query))
                );

                if (filteredSellers.length === 0) return null;
                return { ...city, sellers: filteredSellers };
              })
              .filter(
                (city): city is NonNullable<typeof city> => city !== null
              );

            if (filteredCities.length === 0) return null;
            return {
              ...subRegion,
              cities: filteredCities,
              sellers: filteredCities.flatMap((city) => city.sellers),
            };
          })
          .filter((sub): sub is NonNullable<typeof sub> => sub !== null);

        if (filteredSubRegions.length === 0) return null;

        return {
          ...region,
          subRegions: filteredSubRegions,
          sellers: filteredSubRegions.flatMap((sub) => sub.sellers),
        };
      })
      .filter((region): region is NonNullable<typeof region> => region !== null)
      .filter(
        (region) =>
          // Also include regions that match the search query directly
          region.name.toLowerCase().includes(query) ||
          region.subRegions.some(
            (sub) =>
              sub.name.toLowerCase().includes(query) ||
              sub.cities.some(
                (city) =>
                  city.name.toLowerCase().includes(query) ||
                  city.sellers.some(
                    (seller) =>
                      seller.name.toLowerCase().includes(query) ||
                      (seller.role &&
                        seller.role.toLowerCase().includes(query)) ||
                      (seller.verified && "verified".includes(query))
                  )
              )
          )
      );
  }, [regions, searchQuery]);

  return (
    <div className="space-y-6">
      {filteredRegions.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
          No markets found {searchQuery && "matching your search criteria"}
        </div>
      ) : (
        filteredRegions.map((region) => (
          <div
            key={region.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            {/* Region Header */}
            <div className="bg-blue-50 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="text-blue-600 mr-2" size={20} />
                  <h2 className="text-xl font-bold text-gray-800">
                    {type === "domestic" ? "Province: " : "Country: "}
                    <span className="text-blue-600">{region.name}</span>
                  </h2>
                </div>
                <span className="text-sm text-gray-500">
                  {region.sellers.length} seller
                  {region.sellers.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Region Content */}
            {region.subRegions.map((subRegion) => (
              <div key={subRegion.id} className="border-t border-gray-100">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-700 mb-3 flex items-center justify-between">
                    <span>{subRegion.name}</span>
                    <span className="text-sm text-gray-500">
                      {subRegion.sellers.length} seller
                      {subRegion.sellers.length !== 1 ? "s" : ""}
                    </span>
                  </h3>
                  <div className="space-y-4">
                    {subRegion.cities.map((city) => (
                      <div key={city.id}>
                        <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center justify-between">
                          <span>{city.name}</span>
                          <span className="text-gray-400">
                            {city.sellers.length} seller
                            {city.sellers.length !== 1 ? "s" : ""}
                          </span>
                        </h4>
                        {city.sellers.length > 0 ? (
                          <div className="grid gap-3">
                            {city.sellers.map((seller) => (
                              <div
                                key={seller.id}
                                onClick={() => handleSellerClick(seller.id)}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 bg-white rounded-full group-hover:bg-blue-50 transition-colors">
                                    <Box className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-800 group-hover:text-blue-600">
                                      {seller.name}
                                      {seller.verified && (
                                        <span className="inline-flex items-center ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                          Verified
                                        </span>
                                      )}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                                      {seller.rating && (
                                        <>
                                          <span className="flex items-center">
                                            <Star
                                              size={14}
                                              className="text-yellow-400 mr-1"
                                              fill="currentColor"
                                            />
                                            {seller.rating.toFixed(1)}
                                          </span>
                                          <span>•</span>
                                        </>
                                      )}
                                      <span>
                                        {seller.productCount || 0} products
                                      </span>
                                      {seller.joinDate && (
                                        <>
                                          <span>•</span>
                                          <span className="text-gray-400">
                                            Joined{" "}
                                            {new Date(
                                              seller.joinDate
                                            ).toLocaleDateString()}
                                          </span>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 italic">
                            No sellers available in this area
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};
