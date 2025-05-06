// COMMENTED OUT: This API route is for triggering all analytical data generation jobs in parallel.
// It is intended for use by backend CRON jobs or admin-triggered refreshes, not for direct user access.
//
// This route is currently causing build errors (likely due to missing or incomplete job handler imports).
// Please review with the backend/data team before re-enabling.
//
// To re-enable, uncomment the code below and ensure all job handler imports are valid and implemented.

/*
import { NextResponse } from "next/server";

// Import all 8 job handlers
import { generateCustomerInsights } from "@/lib/cron/customerInsights";
import { generateSalesPerformance } from "@/lib/cron/salesPerformance";
import { generateUserEngagement } from "@/lib/cron/userEngagement";
import { generateProductTrends } from "@/lib/cron/productTrends";
import { generateMarketingConversion } from "@/lib/cron/marketingConversion";
import { generateRetentionStats } from "@/lib/cron/retentionStats";
import { generateSiteHealth } from "@/lib/cron/siteHealth";
import { generateOperationalOverview } from "@/lib/cron/operationalOverview";

export async function GET() {
  try {
    // Run all generators in parallel
    await Promise.all([
      generateCustomerInsights(),
      generateSalesPerformance(),
      generateUserEngagement(),
      generateProductTrends(),
      generateMarketingConversion(),
      generateRetentionStats(),
      generateSiteHealth(),
      generateOperationalOverview(),
    ]);

    return NextResponse.json({
      status: "success",
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("CRON error:", error);
    return NextResponse.json(
      { status: "error", error: String(error) },
      { status: 500 }
    );
  }
}
*/
