// src/components/market/LocationFilter.tsx
"use client";
import React from "react";
import type { MarketType, MarketRegion } from "@/types/market";

interface LocationFilterProps {
  marketType: MarketType;
  markets: MarketRegion[];
  selectedFilters: {
    region: string;
    subRegion: string;
    city: string;
  };
  onFilterChange: React.Dispatch<
    React.SetStateAction<{
      region: string;
      subRegion: string;
      city: string;
    }>
  >;
  isMobile?: boolean;
}

export const LocationFilter: React.FC<LocationFilterProps> = ({
  // marketType,
  markets,
  selectedFilters,
  onFilterChange,
  isMobile = false,
}) => {
  // Get unique regions
  const regions = Array.from(new Set(markets.map((m) => m.name)));

  // Get subregions for selected region
  const subRegions = selectedFilters.region
    ? Array.from(
        new Set(
          markets
            .filter((m) => m.name === selectedFilters.region)
            .flatMap((m) => m.subRegions.map((s) => s.name))
        )
      )
    : [];

  // Get cities for selected subregion
  const cities = selectedFilters.subRegion
    ? Array.from(
        new Set(
          markets.flatMap((m) =>
            m.subRegions
              .filter((s) => s.name === selectedFilters.subRegion)
              .flatMap((s) => s.cities.map((c) => c.name))
          )
        )
      )
    : [];

  return (
    <div
      className={
        isMobile ? "grid grid-cols-1 gap-4" : "flex items-center gap-4"
      }
    >
      {/* Region Filter */}
      <select
        value={selectedFilters.region}
        onChange={(e) =>
          onFilterChange({
            ...selectedFilters,
            region: e.target.value,
            subRegion: "",
            city: "",
          })
        }
        className="block w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      >
        <option value="">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {/* Subregion Filter */}
      {selectedFilters.region && (
        <select
          value={selectedFilters.subRegion}
          onChange={(e) =>
            onFilterChange((prev) => ({
              ...prev,
              subRegion: e.target.value,
              city: "",
            }))
          }
          className="block w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        >
          <option value="">All Subregions</option>
          {subRegions.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      )}

      {/* City Filter */}
      {selectedFilters.subRegion && (
        <select
          value={selectedFilters.city}
          onChange={(e) =>
            onFilterChange((prev) => ({
              ...prev,
              city: e.target.value,
            }))
          }
          className="block w-full py-2 px-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
