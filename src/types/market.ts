// src/types/market.ts

// Enum for currency types to avoid repetition of strings
export enum Currency {
  IDR = "IDR", // Indonesian Rupiah
  USD = "USD", // United States Dollar
}

// Type for market types: "domestic" for local regions, "global" for international regions
export type MarketType = "domestic" | "global";

// Seller interface representing a seller's details
export interface Seller {
  id: string; // Unique identifier for the seller
  name: string; // Name of the seller
  currency: Currency; // The currency that the seller uses (IDR, USD, etc.)
  rating?: number; // Optional rating of the seller (out of 5)
  location?: string; // Optional location of the seller
  productCount?: number; // Optional count of products the seller has
  joinDate?: string; // Optional date when the seller joined
  verified?: boolean; // Optional verification status
}

// City interface representing a city's details
export interface City {
  name: string; // The name of the city
  sellers: Seller[]; // List of sellers in this city
}

// Subregion interface representing a subregion's details (e.g., province for domestic, state/province for global)
export interface Subregion {
  name: string; // The name of the subregion (Province/State)
  cities: City[]; // List of cities within this subregion
}

// MarketRegion interface representing the market region (either a province for domestic or a country for global)
export interface MarketRegion {
  name: string; // The name of the region (Province or Country)
  subregions: Subregion[]; // List of subregions (e.g., states/provinces within the region)
}
