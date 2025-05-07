export type LabelType = "New Arrival" | "Best Seller" | "On Sale";

export type FeaturedDuration = "24h" | "1w" | "1m";

export interface MarketingLabel {
  id: string;
  name: LabelType;
  createdAt: string;
  updatedAt: string;
}

export interface MarketingProduct {
  id: string;
  name: string;
  image?: string;
  price: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isOnSale: boolean;
  labels: LabelType[];
  accountId: string;
  marketId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeaturedAdOption {
  duration: FeaturedDuration;
  label: string;
  feePercentage: number;
  maxFee: number;
}

export interface SelectedMarketingOptions {
  productId: string;
  featured?: {
    enable: boolean;
    duration: FeaturedDuration;
  };
  labels: LabelType[];
}

export type PromotionData = Pick<
  MarketingProduct,
  "isFeatured" | "isNewArrival" | "isBestSeller" | "isOnSale"
>;
