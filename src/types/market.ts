// src/types/market.ts
import { Market as PrismaMarket } from "@prisma/client";

// Enum for currency types
export enum Currency {
  IDR = "IDR", // Indonesian Rupiah
  USD = "USD", // United States Dollar
}

// Market types: domestic for local, global for international
export type MarketType = "domestic" | "global";

// Basic Seller interface
export interface Seller {
  id: string;
  name: string;
  role: string;
  currency: Currency;
  rating?: number;
  location?: string;
  productCount?: number;
  joinDate?: string;
  verified?: boolean;
}

// City interface
export interface City {
  id: string;
  name: string;
  sellers: Seller[];
}

// SubRegion interface (Province or State)
export interface SubRegion {
  id: string;
  name: string;
  cities: City[];
  sellers: Seller[];
}

// MarketRegion interface (Country or Major Province)
export interface MarketRegion {
  id: string;
  name: string;
  region: string;
  subRegions: SubRegion[];
  sellers: Seller[];
  location?: string; // Added location field
}

// Selected filters for UI
export type SelectedFilters = {
  region: string;
  subRegion: string;
  city: string;
};

// Flat Market item for simple market listing
export interface Market {
  id: string;
  name: string;
  location?: string;
  currency: Currency;
  region: string;
  subRegion: string;
  city: string;
  rating?: number;
  productCount?: number;
  joinDate?: string;
  verified?: boolean;
}

// Seller with optional currency relation
export type SellerWithRelations = {
  id: string;
  name: string;
  role: string;
  currency: Currency | null;
};

// City with sellers (from Prisma relation)
export type CityWithRelations = {
  id: string;
  name: string;
  sellers: SellerWithRelations[];
};

// SubRegion with nested cities and sellers (from Prisma relation)
export type SubRegionWithRelations = {
  id: string;
  name: string;
  cities: CityWithRelations[];
  sellers: SellerWithRelations[];
};

// MarketWithRelations type (full relational model for Prisma queries)
export type MarketWithRelations = PrismaMarket & {
  region: {
    id: string;
    name: string;
  } | null;
  subRegion: SubRegionWithRelations | null;
  city: CityWithRelations | null;
  currency: {
    id: string;
    name: string;
  } | null;
  sellers: SellerWithRelations[];
};
