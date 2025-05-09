"use client";

import { useEffect, useState } from "react";

import { FinancialOverviewData } from "@/types/analytical/financial";
import mockData from "@/data/mockFinancialData";
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

export default function FinancialOverviewPage() {
  const [data, setData] = useState<FinancialOverviewData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Commented out actual API and auth logic
      // const res = await fetch("/api/analytics/FinancialOverview", {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //   },
      // });

      // if (!res.ok) throw new Error("Failed to fetch financial data");
      // const json = await res.json();
      // setData(json);

      // Use mock data instead
      setData(mockData);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unexpected error occurred.");
    }
  }, []);

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!data) return <div className="p-4">Loading financial data...</div>;

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">💰 Financial Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <ProfitMargin
          revenue={data.netProfit}
          cost={
            typeof data.operatingExpenses === "number"
              ? data.operatingExpenses
              : data.operatingExpenses.reduce(
                  (acc, item) => acc + item.amount,
                  0
                )
          }
        />
        <RefundsReturns
          refunds={data.refundsReturns?.refunds ?? 0}
          returns={data.refundsReturns?.returns ?? 0}
        />
        <TaxSummary
          taxData={[
            {
              taxType: "Tax Rate",
              amount: data.taxSummary.taxRate,
            },
            {
              taxType: "Tax Amount",
              amount: data.taxSummary.taxAmount,
            },
          ]}
        />
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
        <MonthlyFinancialReport
          labels={data.monthlyFinancialReport.map((m) => m.month)}
          revenue={data.monthlyFinancialReport.map((m) => m.revenue)}
          expenses={data.monthlyFinancialReport.map((m) => m.expenses)}
        />

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
        <RevenueBreakdown
          labels={data.revenueBreakdown?.map((rb) => rb.productCategory) ?? []}
          data={data.revenueBreakdown?.map((rb) => rb.revenue) ?? []}
        />
        <FinancialRatios
          labels={["Debt to Equity", "Current Ratio"]}
          values={[
            data.financialRatios.debtToEquity[0] ?? 0,
            data.financialRatios.currentRatio[0] ?? 0,
          ]}
        />
      </div>
    </div>
  );
}
