// src/app/market/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Home,
  Globe,
  Filter,
  BarChart2,
  RefreshCw,
  X,
  Grid,
  List,
  Sliders,
} from "lucide-react";
import { MarketCategory } from "@/components/market/MarketCategory";
import { MarketFilter } from "@/components/market/MarketFilter";
import { MarketComparison } from "@/components/market/MarketComparison";
import { LocationFilter } from "@/components/market/LocationFilter";
import {
  City,
  MarketRegion,
  MarketType,
  MarketWithRelations,
  Seller,
  Subregion,
} from "@/types/market";
import { cn } from "@/lib/utils";

const MarketPage = () => {
  const [marketType, setMarketType] = useState<MarketType>("domestic");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showComparison, setShowComparison] = useState(false);
  const [filters, setFilters] = useState({
    region: "",
    subregion: "",
    city: "",
  });
  const [filteredData, setFilteredData] = useState<MarketRegion[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allMarketData, setAllMarketData] = useState<MarketRegion[]>([]);

  useEffect(() => {
    const fetchMarkets = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/markets");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && data.data) {
          const structuredData = transformMarket(data.data, marketType); // fixed function name
          setAllMarketData(structuredData);
        } else {
          setError("Failed to fetch market data.");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error fetching markets:", error);
          setError("Failed to fetch market data.");
        } else {
          // Handle cases where error is not an instance of Error
          console.error("Unknown error:", error);
          setError("Failed to fetch market data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarkets();
  }, [marketType]);

  useEffect(() => {
    if (!allMarketData.length) return; // fixed typo

    let data = allMarketData.filter(
      (region) =>
        region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        region.subregions.some(
          (sub) =>
            sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.cities.some(
              (city) =>
                city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                city.sellers.some((seller) =>
                  seller.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            )
        )
    );

    if (filters.region) {
      data = data.filter((region) => region.name === filters.region); // fixed wrong var
    }

    if (filters.subregion) {
      data = data
        .map((region) => ({
          ...region,
          subregions: region.subregions.filter(
            (sub) => sub.name === filters.subregion
          ),
        }))
        .filter((region) => region.subregions.length > 0);
    }

    if (filters.city) {
      data = data
        .map((region) => ({
          ...region,
          subregions: region.subregions
            .map((sub) => ({
              ...sub,
              cities: sub.cities.filter((city) => city.name === filters.city),
            }))
            .filter((sub) => sub.cities.length > 0),
        }))
        .filter((region) => region.subregions.length > 0);
    }

    setFilteredData(data);
  }, [allMarketData, filters, searchQuery]);

  const transformMarket = (
    backendData: MarketWithRelations[], // Use MarketWithRelations type to match the backend data
    type: MarketType
  ): MarketRegion[] => {
    if (type === "domestic") {
      return backendData
        .filter((market) => market.marketType === "domestic")
        .map((market) => ({
          id: market.id.toString(),
          name: market.location,
          region: market.region?.name ?? "Unknown Region",
          subregions: mapSubregions(market), // Handle subregions
          sellers: mapSellers(market), // Top-level sellers
        }));
    } else {
      return backendData
        .filter((market) => market.marketType === "global")
        .map((market) => ({
          id: market.id.toString(),
          name: market.location,
          region: market.region?.name ?? "Unknown Region",
          subregions: mapSubregions(market),
          sellers: mapSellers(market),
        }));
    }
  };

  // Helper function to map subregions (handle multiple subregions)
  const mapSubregions = (market: MarketWithRelations): Subregion[] => {
    if (market.subregion) {
      return [
        {
          id: market.subregion.id,
          name: market.subregion.name ?? "Unknown Subregion",
          cities: mapCities(market),
          sellers: mapSellers(market),
        },
      ];
    }
    return [];
  };

  // Helper function to map cities (handle multiple cities)
  const mapCities = (market: MarketWithRelations): City[] => {
    if (market.city) {
      return [
        {
          id: market.city.id,
          name: market.city.name ?? "Unknown City",
          sellers: mapSellers(market),
        },
      ];
    }
    return [];
  };

  // Helper function to map sellers (handle sellers within regions, subregions, and cities)
  const mapSellers = (market: MarketWithRelations): Seller[] => {
    return market.sellers.map((seller) => ({
      id: seller.id,
      name: seller.name,
      role: seller.role,
      currency: seller.currency ?? "Unknown Currency", // Ensure the currency field exists
    }));
  };

  const toggleMarketType = (type: MarketType) => {
    setMarketType(type);
    setFilters({ region: "", subregion: "", city: "" });
    setSearchQuery("");
  };

  const handleFilterChange = (
    filterType: "region" | "subregion" | "city",
    value: string
  ) => {
    if (filterType === "region") {
      setFilters({ region: value, subregion: "", city: "" });
    } else if (filterType === "subregion") {
      setFilters({ ...filters, subregion: value, city: "" });
    } else {
      setFilters({ ...filters, [filterType]: value });
    }
  };

  const resetFilters = () => {
    setFilters({ region: "", subregion: "", city: "" });
    setSearchQuery("");
  };

  if (isLoading) {
    return <div>Loading market data...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Market Explorer
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Connect with sellers across{" "}
          {marketType === "domestic" ? "local" : "global"} markets. Filter by
          location, compare markets, and find the best opportunities.
        </p>
      </header>

      {/* Market Type Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-2xl inline-flex gap-2">
          {["domestic", "global"].map((type) => (
            <button
              key={type}
              onClick={() => toggleMarketType(type as MarketType)}
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
                {type === "domestic" ? "Domestic (IDR)" : "Global (USD)"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-2xl shadow-lg mb-6 p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="w-full md:w-1/3">
            <MarketFilter
              onSearch={setSearchQuery}
              placeholder={`Search ${marketType} markets...`}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>

            <div className="hidden md:flex items-center gap-4">
              <LocationFilter
                marketType={marketType}
                markets={fetchMarkets(marketType)}
                selectedFilters={filters}
                onFilterChange={handleFilterChange}
              />

              {(filters.region || filters.subregion || filters.city) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl"
                >
                  <RefreshCw size={16} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            <div className="hidden md:flex items-center bg-gray-100 rounded-xl p-1 gap-1">
              {["grid", "list"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as "grid" | "list")}
                  className={cn(
                    "p-2 rounded-lg",
                    viewMode === mode && "bg-white shadow-sm"
                  )}
                >
                  {mode === "grid" ? <Grid size={18} /> : <List size={18} />}
                </button>
              ))}
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
              aria-label="Show mobile filters"
            >
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4">
            <LocationFilter
              marketType={marketType}
              markets={fetchMarkets(marketType)}
              selectedFilters={filters}
              onFilterChange={handleFilterChange}
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

      {/* Comparison Section */}
      {showComparison && (
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden">
          <div className="bg-blue-50 p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Market Comparison</h2>
            <button
              onClick={() => setShowComparison(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Show Comparison"
            >
              <X size={24} />
            </button>
          </div>
          <div className="p-6">
            <MarketComparison marketType={marketType} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {marketType === "domestic" ? "Local" : "Global"} Sellers
            <span className="text-gray-500 ml-2 text-lg">
              (
              {filteredData.reduce(
                (acc, region) =>
                  acc +
                  region.subregions.reduce(
                    (subAcc, sub) =>
                      subAcc +
                      sub.cities.reduce(
                        (cityAcc, city) => cityAcc + city.sellers.length,
                        0
                      ),
                    0
                  ),
                0
              )}{" "}
              results)
            </span>
          </h2>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Sliders size={18} />
            <span>{viewMode === "grid" ? "Grid" : "List"} View</span>
          </div>
        </div>

        <MarketCategory
          type={marketType}
          regions={filteredData}
          viewMode={viewMode}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default MarketPage;
