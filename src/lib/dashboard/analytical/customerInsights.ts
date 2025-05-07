import {
  AcquisitionCostInsight,
  ActiveUsersInsight,
  ChurnRateInsight,
  CustomerGrowthInsight,
  InsightsData,
  LifetimeValueInsight,
  NewVsReturningInsight,
  RetentionRateInsight,
  TopCustomer,
} from "@/types/analytical/customerInsights";

export type FetchInsightResponse = {
  activeUsers?: ActiveUsersInsight[];
  churnRate?: ChurnRateInsight[];
  acquisitionCost?: AcquisitionCostInsight[];
  customerGrowth?: CustomerGrowthInsight[];
  lifetimeValue?: LifetimeValueInsight[];
  retentionRate?: RetentionRateInsight[];
  newVsReturning?: NewVsReturningInsight[];
  topCustomers?: TopCustomer[];
  error?: string;
  data?: InsightsData;
};

/**
 * Fetches customer insight data based on the given metric.
 * @param metric - The metric identifier to fetch insight data for.
 * @returns A promise resolving to either the data or an error message.
 */
export async function fetchInsights(
  metric: keyof InsightsData,
  accountId: string,
  role: string
): Promise<FetchInsightResponse> {
  const endpoint = `/api/insights?metric=${encodeURIComponent(
    metric
  )}&accountId=${encodeURIComponent(accountId)}&role=${encodeURIComponent(
    role
  )}`;

  try {
    const response = await fetch(endpoint, { method: "GET" });

    if (!response.ok) {
      const message = `HTTP ${response.status} - Failed to fetch data for metric: ${metric}`;
      console.error("Fetch Error:", message);
      return { error: message };
    }

    const data: InsightsData = await response.json();

    // Check if the requested metric data is available
    const metricData = data[metric];

    if (!metricData || metricData.length === 0) {
      const message = `No data returned for metric: ${metric}`;
      console.warn("Empty Data Warning:", message);
      return { error: message };
    }

    // Return the relevant metric data as part of the response
    return { [metric]: metricData };
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred while fetching insight data.";

    console.error("Fetch Exception:", errorMessage);
    return { error: errorMessage };
  }
}
