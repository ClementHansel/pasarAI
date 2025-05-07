// analyticsFormatters.ts

import { BuyerBehaviorAnalysis, TrendAnalysis } from "@/types/agent/analytics";

export function formatTrendSummary(analysis: TrendAnalysis): string {
  return `Total Revenue: $${analysis.totalRevenue.toFixed(2)}\nTop Product: ${
    analysis.bestSellingProduct.productId
  } ($${analysis.bestSellingProduct.revenue.toFixed(2)})`;
}

export function formatBuyerSummary(analysis: BuyerBehaviorAnalysis): string {
  return `Most Viewed Product: ${analysis.mostViewedProduct.productId} (${analysis.mostViewedProduct.views} views)\nMost Purchased Product: ${analysis.mostPurchasedProduct.productId} (${analysis.mostPurchasedProduct.purchases} purchases)`;
}
