// src/components/layout/homepage/MarketsExplorer.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface Seller {
  id: string;
  name: string;
  verified?: boolean;
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
}
interface MarketRegion {
  id: string;
  name: string;
  subRegions: SubRegion[];
}

export default function MarketsExplorer() {
  const [domestic, setDomestic] = useState<MarketRegion[]>([]);
  const [international, setInternational] = useState<MarketRegion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [visibleDomesticCount, setVisibleDomesticCount] = useState(2); // Show 2 regions initially
  const [visibleInternationalCount, setVisibleInternationalCount] = useState(2);

  useEffect(() => {
    const fetchBoth = async () => {
      setLoading(true);
      setError(null);
      try {
        const [dRes, gRes] = await Promise.all([
          fetch(`/api/markets?type=domestic`),
          fetch(`/api/markets?type=global`),
        ]);
        if (!dRes.ok || !gRes.ok) throw new Error("Failed to fetch markets");
        const dJson = await dRes.json();
        const gJson = await gRes.json();
        setDomestic(dJson.data);
        setInternational(gJson.data);
      } catch (err) {
        setError((err as Error).message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchBoth();
  }, []);

  // Load more regions for each market
  const loadMoreDomestic = () => {
    setVisibleDomesticCount((prev) => Math.min(prev + 2, domestic.length));
  };

  const loadMoreInternational = () => {
    setVisibleInternationalCount((prev) =>
      Math.min(prev + 2, international.length)
    );
  };

  if (loading)
    return (
      <section className="py-16 flex justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </section>
    );
  if (error) return <p className="py-16 text-center text-red-600">{error}</p>;

  return (
    <section className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Our Markets
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Domestic Markets */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-2xl font-semibold text-blue-600 text-center">
              Domestic Markets
            </h3>
          </div>
          <div className="p-6 h-[520px] overflow-y-auto">
            {domestic.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No domestic markets.
              </p>
            ) : (
              <div className="space-y-8">
                {domestic.slice(0, visibleDomesticCount).map((region) => (
                  <div key={region.id}>
                    <h4 className="text-xl font-bold text-gray-700 mb-2 text-center">
                      {region.name}
                    </h4>
                    <div className="space-y-6 pl-4">
                      {region.subRegions.map((sub) => (
                        <div
                          key={sub.id}
                          className="border-l-2 border-gray-300 pl-4"
                        >
                          <h5 className="text-lg font-semibold text-gray-600 mb-1">
                            {sub.name}
                          </h5>
                          <ul className="list-disc list-inside space-y-1">
                            {sub.cities
                              .flatMap((c) => c.sellers)
                              .map((s) => (
                                <li
                                  key={s.id}
                                  className="flex items-center gap-2 text-gray-700"
                                >
                                  {s.name}
                                  {s.verified && (
                                    <span className="text-green-600">
                                      (Verified)
                                    </span>
                                  )}
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            {visibleDomesticCount < domestic.length && (
              <button
                onClick={loadMoreDomestic}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Load More Domestic Markets
              </button>
            )}
          </div>
        </div>

        {/* International Markets */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-2xl font-semibold text-indigo-600 text-center">
              International Markets
            </h3>
          </div>
          <div className="p-6 h-[520px] overflow-y-auto">
            {international.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No international markets.
              </p>
            ) : (
              <div className="space-y-8">
                {international
                  .slice(0, visibleInternationalCount)
                  .map((region) => (
                    <div key={region.id}>
                      <h4 className="text-xl font-bold text-gray-700 mb-2 text-center">
                        {region.name}
                      </h4>
                      <div className="space-y-6 pl-4">
                        {region.subRegions.map((sub) => (
                          <div
                            key={sub.id}
                            className="border-l-2 border-gray-300 pl-4"
                          >
                            <h5 className="text-lg font-semibold text-gray-600 mb-1">
                              {sub.name}
                            </h5>
                            <ul className="list-disc list-inside space-y-1">
                              {sub.cities
                                .flatMap((c) => c.sellers)
                                .map((s) => (
                                  <li
                                    key={s.id}
                                    className="flex items-center gap-2 text-gray-700"
                                  >
                                    {s.name}
                                    {s.verified && (
                                      <span className="text-green-600">
                                        (Verified)
                                      </span>
                                    )}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            {visibleInternationalCount < international.length && (
              <button
                onClick={loadMoreInternational}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Load More International Markets
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
