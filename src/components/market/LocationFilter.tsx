// src/components/market/LocationFilter.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { MarketRegion, MarketType } from "@/types/market";

interface LocationFilterProps {
  marketType: MarketType;
  markets: MarketRegion[];
  selectedFilters: {
    region: string;
    subregion: string;
    city: string;
  };
  onFilterChange: (
    type: "region" | "subregion" | "city",
    value: string
  ) => void;
  isMobile?: boolean;
}

export const LocationFilter = ({
  marketType,
  markets,
  selectedFilters,
  onFilterChange,
  isMobile = false,
}: LocationFilterProps) => {
  // Available options based on selected parent filters
  const [subregions, setSubregions] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // Get all unique region names
  const regions = markets.map((region) => region.name);

  // Update available subregions when region changes
  useEffect(() => {
    if (selectedFilters.region) {
      const region = markets.find((r) => r.name === selectedFilters.region);
      if (region) {
        setSubregions(region.subregions.map((sub) => sub.name));
      } else {
        setSubregions([]);
      }
    } else {
      setSubregions([]);
    }
    // Reset cities when region changes
    setCities([]);
  }, [selectedFilters.region, markets]);

  // Update available cities when subregion changes
  useEffect(() => {
    if (selectedFilters.region && selectedFilters.subregion) {
      const region = markets.find((r) => r.name === selectedFilters.region);
      if (region) {
        const subregion = region.subregions.find(
          (s) => s.name === selectedFilters.subregion
        );
        if (subregion) {
          setCities(subregion.cities.map((city) => city.name));
        } else {
          setCities([]);
        }
      }
    } else {
      setCities([]);
    }
  }, [selectedFilters.region, selectedFilters.subregion, markets]);

  const getFilterLabel = (filterType: "region" | "subregion" | "city") => {
    const label =
      marketType === "domestic"
        ? { region: "Province", subregion: "City", city: "District" }
        : { region: "Country", subregion: "State/Province", city: "City" };

    return label[filterType];
  };

  // The filter layout depends on isMobile prop
  if (isMobile) {
    return (
      <div className="space-y-3">
        {/* Region Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {getFilterLabel("region")}
          </label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg bg-white"
            value={selectedFilters.region}
            onChange={(e) => onFilterChange("region", e.target.value)}
          >
            <option value="">All {getFilterLabel("region")}s</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Subregion Filter - Only show if region is selected */}
        {selectedFilters.region && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getFilterLabel("subregion")}
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              value={selectedFilters.subregion}
              onChange={(e) => onFilterChange("subregion", e.target.value)}
            >
              <option value="">All {getFilterLabel("subregion")}s</option>
              {subregions.map((subregion) => (
                <option key={subregion} value={subregion}>
                  {subregion}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* City Filter - Only show if region and subregion are selected */}
        {selectedFilters.region && selectedFilters.subregion && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getFilterLabel("city")}
            </label>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              value={selectedFilters.city}
              onChange={(e) => onFilterChange("city", e.target.value)}
            >
              <option value="">All {getFilterLabel("city")}s</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  }

  // Desktop layout with inline filters
  return (
    <div className="flex items-center gap-2">
      {/* Region Filter */}
      <div className="relative">
        <select
          className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white text-sm"
          value={selectedFilters.region}
          onChange={(e) => onFilterChange("region", e.target.value)}
          aria-label={`Select ${getFilterLabel("region")}`}
        >
          <option value="">All {getFilterLabel("region")}s</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          size={16}
        />
      </div>

      {/* Subregion Filter - Only show if region is selected */}
      {selectedFilters.region && (
        <div className="relative">
          <select
            className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white text-sm"
            value={selectedFilters.subregion}
            onChange={(e) => onFilterChange("subregion", e.target.value)}
            aria-label={`Select ${getFilterLabel("subregion")}`}
          >
            <option value="">All {getFilterLabel("subregion")}s</option>
            {subregions.map((subregion) => (
              <option key={subregion} value={subregion}>
                {subregion}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>
      )}

      {/* City Filter - Only show if region and subregion are selected */}
      {selectedFilters.region && selectedFilters.subregion && (
        <div className="relative">
          <select
            className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white text-sm"
            value={selectedFilters.city}
            onChange={(e) => onFilterChange("city", e.target.value)}
            aria-label={`Select ${getFilterLabel("city")}`}
          >
            <option value="">All {getFilterLabel("city")}s</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <ChevronDown
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
            size={16}
          />
        </div>
      )}
    </div>
  );
};
