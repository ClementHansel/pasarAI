// src/types/agent/analytics.ts

// SalesData type - includes information on sales, with optional startDate and endDate for filtering.
export type SalesData = {
  startDate?: string; // Optional start date for the sale period
  endDate?: string; // Optional end date for the sale period
  productId: string; // Product identifier
  quantity: number; // Number of units sold
  totalRevenue: number; // Total revenue from the product
  date: string; // Date of the sale (timestamp or ISO format)
};

// BuyerActivity type - includes information about buyer's activity
export type BuyerActivity = {
  productId: string; // Product identifier
  activityType: string;
  timestamp: string; // Timestamp of when the buyer interacted with the product
  date: string;
};

// SalesFilters type - used for filtering data by date, category, and productId
export type SalesFilters = {
  dateFrom?: string; // Optional start date for the filter
  dateTo?: string; // Optional end date for the filter
  category?: string; // Optional product category for filtering
  productId?: string; // Optional productId for filtering by specific product
};

// Insight type - stores summary information and any additional insights for analysis
export type Insight = {
  summary: string; // A brief summary of the analysis
  [key: string]: unknown; // Additional dynamic insights or data from the analysis
};

// Generic AnalyticsMeta type - stores raw data and insights for any type of analytics data
export type AnalyticsMeta<T = SalesData[] | BuyerActivity[]> = {
  rawData: T; // Raw data, either SalesData or BuyerActivity
  insights: Insight; // Insights generated from the analysis
};

// Prisma activity response from database
export type ActivityFromDB = {
  productId: number;
  activityType: string;
  date: Date;
  accountId: number;
};

export type TrendAnalysis = {
  totalRevenue: number;
  bestSellingProduct: {
    productId: string;
    revenue: number;
  };
};

export type BuyerBehaviorAnalysis = {
  mostViewedProduct: {
    productId: string;
    views: number;
  };
  mostPurchasedProduct: {
    productId: string;
    purchases: number;
  };
};
