// src\components\market\LocationFilter.tsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { selectedFilters, MarketRegion, MarketType } from "@/types/market";

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
  const [subregions, setSubregions] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const regions = useMemo(
    () => markets.map((region) => region.name),
    [markets]
  );

  useEffect(() => {
    const region = markets.find((r) => r.name === selectedFilters.region);

    if (region) {
      setSubregions(region.subregions.map((sub) => sub.name));
    } else {
      setSubregions([]);
    }

    // Always reset cities if region changes
    setCities([]);
  }, [selectedFilters.region, markets]);

  useEffect(() => {
    const region = markets.find((r) => r.name === selectedFilters.region);
    const subregion = region?.subregions.find(
      (s) => s.name === selectedFilters.subregion
    );

    if (subregion) {
      setCities(subregion.cities.map((city) => city.name));
    } else {
      setCities([]);
    }
  }, [selectedFilters.region, selectedFilters.subregion, markets]);

  const getFilterLabel = (filterType: keyof selectedFilters) => {
    const labelMap =
      marketType === "domestic"
        ? { region: "Province", subregion: "City", city: "District" }
        : { region: "Country", subregion: "State/Province", city: "City" };

    return labelMap[filterType];
  };

  const renderSelect = (
    filterType: keyof selectedFilters,
    options: string[],
    selectedValue: string,
    disabled = false
  ) => (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {getFilterLabel(filterType)}
      </label>
      <select
        className="w-full appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-white text-sm"
        value={selectedValue}
        onChange={(e) => onFilterChange(filterType, e.target.value)}
        disabled={disabled}
        aria-label={`Select ${getFilterLabel(filterType)}`}
      >
        <option value="">All {getFilterLabel(filterType)}s</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-2 top-9 transform -translate-y-1/2 text-gray-400 pointer-events-none"
        size={16}
      />
    </div>
  );

  const mobileLayout = (
    <div className="space-y-3">
      {renderSelect("region", regions, selectedFilters.region)}
      {selectedFilters.region &&
        renderSelect("subregion", subregions, selectedFilters.subregion)}
      {selectedFilters.region &&
        selectedFilters.subregion &&
        renderSelect("city", cities, selectedFilters.city)}
    </div>
  );

  const desktopLayout = (
    <div className="flex items-center gap-2">
      {renderSelect("region", regions, selectedFilters.region)}
      {selectedFilters.region &&
        renderSelect("subregion", subregions, selectedFilters.subregion)}
      {selectedFilters.region &&
        selectedFilters.subregion &&
        renderSelect("city", cities, selectedFilters.city)}
    </div>
  );

  return isMobile ? mobileLayout : desktopLayout;
};
