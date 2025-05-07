// lib/dashboard/analytical/employeeInsights.ts

import {
  EmployeeInsightsData,
  FetchInsightResponse,
} from "@/types/analytical/employeeInsights";

export async function fetchEmployeeInsights(
  metric: keyof EmployeeInsightsData,
  accountId: string,
  role: string
): Promise<FetchInsightResponse> {
  const endpoint = `/api/employee-insights?metric=${encodeURIComponent(
    String(metric)
  )}&accountId=${encodeURIComponent(accountId)}&role=${encodeURIComponent(
    role
  )}`;

  try {
    const response = await fetch(endpoint, { method: "GET" });

    if (!response.ok) {
      return {
        error: `Failed to fetch data for ${String(metric)}: HTTP ${
          response.status
        }`,
      };
    }

    const data: EmployeeInsightsData = await response.json();
    const metricData = data[metric];

    if (!metricData || metricData.length === 0) {
      return { error: `No data returned for ${String(metric)}` };
    }

    return { [metric]: metricData };
  } catch (err) {
    return {
      error:
        err instanceof Error ? err.message : "Unexpected error during fetch.",
    };
  }
}
