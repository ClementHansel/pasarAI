"use client";

import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Product, ProductType } from "@/types/product";
import ProductFilter from "@/components/product/ProductFilter";
import { LocationFilter } from "@/components/market/LocationFilter";
import ProductCategory from "@/components/product/ProductCategory";
import { selectedFilters } from "@/types/market";
import { Home, Globe, RefreshCw, Grid, List, Sliders, X } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce"; // Assuming you have a useDebounce hook

const ProductPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [selectedFilters, setSelectedFilters] = useState<selectedFilters>({
    region: "",
    subregion: "",
    city: "",
  });

  const [productType, setProductType] = useState<ProductType>("domestic");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchProducts = useCallback(async () => {
    try {
      const url = new URL("/api/products", window.location.origin);

      url.searchParams.set("market", productType);
      if (selectedFilters.city)
        url.searchParams.set("city", selectedFilters.city);
      if (selectedFilters.region)
        url.searchParams.set("province", selectedFilters.region); // Assuming region maps to province
      if (selectedFilters.region && productType === "global")
        url.searchParams.set("country", selectedFilters.region); // Adjust mapping for global
      if (categoryFilter) url.searchParams.set("categoryId", categoryFilter);
      if (debouncedSearchTerm)
        url.searchParams.set("search", debouncedSearchTerm);

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }
      const data = await res.json();
      setFilteredProducts(data.products); // Or handle pagination data if needed
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error state (e.g., display an error message)
    }
  }, [
    productType,
    selectedFilters.city,
    selectedFilters.region,
    categoryFilter,
    debouncedSearchTerm,
    setFilteredProducts, // Added setProducts to the dependency array
  ]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };

  const handleViewChange = (value: "list" | "grid") => {
    setViewMode(value);
  };

  const handleLocationFilterChange = (
    type: "region" | "subregion" | "city",
    value: string
  ) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  const toggleProductType = (type: ProductType) => {
    setProductType(type);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setSelectedFilters({ region: "", subregion: "", city: "" });
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Product Marketplace
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Discover {productType === "domestic" ? "local" : "global"} products.
          Filter by category, search items, and find the best deals.
        </p>
      </header>

      {/* Product Type Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 p-1 rounded-2xl inline-flex gap-2">
          {["domestic", "global"].map((type) => (
            <button
              key={type}
              onClick={() => toggleProductType(type as ProductType)}
              className={cn(
                "flex items-center px-8 py-3 rounded-xl transition-all",
                productType === type
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
            <ProductFilter
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              onViewChange={handleViewChange}
              currentViewMode={viewMode}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <LocationFilter
              marketType={productType}
              markets={[] /* Replace with actual data fetching/state */}
              selectedFilters={selectedFilters}
              onFilterChange={handleLocationFilterChange}
              isMobile={false} // Explicitly set isMobile for desktop
            />
            <div className="hidden md:flex items-center gap-4">
              {(searchTerm || categoryFilter || selectedFilters.region) && (
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
          </div>
        </div>
      </div>

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
            <ProductFilter
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              onViewChange={handleViewChange}
              currentViewMode={viewMode}
            />
            <LocationFilter
              marketType={productType}
              markets={
                productType === "domestic" ? [] : [] // Replace with actual data
              }
              selectedFilters={selectedFilters}
              onFilterChange={handleLocationFilterChange}
              isMobile={true} // Explicitly set isMobile for mobile
            />
            <button
              onClick={resetFilters}
              className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="w-full py-2 px-4 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 flex items-center justify-center gap-2"
        >
          <Sliders size={18} />
          Show Filters
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {productType === "domestic" ? "Local" : "Global"} Products
          </h2>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Sliders size={18} />
            <span>{viewMode === "grid" ? "Grid" : "List"} View</span>
          </div>
        </div>

        <ProductCategory
          type={productType}
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          viewMode={viewMode}
          selectedFilters={selectedFilters}
          products={filteredProducts}
        />
      </div>
    </div>
  );
};
export default ProductPage;
