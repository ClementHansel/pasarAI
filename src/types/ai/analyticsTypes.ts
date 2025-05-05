// Cart Analytics Type
export type CartAnalytics = {
  date: string;
  totalCartsCreated: number; // Changed to match the prompt
  abandonedCarts: number;
  mostPopularProduct: string;
  avgCartValue: number; // Added for prompt
};

// Checkout Analytics Type
export type CheckoutAnalytics = {
  date: string;
  totalCheckouts: number; // Changed to match the prompt
  completedCheckouts: number; // Changed to match the prompt
  abandonmentRate: number; // Changed to match the prompt
  paymentMethodPreference: string; // Added for prompt
};

// Product Analytics Type
export type ProductAnalytics = {
  date: string;
  totalProductsSold: number; // Changed to match the prompt
  topProduct: string;
  mostPopularCategory: string;
  stockStatus: string; // Changed to match the prompt (stock status instead of stock)
};

// Wishlist Analytics Type
export type WishlistAnalytics = {
  date: string;
  totalWishlists: number; // Changed to match the prompt
  mostAddedProduct: string; // Changed to match the prompt
  abandonmentRate: number; // Changed to match the prompt
};

// Sales Analytics Type
export type SalesAnalytics = {
  date: string;
  totalOrders: number; // Changed to match the prompt
  totalUnitsSold: number; // Changed to match the prompt
  topCategory: string;
  topProduct: string;
  avgOrderValue: number; // Changed to match the prompt
};

// Return Analytics Type
export type ReturnAnalytics = {
  date: string;
  totalReturns: number; // Changed to match the prompt
  returnRate: number; // Changed to match the prompt
  mostReturnedCategory: string; // Changed to match the prompt
  mostReturnedReason: string; // Changed to match the prompt
};

// Customer Analytics Type
export type CustomerAnalytics = {
  date: string;
  newCustomers: number; // Changed to match the prompt
  returningCustomers: number; // Changed to match the prompt
  churnRate: number; // Added for prompt
  satisfactionScore: number; // Added for prompt (on a scale of 1-10)
};

// Revenue Analytics Type
export type RevenueAnalytics = {
  date: string;
  totalRevenue: number; // Changed to match the prompt
  grossProfit: number; // Added for prompt
  netProfit: number; // Changed to match the prompt
  profitMargin: number; // Added for prompt
};

// General Analytics Type to encompass all types
export type AnalyticsType =
  | "cart"
  | "checkout"
  | "products"
  | "wishlist"
  | "sales"
  | "returns"
  | "customers"
  | "revenue";
