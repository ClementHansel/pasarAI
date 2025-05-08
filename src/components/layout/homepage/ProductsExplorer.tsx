// src/components/layout/homepage/ProductsExplorer.tsx
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useProductFilter } from "@/context/ProductCategoryContext";
import SearchBox from "./header/SearchBox";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";
import { useSearch } from "@/context/SearchContext";

const ITEMS_PER_PAGE = 8;
type Tab = "all" | "featured" | "topRated" | "recent";

interface ApiResponse {
  products: Product[];
  pagination: {
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export default function ProductsExplorer() {
  const { category, market, setMarket } = useProductFilter();
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState<string>("");
  const { submitSearch } = useSearch();
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Build query string with page & limit
  const queryString = useMemo(() => {
    const params = new URLSearchParams();
    params.append("page", String(page));
    params.append("limit", String(ITEMS_PER_PAGE));
    if (search) params.append("search", search);
    if (category) params.append("categoryId", category);
    if (market) params.append("market", market);
    if (tab === "featured") params.append("sortByTags", "featured");
    if (tab === "topRated") params.append("sortByTags", "bestSeller");
    if (tab === "recent") params.append("sortByTags", "newArrival");
    return params.toString();
  }, [search, category, market, tab, page]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products?${queryString}`)
      .then((res) => res.json() as Promise<ApiResponse>)
      .then(({ products: list, pagination }) => {
        setProducts(list);
        if (pagination?.totalPages) setTotalPages(pagination.totalPages);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [queryString]);

  // Handlers
  const handleLoadMore = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  const handleTabClick = (t: Tab) => {
    setTab(t);
    setPage(1);
  };

  // derive badgeText
  const deriveBadge = (p: Product): string | undefined => {
    if (p.isNewArrival) return "New";
    if (p.isBestSeller) return "Bestseller";
    if (p.isOnSale) return "Sale";
    return undefined;
  };

  return (
    <section className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <SearchBox
              value={search}
              onChange={(v) => {
                setSearch(v);
                setPage(1);
              }}
              onSubmit={submitSearch}
            />

            <div className="flex gap-2">
              {(["domestic", "global"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMarket(m);
                    setPage(1);
                  }}
                  className={`px-3 py-1 rounded-full text-sm ${
                    market === m
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {m === "domestic" ? "Domestic" : "International"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-100">
          <div className="flex gap-6 px-6">
            {(["all", "featured", "topRated", "recent"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => handleTabClick(t)}
                className={`pb-2 whitespace-nowrap ${
                  tab === t
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500"
                }`}
              >
                {
                  {
                    all: "All Products",
                    featured: "Featured",
                    topRated: "Top Rated",
                    recent: "Recent",
                  }[t]
                }
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 p-6 overflow-y-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-200 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : products?.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products?.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  description={p.description}
                  imageUrl={p.imageUrls?.[0] || "/images/placeholder.png"}
                  rating={p.rating}
                  labels={p.labels}
                  discount={p.discount}
                  badgeText={deriveBadge(p)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Load More Button */}
        <div className="p-6 border-t border-gray-100 bg-gray-50">
          {page < totalPages && (
            <button
              onClick={handleLoadMore}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Load More (Page {page + 1} of {totalPages})
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
