// src/components/market/MarketCategory.tsx
"use client";
import React from "react";
import { MarketView } from "./MarketView";
import type { MarketRegion, MarketType } from "@/types/market";

interface MarketCategoryProps {
  type: MarketType;
  regions: MarketRegion[];
  viewMode: "grid" | "list";
  searchQuery?: string;
}

export const MarketCategory: React.FC<MarketCategoryProps> = ({
  type,
  regions,
  viewMode,
}) => {
  return (
    <div className="space-y-6">
      <MarketView type={type} regions={regions} viewMode={viewMode} />
    </div>
  );
};
