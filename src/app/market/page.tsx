import { useState, useEffect, useCallback } from "react";
import { Spinner } from "react-bootstrap";
import { MarketCategory } from "@/components/market/MarketCategory";
import { MarketFilter } from "@/components/market/MarketFilter";
import { MarketComparison } from "@/components/market/MarketComparison";
import { LocationFilter } from "@/components/market/LocationFilter";
import { City, MarketRegion, MarketType, SubRegion } from "@/types/market";
import { cn } from "@/lib/utils";
import {
  BarChart2,
  Filter,
  Globe,
  Grid,
  Home,
  List,
  RefreshCw,
  Sliders,
  X,
} from "lucide-react";

const MarketPage = () => {
  const [marketType, setMarketType] = useState<MarketType>("domestic");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showComparison, setShowComparison] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    region: "",
    subRegion: "",
    city: "",
  });

  const [marketData, setMarketData] = useState<MarketRegion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        type: marketType,
        search: searchQuery,
        region: filters.region,
        subRegion: filters.subRegion,
        city: filters.city,
      });

      const response = await fetch(`/api/markets?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.data) {
        setMarketData(data.data);
      } else {
        setError("Failed to load market data.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [marketType, searchQuery, filters]);

  useEffect(() => {
    fetchMarketData();
  }, [fetchMarketData]);

  const handleFilterChange = (
    filterType: keyof typeof filters,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
      ...(filterType === "region" && { subRegion: "", city: "" }),
      ...(filterType === "subRegion" && { city: "" }),
    }));
  };

  const resetFilters = () => {
    setFilters({ region: "", subRegion: "", city: "" });
    setSearchQuery("");
  };

  const handleMarketTypeChange = (type: MarketType) => {
    setMarketType(type);
    resetFilters();
  };

  const sellerCount = marketData.reduce(
    (account: number, region: MarketRegion) =>
      account +
      region.subRegions.reduce(
        (subRegionAccount: number, subRegion: SubRegion) =>
          subRegionAccount +
          subRegion.cities.reduce(
            (cityAccount: number, city: City) =>
              cityAccount + city.sellers.length,
            0
          ),
        0
      ),
    0
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner />
        <p className="ml-4 text-gray-500">Loading market data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-red-500">
        <p>Error: {error}</p>
        <button
          onClick={fetchMarketData}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );
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
              onClick={() => handleMarketTypeChange(type as MarketType)}
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
                markets={marketData}
                selectedFilters={filters}
                onFilterChange={handleFilterChange}
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
              markets={marketData}
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
              ({sellerCount} results)
            </span>
          </h2>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Sliders size={18} />
            <span>{viewMode === "grid" ? "Grid" : "List"} View</span>
          </div>
        </div>

        <MarketCategory
          type={marketType}
          regions={marketData}
          viewMode={viewMode}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default MarketPage;
