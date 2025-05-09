import { InsightsData } from "@/types/analytical/customerInsights";

const mockInsights: InsightsData = {
  activeUsers: [{ date: "2025-05-01", count: 500 }],
  churnRate: [{ date: "2025-05-01", percentage: 4.2 }],
  acquisitionCost: [{ date: "2025-05-01", cost: 12.5 }],
  customerGrowth: [{ date: "2025-05-01", growth: 30 }],
  lifetimeValue: [{ date: "2025-05-01", value: 200 }],
  retentionRate: [{ date: "2025-05-01", percentage: 86 }],
  newVsReturning: [{ date: "2025-05-01", new: 150, returning: 350 }],
  topCustomers: [
    { name: "Jane Doe", totalSpend: 1500, lastPurchase: "2025-05-03" },
  ],
};

export default mockInsights;
