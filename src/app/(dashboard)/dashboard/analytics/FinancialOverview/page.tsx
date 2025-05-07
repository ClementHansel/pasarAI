"use client";

import { useEffect, useState } from "react";
import AccountsPayable from "@/components/dashboard/analyticals/FinancialOverview/AccountsPayable";
import AccountsReceivable from "@/components/dashboard/analyticals/FinancialOverview/AccountsReceivable";
import BudgetVsActual from "@/components/dashboard/analyticals/FinancialOverview/BudgetVsActual";
import CashFlowSummary from "@/components/dashboard/analyticals/FinancialOverview/CashFlow";
import EBITDA from "@/components/dashboard/analyticals/FinancialOverview/EBITDA";
import FinancialRatios from "@/components/dashboard/analyticals/FinancialOverview/FinancialRatios";
import MonthlyFinancialReport from "@/components/dashboard/analyticals/FinancialOverview/MonthlyFinancialReport";
import NetProfit from "@/components/dashboard/analyticals/FinancialOverview/NetProfit";
import OperatingExpenses from "@/components/dashboard/analyticals/FinancialOverview/OperatingExpenses";
import ProfitMargin from "@/components/dashboard/analyticals/FinancialOverview/ProfitMargin";
import RefundsReturns from "@/components/dashboard/analyticals/FinancialOverview/RefundsReturns";
import RevenueBreakdown from "@/components/dashboard/analyticals/FinancialOverview/RevenueBreakdown";
import TaxSummary from "@/components/dashboard/analyticals/FinancialOverview/TaxSummary";
import { FinancialOverviewData } from "@/types/analytical/financial";

export default function FinancialOverviewPage() {
  const [data, setData] = useState<FinancialOverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/analytics/FinancialOverview", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch financial data");
        }

        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Loading financial data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 text-center">{error}</div>;
  }

  if (!data) {
    return <div className="p-4 text-center">No data available.</div>;
  }

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">💰 Financial Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AccountsPayable payables={data.accountsPayable} />
        <AccountsReceivable receivables={data.accountsReceivable} />
        <BudgetVsActual
          months={data.budgetVsActual.months}
          budget={data.budgetVsActual.budget}
          actual={data.budgetVsActual.actual}
        />
        <CashFlowSummary data={data.cashFlow} />
        <EBITDA
          labels={data.ebitda.map((e) => e.month)}
          values={data.ebitda.map((e) => e.value)}
        />
        <FinancialRatios
          labels={["Debt to Equity", "Current Ratio"]}
          values={[
            data.financialRatios.debtToEquity[0] ?? 0,
            data.financialRatios.currentRatio[0] ?? 0,
          ]}
        />
        <MonthlyFinancialReport
          labels={data.monthlyFinancialReport.map((m) => m.month)}
          revenue={data.monthlyFinancialReport.map((m) => m.revenue)}
          expenses={data.monthlyFinancialReport.map((m) => m.expenses)}
        />
        {/* Ensure the proper calculation of net profit */}
        <NetProfit
          revenue={data.monthlyFinancialReport.reduce(
            (acc, curr) => acc + curr.revenue,
            0
          )}
          expenses={data.monthlyFinancialReport.reduce(
            (acc, curr) => acc + curr.expenses,
            0
          )}
        />
        <OperatingExpenses
          expenses={
            Array.isArray(data.operatingExpenses)
              ? data.operatingExpenses
              : [{ category: "Total", amount: data.operatingExpenses }]
          }
        />
        <ProfitMargin
          revenue={data.netProfit}
          cost={
            typeof data.operatingExpenses === "number"
              ? data.operatingExpenses
              : 0
          }
        />
        <RefundsReturns
          refunds={data.refundsReturns?.refunds ?? 0}
          returns={data.refundsReturns?.returns ?? 0}
        />
        <RevenueBreakdown
          labels={data.revenueBreakdown?.map((rb) => rb.productCategory) ?? []}
          data={data.revenueBreakdown?.map((rb) => rb.revenue) ?? []}
        />
        <TaxSummary
          taxData={[
            {
              taxType: "Tax Rate", // Example tax type
              amount: data.taxSummary.taxRate, // Example tax amount
            },
            {
              taxType: "Tax Amount", // Example tax type
              amount: data.taxSummary.taxAmount, // Example tax amount
            },
          ]}
        />
      </div>
    </div>
  );
}
