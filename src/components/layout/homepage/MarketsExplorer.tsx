// src/components/layout/homepage/MarketsExplorer.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

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
  region: string; // kept for backward compatibility
  subRegions: SubRegion[];
  sellers: Seller[];
  countryCode?: string;
  marketType?: "domestic" | "global";
  location?: string;
}

interface ApiResponse {
  success: boolean;
  data: MarketRegion[];
}

export default function MarketsExplorer() {
  const [domesticMarkets, setDomesticMarkets] = useState<MarketRegion[]>([]);
  const [internationalMarkets, setInternationalMarkets] = useState<
    MarketRegion[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"domestic" | "global">("domestic");

  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/markets");
        if (!response.ok) {
          throw new Error("Failed to fetch market data");
        }

        const data: ApiResponse = await response.json();
        if (data.success) {
          setDomesticMarkets(
            data.data.filter((market) => market.marketType === "domestic")
          );
          setInternationalMarkets(
            data.data.filter((market) => market.marketType === "global")
          );
        } else {
          setError("No market data returned");
        }
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
            onClick={() => setActiveTab("global")}
            className={`px-6 py-2 rounded-md transition ${
              activeTab === "global"
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
          <div className="p-6">
            {domesticMarkets.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No domestic markets available at this time.
              </p>
            ) : (
              <ul>
                {domesticMarkets.map((market) => (
                  <li key={market.id} className="mb-4">
                    <h3 className="text-lg font-semibold">
                      {market.name} ({market.location})
                    </h3>
                    <p>{market.region}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="p-6">
            {internationalMarkets.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No international markets available at this time.
              </p>
            ) : (
              <ul>
                {internationalMarkets.map((market) => (
                  <li key={market.id} className="mb-4">
                    <h3 className="text-lg font-semibold">
                      {market.name} ({market.location})
                    </h3>
                    <p>{market.region}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
