// src/components/layout/homepage/MarketsExplorer.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Loader2, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface Seller {
  id: string;
  name: string;
  role?: string;
  currency?: string;
  rating?: number;
  productCount?: number;
  joinDate?: string;
  verified?: boolean;
  location?: string;
}

interface City {
  id: string;
  name: string;
  sellers: Seller[];
}

interface SubRegion {
  id: string;
  name: string;
  cities: City[];
  sellers: Seller[];
}

interface MarketRegion {
  id: string;
  name: string;
  region: string;
  subRegions: SubRegion[];
  sellers: Seller[];
}

interface ApiResponse {
  success: boolean;
  data: MarketRegion[];
}

export default function MarketsExplorer() {
  const router = useRouter();
  const [domesticMarkets, setDomesticMarkets] = useState<MarketRegion[]>([]);
  const [internationalMarkets, setInternationalMarkets] = useState<
    MarketRegion[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"domestic" | "international">(
    "domestic"
  );

  // Pagination states
  const [visibleDomesticCount, setVisibleDomesticCount] = useState(3);
  const [visibleInternationalCount, setVisibleInternationalCount] = useState(3);

  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [domesticResponse, internationalResponse] = await Promise.all([
          fetch("/api/markets?type=domestic"),
          fetch("/api/markets?type=global"),
        ]);

        if (!domesticResponse.ok || !internationalResponse.ok) {
          throw new Error("Failed to fetch market data");
        }

        const domesticData: ApiResponse = await domesticResponse.json();
        const internationalData: ApiResponse =
          await internationalResponse.json();

        setDomesticMarkets(domesticData.success ? domesticData.data : []);
        setInternationalMarkets(
          internationalData.success ? internationalData.data : []
        );
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch market data"
        );
        console.error("Market fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const loadMoreDomestic = () => {
    setVisibleDomesticCount((prev) =>
      Math.min(prev + 3, domesticMarkets.length)
    );
  };

  const loadMoreInternational = () => {
    setVisibleInternationalCount((prev) =>
      Math.min(prev + 3, internationalMarkets.length)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="flex flex-col items-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
          <p className="text-gray-600">Loading market data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600 mb-2">Unable to load market data</p>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  if (domesticMarkets.length === 0 && internationalMarkets.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">No market data available at this time.</p>
      </div>
    );
  }

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Our Markets
      </h2>

      {/* Tabs for Domestic / International */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("domestic")}
            className={`px-6 py-2 rounded-md transition ${
              activeTab === "domestic"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Domestic Markets
          </button>
          <button
            onClick={() => setActiveTab("international")}
            className={`px-6 py-2 rounded-md transition ${
              activeTab === "international"
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            International Markets
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {activeTab === "domestic" ? (
          <>
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-2xl font-semibold text-blue-600 text-center">
                Domestic Markets
              </h3>
            </div>
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {domesticMarkets.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No domestic markets available at this time.
                </p>
              ) : (
                <div className="space-y-8">
                  {domesticMarkets
                    .slice(0, visibleDomesticCount)
                    .map((region) => (
                      <div
                        key={region.id}
                        className="border rounded-lg p-4 shadow-sm"
                      >
                        <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                          <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                          {region.name || "Unnamed Region"}
                        </h4>

                        {region.subRegions.length > 0 ? (
                          <div className="space-y-6">
                            {region.subRegions.map((subRegion) => (
                              <div
                                key={subRegion.id}
                                className="border-l-2 border-blue-200 pl-4"
                              >
                                <h5 className="text-lg font-semibold text-gray-700 mb-2">
                                  {subRegion.name || "Unnamed Subregion"}
                                </h5>

                                {subRegion.cities.length > 0 ? (
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {subRegion.cities.map((city) => (
                                      <div
                                        key={city.id}
                                        className="bg-gray-50 rounded-md p-3"
                                      >
                                        <h6 className="font-medium text-gray-800 mb-2 border-b pb-1">
                                          {city.name || "Unnamed City"}
                                        </h6>

                                        {city.sellers.length > 0 ? (
                                          <ul className="space-y-1 text-sm">
                                            {city.sellers.map((seller) => (
                                              <li
                                                key={seller.id}
                                                className="flex items-center justify-between cursor-pointer hover:text-blue-600"
                                                onClick={() =>
                                                  router.push(
                                                    `/profile/${seller.id}`
                                                  )
                                                }
                                              >
                                                <span>{seller.name}</span>
                                                {seller.verified && (
                                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                                    Verified
                                                  </span>
                                                )}
                                              </li>
                                            ))}
                                          </ul>
                                        ) : (
                                          <p className="text-gray-500 text-sm">
                                            No sellers in this city
                                          </p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-gray-500 text-sm">
                                    No cities available
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center">
                            No sub-regions available
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {visibleDomesticCount < domesticMarkets.length && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 text-center">
                <button
                  onClick={loadMoreDomestic}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Load More Domestic Markets
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-2xl font-semibold text-indigo-600 text-center">
                International Markets
              </h3>
            </div>
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {internationalMarkets.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No international markets available at this time.
                </p>
              ) : (
                <div className="space-y-8">
                  {internationalMarkets
                    .slice(0, visibleInternationalCount)
                    .map((region) => (
                      <div
                        key={region.id}
                        className="border rounded-lg p-4 shadow-sm"
                      >
                        <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                          <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
                          {region.name || "Unnamed Region"}
                        </h4>

                        {region.subRegions.length > 0 ? (
                          <div className="space-y-6">
                            {region.subRegions.map((subRegion) => (
                              <div
                                key={subRegion.id}
                                className="border-l-2 border-indigo-200 pl-4"
                              >
                                <h5 className="text-lg font-semibold text-gray-700 mb-2">
                                  {subRegion.name || "Unnamed Subregion"}
                                </h5>

                                {subRegion.cities.length > 0 ? (
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {subRegion.cities.map((city) => (
                                      <div
                                        key={city.id}
                                        className="bg-gray-50 rounded-md p-3"
                                      >
                                        <h6 className="font-medium text-gray-800 mb-2 border-b pb-1">
                                          {city.name || "Unnamed City"}
                                        </h6>

                                        {city.sellers.length > 0 ? (
                                          <ul className="space-y-1 text-sm">
                                            {city.sellers.map((seller) => (
                                              <li
                                                key={seller.id}
                                                className="flex items-center justify-between cursor-pointer hover:text-indigo-600"
                                                onClick={() =>
                                                  router.push(
                                                    `/profile/${seller.id}`
                                                  )
                                                }
                                              >
                                                <span>{seller.name}</span>
                                                {seller.verified && (
                                                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                                    Verified
                                                  </span>
                                                )}
                                              </li>
                                            ))}
                                          </ul>
                                        ) : (
                                          <p className="text-gray-500 text-sm">
                                            No sellers in this city
                                          </p>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-gray-500 text-sm">
                                    No cities available
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-500 text-center">
                            No sub-regions available
                          </p>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>

            {visibleInternationalCount < internationalMarkets.length && (
              <div className="p-6 border-t border-gray-100 bg-gray-50 text-center">
                <button
                  onClick={loadMoreInternational}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Load More International Markets
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
