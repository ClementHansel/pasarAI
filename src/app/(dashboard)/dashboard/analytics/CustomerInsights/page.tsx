"use client";
import React, { useEffect, useState } from "react";
import {
  ActiveUsersInsight,
  ChurnRateInsight,
  AcquisitionCostInsight,
  CustomerGrowthInsight,
  LifetimeValueInsight,
  RetentionRateInsight,
  NewVsReturningInsight,
  TopCustomer,
  InsightsData,
} from "@/types/analytical/customerInsights";
import {
  fetchInsights,
  FetchInsightResponse,
} from "@/lib/dashboard/analytical/customerInsights";

const CustomerInsightsPage = ({
  accountId,
  role,
}: {
  accountId: string;
  role: string;
}) => {
  const [activeUsers, setActiveUsers] = useState<
    ActiveUsersInsight[] | undefined
  >(undefined);
  const [churnRate, setChurnRate] = useState<ChurnRateInsight[] | undefined>(
    undefined
  );
  const [acquisitionCost, setAcquisitionCost] = useState<
    AcquisitionCostInsight[] | undefined
  >(undefined);
  const [customerGrowth, setCustomerGrowth] = useState<
    CustomerGrowthInsight[] | undefined
  >(undefined);
  const [lifetimeValue, setLifetimeValue] = useState<
    LifetimeValueInsight[] | undefined
  >(undefined);
  const [retentionRate, setRetentionRate] = useState<
    RetentionRateInsight[] | undefined
  >(undefined);
  const [newVsReturning, setNewVsReturning] = useState<
    NewVsReturningInsight[] | undefined
  >(undefined);
  const [topCustomers, setTopCustomers] = useState<TopCustomer[] | undefined>(
    undefined
  );

  useEffect(() => {
    const loadData = async () => {
      // Define metrics only with valid keys from InsightsData (excluding "data")
      const metrics: (keyof InsightsData)[] = [
        "activeUsers",
        "churnRate",
        "acquisitionCost",
        "customerGrowth",
        "lifetimeValue",
        "retentionRate",
        "newVsReturning",
        "topCustomers",
      ];

      for (const metric of metrics) {
        const { data, error }: FetchInsightResponse = await fetchInsights(
          metric,
          accountId,
          role
        );

        if (data) {
          switch (metric) {
            case "activeUsers":
              setActiveUsers(data as ActiveUsersInsight[]);
              break;
            case "churnRate":
              setChurnRate(data as ChurnRateInsight[]);
              break;
            case "acquisitionCost":
              setAcquisitionCost(data as AcquisitionCostInsight[]);
              break;
            case "customerGrowth":
              setCustomerGrowth(data as CustomerGrowthInsight[]);
              break;
            case "lifetimeValue":
              setLifetimeValue(data as LifetimeValueInsight[]);
              break;
            case "retentionRate":
              setRetentionRate(data as RetentionRateInsight[]);
              break;
            case "newVsReturning":
              setNewVsReturning(data as NewVsReturningInsight[]);
              break;
            case "topCustomers":
              setTopCustomers(data as TopCustomer[]);
              break;
            default:
              break;
          }
        } else if (error) {
          console.error(`Error fetching ${metric}:`, error);
        }
      }
    };

    loadData();
  }, [accountId, role]);

  return (
    <div>
      <h1>Customer Insights</h1>

      {/* Active Users */}
      <div>
        <h2>Active Users</h2>
        {activeUsers ? (
          <div>{/* Render Active Users insights */}</div>
        ) : (
          <p>No active users data</p>
        )}
      </div>

      {/* Churn Rate */}
      <div>
        <h2>Churn Rate</h2>
        {churnRate ? (
          <div>{/* Render Churn Rate insights */}</div>
        ) : (
          <p>No churn rate data</p>
        )}
      </div>

      {/* Acquisition Cost */}
      <div>
        <h2>Acquisition Cost</h2>
        {acquisitionCost ? (
          <div>{/* Render Acquisition Cost insights */}</div>
        ) : (
          <p>No acquisition cost data</p>
        )}
      </div>

      {/* Customer Growth */}
      <div>
        <h2>Customer Growth</h2>
        {customerGrowth ? (
          <div>{/* Render Customer Growth insights */}</div>
        ) : (
          <p>No customer growth data</p>
        )}
      </div>

      {/* Lifetime Value */}
      <div>
        <h2>Lifetime Value</h2>
        {lifetimeValue ? (
          <div>{/* Render Lifetime Value insights */}</div>
        ) : (
          <p>No lifetime value data</p>
        )}
      </div>

      {/* Retention Rate */}
      <div>
        <h2>Retention Rate</h2>
        {retentionRate ? (
          <div>{/* Render Retention Rate insights */}</div>
        ) : (
          <p>No retention rate data</p>
        )}
      </div>

      {/* New Vs Returning */}
      <div>
        <h2>New vs Returning Customers</h2>
        {newVsReturning ? (
          <div>{/* Render New vs Returning insights */}</div>
        ) : (
          <p>No new vs returning data</p>
        )}
      </div>

      {/* Top Customers */}
      <div>
        <h2>Top Customers</h2>
        {topCustomers ? (
          <div>{/* Render Top Customers insights */}</div>
        ) : (
          <p>No top customers data</p>
        )}
      </div>
    </div>
  );
};

export default CustomerInsightsPage;
