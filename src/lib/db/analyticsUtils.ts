// src/lib/db/analyticsUtils.ts

import { AgentRole } from "../ai/agent/agentTypes";
import { db } from "./db";

// Types
import {
  BuyerBehaviorAnalysis,
  SalesData,
  SalesFilters,
  TrendAnalysis,
} from "@/types/agent/analytics";
import { BuyerActivity } from "@/types/agent/analytics";

// Type for the sales response from the database
type SaleFromDB = {
  amount: number;
  date: Date;
  productId: string; // Changed from number to string to match DB
  accountId: string; // Changed from number to string to match DB
};

// Type for the buyer activity response from the database
type ActivityFromDB = {
  productId: string;
  accountId: string;
  id: number;
  activityType: string;
  date: Date;
};

/**
 * Get sales data filtered by user role, accountId, and date range.
 */
export async function getSalesData(
  role: AgentRole,
  accountId: string,
  filters: SalesFilters
): Promise<SalesData[]> {
  try {
    const { dateFrom, dateTo, productId, category } = filters;

    if (!dateFrom || !dateTo) {
      throw new Error("Both dateFrom and dateTo must be provided.");
    }

    const conditions = {
      date: {
        gte: new Date(dateFrom),
        lte: new Date(dateTo),
      },
      ...(accountId !== "all" ? { accountId: accountId } : {}), // Remove Number() conversion
      ...(productId ? { productId: productId } : {}), // Remove Number() conversion
      ...(category ? { category: category } : {}),
    };

    const salesData: SaleFromDB[] = await db.sales.findMany({
      where: conditions,
      select: {
        amount: true,
        date: true,
        productId: true,
        accountId: true,
      },
    });

    return salesData.map((sale) => ({
      startDate: filters.dateFrom,
      endDate: filters.dateTo,
      productId: sale.productId, // No need for toString() since it's already a string
      quantity: sale.amount,
      totalRevenue: sale.amount,
      date: sale.date.toISOString(),
    }));
  } catch (error) {
    console.error("[AnalyticsUtils - getSalesData Error]", error);
    throw new Error("Failed to get sales data");
  }
}

/**
 * Get buyer activity data (e.g., product views, purchases) filtered by accountId and date range.
 */
export async function getBuyerActivity(
  accountId: string,
  filters: SalesFilters
): Promise<BuyerActivity[]> {
  try {
    const { dateFrom, dateTo, productId } = filters;

    if (!dateFrom || !dateTo) {
      throw new Error("Both dateFrom and dateTo must be provided.");
    }

    const conditions = {
      date: {
        gte: new Date(dateFrom),
        lte: new Date(dateTo),
      },
      accountId: accountId, // Keep as string to match DB
      ...(productId ? { productId: productId } : {}), // Keep as string to match DB
    };

    const activityData: ActivityFromDB[] = await db.activity.findMany({
      where: conditions,
      select: {
        id: true,
        productId: true,
        activityType: true,
        date: true,
        accountId: true,
      },
    });

    return activityData.map((activity) => ({
      productId: activity.productId,
      activityType: activity.activityType,
      timestamp: activity.date.toISOString(),
      date: activity.date.toISOString(),
    }));
  } catch (error) {
    console.error("[AnalyticsUtils - getBuyerActivity Error]", error);
    throw new Error("Failed to get buyer activity data");
  }
}

/**
 * Analyze total sales amount for a given role, accountId, and date range.
 */
export async function analyzeSalesTotal(
  role: AgentRole,
  accountId: string,
  filters: SalesFilters
): Promise<number> {
  try {
    const sales = await getSalesData(role, accountId, filters);
    const total = sales.reduce((sum, s) => sum + s.totalRevenue, 0);
    return total;
  } catch (error) {
    console.error("[AnalyticsUtils - analyzeSalesTotal Error]", error);
    throw new Error("Failed to analyze total sales");
  }
}

/**
 * Get daily sales trends grouped by date.
 */
export async function getSalesTrends(
  role: AgentRole,
  accountId: string,
  filters: SalesFilters
): Promise<Record<string, number>> {
  try {
    const sales = await getSalesData(role, accountId, filters);

    const trends = sales.reduce((acc: Record<string, number>, sale) => {
      const dateKey = formatDate(new Date(sale.date));
      acc[dateKey] = (acc[dateKey] || 0) + sale.totalRevenue;
      return acc;
    }, {});

    return trends;
  } catch (error) {
    console.error("[AnalyticsUtils - getSalesTrends Error]", error);
    throw new Error("Failed to get sales trends");
  }
}

/**
 * Analyze buyer behavior based on activity data (e.g., most viewed products, purchase frequency)
 */
export async function analyzeBuyerBehavior(
  accountId: string,
  filters: SalesFilters
): Promise<BuyerBehaviorAnalysis> {
  try {
    const activityData = await getBuyerActivity(accountId, filters);

    const productViews: Record<string, number> = {};
    const productPurchases: Record<string, number> = {};

    activityData.forEach((activity) => {
      if (activity.activityType === "view") {
        productViews[activity.productId] =
          (productViews[activity.productId] || 0) + 1;
      } else if (activity.activityType === "purchase") {
        productPurchases[activity.productId] =
          (productPurchases[activity.productId] || 0) + 1;
      }
    });

    const mostViewedProduct = Object.entries(productViews).reduce(
      (best, [productId, views]) =>
        views > best.views ? { productId, views } : best,
      { productId: "", views: 0 }
    );

    const mostPurchasedProduct = Object.entries(productPurchases).reduce(
      (best, [productId, purchases]) =>
        purchases > best.purchases ? { productId, purchases } : best,
      { productId: "", purchases: 0 }
    );

    return {
      mostViewedProduct,
      mostPurchasedProduct,
    };
  } catch (error) {
    console.error("[AnalyticsUtils - analyzeBuyerBehavior Error]", error);
    throw new Error("Failed to analyze buyer behavior");
  }
}

/**
 * Analyze trends from the sales data (e.g., total sales, highest-selling products)
 */
export async function analyzeTrends(
  role: AgentRole,
  accountId: string,
  filters: SalesFilters
): Promise<TrendAnalysis> {
  try {
    const salesData = await getSalesData(role, accountId, filters);

    const totalRevenue = salesData.reduce(
      (sum, sale) => sum + sale.totalRevenue,
      0
    );

    const productSales = salesData.reduce((acc, sale) => {
      acc[sale.productId] = (acc[sale.productId] || 0) + sale.totalRevenue;
      return acc;
    }, {} as Record<string, number>);

    const bestSellingProduct = Object.entries(productSales).reduce(
      (best, [productId, revenue]) =>
        revenue > best.revenue ? { productId, revenue } : best,
      { productId: "", revenue: 0 }
    );

    return {
      totalRevenue,
      bestSellingProduct,
    };
  } catch (error) {
    console.error("[AnalyticsUtils - analyzeTrends Error]", error);
    throw new Error("Failed to analyze trends");
  }
}

/**
 * Format the trend analysis summary into a readable string.
 */
export function formatTrendSummary(analysis: TrendAnalysis): string {
  const { totalRevenue, bestSellingProduct } = analysis;

  const revenueFormatted = totalRevenue.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const product = bestSellingProduct?.productId || "N/A";
  const revenue =
    bestSellingProduct?.revenue?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    }) || "N/A";

  return `Total Revenue: ${revenueFormatted}. Best Selling Product: ${product} with ${revenue} in sales.`;
}

/**
 * Format date to YYYY-MM-DD string.
 */
export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}
