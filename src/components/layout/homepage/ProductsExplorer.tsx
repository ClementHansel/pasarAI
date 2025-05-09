// src/components/layout/homepage/ProductsExplorer.tsx
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useProductFilter } from "@/context/ProductCategoryContext";
// import SearchBox from "./header/SearchBox";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";
// import { useSearch } from "@/context/SearchContext";
import { Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 8;

type Tab = "all" | "featured" | "topRated" | "recent";

export default function ProductsExplorer() {
  const { category, market, setMarket } = useProductFilter();
  const [tab] = useState<Tab>("all");
  // const [search, setSearch] = useState<string>("");
  // const { submitSearch } = useSearch();
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Build query string for API
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(ITEMS_PER_PAGE));
    // if (search) params.append("search", search);
    if (category) params.append("categoryId", category);
    if (market) params.append("marketType", market);
    if (tab === "featured") params.append("sortByTags", "onSale");
    if (tab === "topRated") params.append("sortByTags", "bestSeller");
    if (tab === "recent") params.append("sortByTags", "newArrival");
    return params.toString();
  }, [category, market, tab, page]);

  // Fetch from API
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/products?${queryString}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then(({ products: fetched, pagination }) => {
        setProducts(fetched);
        setTotalPages(pagination.totalPages);
      })
      .catch((err) => {
        console.error("Product fetch error:", err);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [queryString]);

  const handleLoadMore = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  // const handleTabClick = (t: Tab) => {
  //   setTab(t);
  //   setPage(1);
  // };

  const handleMarketChange = (m: "domestic" | "global") => {
    setMarket(m);
    setPage(1);
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
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-2" />
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600 mb-2">Failed to load products</p>
        <p className="text-gray-600 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Explore Products
      </h2>

      {/* Market Type Buttons */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => handleMarketChange("domestic")}
            className={`px-6 py-2 rounded-md transition ${
              market === "domestic"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            Domestic
          </button>
          <button
            onClick={() => handleMarketChange("global")}
            className={`px-6 py-2 rounded-md transition ${
              market === "global"
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            International
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            id={p.id}
            name={p.name}
            price={p.price}
            description={p.description}
            imageUrl={p.imageUrls?.[0] || "/images/placeholder-product.png"}
            rating={p.rating}
            labels={p.labels}
            discount={p.discount}
            badgeText={deriveBadge(p)}
            marketType={p.marketType as "domestic" | "global"}
            currency={p.currency || "IDR"}
          />
        ))}
      </div>

      {/* Pagination */}
      {products.length > 0 && page < totalPages && (
        <div className="flex justify-center mt-10">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load More Products
          </button>
        </div>
      )}

      {/* Empty State */}
      {products.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-xl text-gray-600 mb-2">No products found</p>
          <p className="text-gray-500 text-sm">
            Try adjusting your filters or search terms
          </p>
        </div>
      )}
    </section>
  );
}
