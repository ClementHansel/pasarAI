"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Product, ProductType } from "@/types/product";
import type { ProductFilterInput } from "@/types/product";
import ProductFilter from "@/components/product/ProductFilter";
import { LocationFilter } from "@/components/market/LocationFilter";
import ProductCategory from "@/components/product/ProductCategory";
import { Home, Globe, RefreshCw, Grid, List, Sliders, X } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import type { CartState } from "@/lib/cartStore";

const ProductPage = () => {
  const addItem = useCartStore((state: CartState) => state.addItem);

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<ProductFilterInput>({});
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const prevFiltersRef = useRef<ProductFilterInput | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const url = new URL("/api/products", window.location.origin);
      if (filters.marketType)
        url.searchParams.set("market", filters.marketType);
      if (filters.city) url.searchParams.set("city", filters.city);
      if (filters.region) url.searchParams.set("province", filters.region);
      if (filters.region && filters.marketType === "global")
        url.searchParams.set("country", filters.region);
      if (filters.categoryId)
        url.searchParams.set("categoryId", filters.categoryId);
      if (filters.search) url.searchParams.set("search", filters.search);
      if (filters.minPrice !== undefined)
        url.searchParams.set("minPrice", String(filters.minPrice));
      if (filters.maxPrice !== undefined)
        url.searchParams.set("maxPrice", String(filters.maxPrice));
      if (filters.inStock !== undefined)
        url.searchParams.set("inStock", String(filters.inStock));
      if (filters.sortBy) url.searchParams.set("sortBy", filters.sortBy);
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status}`);
      }
      const data = await res.json();
      setFilteredProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [filters]);

  useEffect(() => {
    const prev = prevFiltersRef.current;
    if (JSON.stringify(prev) !== JSON.stringify(filters)) {
      prevFiltersRef.current = filters;
      fetchProducts(); // Only fetch if filters changed
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = useCallback((newFilters: ProductFilterInput) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    if (typeof newFilters.search === "string")
      setSearchInput(newFilters.search);
  }, []);

  const handleViewChange = useCallback((value: "list" | "grid") => {
    setViewMode(value);
  }, []);

  const toggleProductType = useCallback((type: ProductType) => {
    setFilters((prev) => ({ ...prev, marketType: type }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  const handleLocationFilterChange = useCallback(
    (type: "region" | "subRegion" | "city", value: string) => {
      setFilters((prev) => ({ ...prev, [type]: value }));
    },
    []
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      addItem({
        productId: product.id,
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        discountedPrice: product.originalPrice ?? 0,
        quantity: 1,
        image: product.imageUrls[0],
        marketId: product.marketId,
        marketName: product.location?.region ?? product.marketId,
      });
    },
    [addItem]
  );

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Product Marketplace
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Discover local and global products. Filter by category, search items,
          and find the best deals.
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
                filters.marketType === type
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
              value={{ ...filters, search: searchInput }}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <LocationFilter
              marketType={filters.marketType || "domestic"}
              markets={[] /* Replace with actual data fetching/state */}
              selectedFilters={{
                region: filters.region || "",
                subRegion: filters.subregion || "",
                city: filters.city || "",
              }}
              onFilterChange={handleLocationFilterChange}
              isMobile={false} // Explicitly set isMobile for desktop
            />
            <div className="hidden md:flex items-center gap-4">
              {(filters.search || filters.categoryId || filters.region) && (
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
              value={{ ...filters, search: searchInput }}
              onFilterChange={handleFilterChange}
            />
            <LocationFilter
              marketType={filters.marketType || "domestic"}
              markets={filters.marketType === "domestic" ? [] : []}
              selectedFilters={{
                region: filters.region || "",
                subRegion: filters.subregion || "",
                city: filters.city || "",
              }}
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
            {filters.marketType === "domestic" ? "Local" : "Global"} Products
          </h2>

          <div className="flex items-center gap-3 text-sm text-gray-500">
            <Sliders size={18} />
            <span>{viewMode === "grid" ? "Grid" : "List"} View</span>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <button
                onClick={() => handleViewChange("grid")}
                className={`flex items-center gap-1 px-2 py-1 rounded hover:text-black transition ${
                  viewMode === "grid" ? "text-black font-semibold" : ""
                }`}
              >
                <Grid size={18} />
                <span>Grid</span>
              </button>

              <span className="text-gray-300">|</span>

              <button
                onClick={() => handleViewChange("list")}
                className={`flex items-center gap-1 px-2 py-1 rounded hover:text-black transition ${
                  viewMode === "list" ? "text-black font-semibold" : ""
                }`}
              >
                <List size={18} />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>

        <ProductCategory
          type={filters.marketType || "domestic"}
          searchTerm={filters.search || ""}
          categoryFilter={filters.categoryId || ""}
          viewMode={viewMode}
          selectedFilters={filters}
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default ProductPage;
