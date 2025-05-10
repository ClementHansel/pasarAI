// src/components/layout/homepage/MarketPage.tsx
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { LocationFilter } from "@/components/market/LocationFilter";
import { MarketListView } from "@/components/market/MarketListView";
import { MarketComparison } from "@/components/market/MarketComparison";
import { BarChart2, Filter, Home, Globe, RefreshCw, X } from "lucide-react";
import type { MarketRegion, MarketType } from "@/types/market";

const MarketPage = () => {
  const [marketType, setMarketType] = useState<MarketType>("domestic");
  const [showComparison, setShowComparison] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState({
    region: "",
    subRegion: "",
    city: "",
  });
  const [marketData, setMarketData] = useState<MarketRegion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from API
  const fetchMarketData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        type: marketType, // Include marketType in the API request
        ...(filters.region && { region: filters.region }),
        ...(filters.subRegion && { subRegion: filters.subRegion }),
        ...(filters.city && { city: filters.city }),
      });

      const response = await fetch(`/api/markets?${params.toString()}`);
      if (!response.ok)
        throw new Error(`Failed to load market data (HTTP ${response.status})`);

      const data = await response.json();
      if (data.success) {
        setMarketData(data.data);
      } else {
        setError("No market data returned");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      console.error("Market fetch error:", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [marketType, filters]);

  // Initial load and refresh when filters change
  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  // Reset filters
  const resetFilters = () => {
    setFilters({ region: "", subRegion: "", city: "" });
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
        <p className="ml-3 text-gray-500">Loading market data...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500 bg-red-50 rounded-xl p-6">
        <p className="mb-4">Error: {error}</p>
        <button
          onClick={fetchMarketData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Market Explorer
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Connect with sellers across{" "}
          {marketType === "domestic" ? "local" : "International"} markets. Find
          verified sellers and compare opportunities.
        </p>
      </header>

      {/* Market Type Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-2xl inline-flex gap-2">
          {["domestic", "global"].map((type: MarketType) => (
            <button
              key={type}
              onClick={() => {
                setMarketType(type);
                resetFilters();
              }}
              className={cn(
                "flex items-center px-8 py-3 rounded-xl transition-all",
                marketType === type
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-gray-500 hover:bg-gray-50"
              )}
            >
              {type === "domestic" ? (
                <Home className="mr-2 h-5 w-5" />
              ) : (
                <Globe className="mr-2 h-5 w-5" />
              )}
              <span className="font-semibold">
                {type === "domestic"
                  ? "Domestic Markets"
                  : "International Markets"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-2xl shadow-lg mb-6 p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="w-full md:w-1/3">
            {/* <MarketFilter
              onFilter={(query) => {
                setSearchQuery(query);
              }}
              placeholder={`Search ${
                marketType === "domestic" ? "local" : "global"
              } markets...`}
            /> */}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl"
              aria-label="Filters"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>

            <div className="hidden md:flex items-center gap-4">
              <LocationFilter
                marketType={marketType}
                markets={marketData}
                selectedFilters={filters}
                onFilterChange={setFilters}
              />

              {(filters.region || filters.subRegion || filters.city) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl"
                >
                  <RefreshCw size={16} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <button
              onClick={() => setShowComparison(!showComparison)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors",
                showComparison
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              )}
            >
              <BarChart2 size={18} />
              <span>Compare</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div className="md:hidden bg-white rounded-2xl shadow-lg mb-6 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button
              onClick={() => setShowMobileFilters(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close filters"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <LocationFilter
              marketType={marketType}
              markets={marketData}
              selectedFilters={filters}
              onFilterChange={setFilters}
              isMobile={true}
            />

            <button
              onClick={resetFilters}
              className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100"
              aria-label="Reset filters"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Market Comparison */}
      {showComparison && (
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="bg-blue-50 p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Market Comparison</h2>
            <button
              onClick={() => setShowComparison(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close comparison"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            <MarketComparison
              marketType={marketType as "domestic" | "global"}
            />
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {marketType === "domestic" ? "Local" : "International"} Sellers
            <span className="text-gray-500 ml-2 text-lg">
              (
              {marketData.reduce(
                (acc, region) => acc + region.sellers.length,
                0
              )}{" "}
              results)
            </span>
          </h2>
        </div>

        {/* Market List */}
        <MarketListView
          type={marketType as "domestic" | "global"}
          regions={marketData.map((region) => ({
            ...region,
            location: region.location,
          }))}
        />
      </div>
    </div>
  );
};

export default MarketPage;
