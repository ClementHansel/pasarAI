// src/app/product/page.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useProductFilter } from "@/context/ProductCategoryContext";
import type { Product } from "@/types/product";
import { useSearch } from "@/context/SearchContext";
import { Loader2 } from "lucide-react";
import SearchBox from "@/components/layout/homepage/header/SearchBox";
import ProductCard from "@/components/product/ProductCard";

// Define a local MarketType enum to match the Prisma schema
// enum MarketType {
//   Domestic = "domestic",
//   Global = "global",
// }

const ITEMS_PER_PAGE = 8;

type Tab = "all" | "featured" | "topRated" | "recent";

// Update the getMarketDisplay function to map backend values to frontend labels
// function getMarketDisplay(marketType: MarketType): string {
//   switch (marketType) {
//     case MarketType.Domestic:
//       return "Domestic";
//     case MarketType.Global:
//       return "International";
//     default:
//       return "Unknown";
//   }
// }

export default function ProductPage() {
  const { category } = useProductFilter();
  const [tab] = useState<Tab>("all");
  const [search, setSearch] = useState<string>("");
  const { submitSearch } = useSearch();
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMarketType, setSelectedMarketType] = useState<
    "all" | "domestic" | "global"
  >("all"); // Track selected market type

  // Function to handle filtering by market type
  const handleViewProductsByMarket = (marketType: "domestic" | "global") => {
    setSelectedMarketType(marketType);
  };

  // Filter products based on selected market type
  const filteredProducts = useMemo(() => {
    if (selectedMarketType === "all") return products;
    return products.filter(
      (product) => product.market?.marketType === selectedMarketType
    );
  }, [products, selectedMarketType]);

  // Build query string for API
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(ITEMS_PER_PAGE));

    if (search) params.append("search", search);
    if (category) params.append("categoryId", category);

    // Sort by tags
    if (tab === "featured") params.append("sortByTags", "onSale");
    if (tab === "topRated") params.append("sortByTags", "bestSeller");
    if (tab === "recent") params.append("sortByTags", "newArrival");

    return params.toString();
  }, [search, category, tab, page]);

  // Fetch products from API
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/products?${queryString}`)
      .then((res) => {
        if (!res.ok)
          throw new Error(`Failed to fetch products (HTTP ${res.status})`);
        return res.json();
      })
      .then(({ products }) => {
        setProducts(products);
        setTotalPages(Math.ceil(products.length / ITEMS_PER_PAGE));
      })
      .catch((err) => {
        console.error("Product fetch error:", err);
        setError("Failed to load products");
      })
      .finally(() => setLoading(false));
  }, [queryString]);

  const handleLoadMore = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const deriveBadge = (p: Product) => {
    if (p.isNewArrival) return "New Arrival";
    if (p.isBestSeller) return "Best Seller";
    if (p.isOnSale) return "On Sale";
    if (p.isFeatured) return "Featured";
    return undefined;
  };

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-gray-600 ml-3">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600 mb-2">Failed to load products</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Product Marketplace
      </h2>

      {/* Market Type Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleViewProductsByMarket("domestic")}
            className={`px-6 py-2 rounded-md transition ${
              selectedMarketType === "domestic"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Domestic
          </button>
          <button
            onClick={() => handleViewProductsByMarket("global")}
            className={`px-6 py-2 rounded-md transition ${
              selectedMarketType === "global"
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            International
          </button>
          <button
            onClick={() => handleViewProductsByMarket("all")}
            className={`px-6 py-2 rounded-md transition ${
              selectedMarketType === "all"
                ? "bg-gray-300 text-gray-800"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white rounded-xl shadow-lg mb-6 p-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div className="w-full md:w-1/2">
            <SearchBox
              value={search}
              onChange={(value) => {
                setSearch(value);
                setPage(1);
              }}
              onSubmit={submitSearch}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h3 className="text-2xl font-bold text-gray-800">
            {selectedMarketType === "all"
              ? "All Products"
              : selectedMarketType === "domestic"
              ? "Domestic Products"
              : "International Products"}
          </h3>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span>{filteredProducts.length} products found</span>
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl">
              No products found matching your criteria
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                badgeText={deriveBadge(product)}
                marketType={product.market?.marketType || "domestic"}
                currency={product.currency || "IDR"}
                onViewProducts={handleViewProductsByMarket} // Pass the callback
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredProducts.length > 0 && page < totalPages && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Load More Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
