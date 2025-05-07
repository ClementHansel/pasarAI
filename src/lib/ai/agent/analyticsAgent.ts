// src/lib/ai/agent/analyticsAgent.ts

import {
  analyzeBuyerBehavior,
  analyzeTrends,
  getBuyerActivity,
  getSalesData,
} from "@/lib/db/analyticsUtils";

import { AgentTask, AgentTaskResult } from "./agentTypes";
import {
  AnalyticsMeta,
  BuyerActivity,
  SalesData,
  SalesFilters,
} from "@/types/agent/analytics";
import {
  formatBuyerSummary,
  formatTrendSummary,
} from "@/lib/db/analyticsFormatters";

export async function handleAnalyticsTask(
  task: AgentTask
): Promise<AgentTaskResult> {
  try {
    const { role, accountId, payload } = task;
    const filters: SalesFilters = payload.filters ?? {
      startDate: "",
      endDate: "",
      category: "",
      productId: "",
    };

    let reply = "";
    let meta: AnalyticsMeta<SalesData[] | BuyerActivity[]> = {
      rawData: [],
      insights: { summary: "" },
    };
    if (role === "seller") {
      const salesData = await getSalesData(role, accountId, filters);
      const analysis = await analyzeTrends(role, accountId, filters);
      const summary = formatTrendSummary(analysis);

      reply = `📊 Seller Sales Insight:\n${summary}`;
      meta = {
        rawData: salesData,
        insights: { summary, ...analysis },
      };
    } else if (role === "buyer") {
      const activityData = await getBuyerActivity(accountId, filters);
      const behavior = await analyzeBuyerBehavior(accountId, filters);
      const summary = formatBuyerSummary(behavior);

      reply = `🧾 Your Shopping Summary:\n${summary}`;
      meta = {
        rawData: activityData,
        insights: { summary, ...behavior },
      };
    } else if (role === "admin") {
      const salesData = await getSalesData(role, "all", filters);
      const analysis = await analyzeTrends(role, "all", filters);
      const summary = formatTrendSummary(analysis);

      reply = `📢 Admin Sales Overview:\n${summary}`;
      meta = {
        rawData: salesData,
        insights: { summary, ...analysis },
      };
    } else {
      reply = "❓ Unknown role. Unable to provide analytics.";
    }

    return { reply, meta };
  } catch (error) {
    console.error("[AnalyticsAgent Error]", error);
    return {
      reply:
        "⚠️ Analytics failed due to an internal error. Please try again later.",
      meta: { rawData: [], insights: { summary: "Error occurred" } },
    };
  }
}
