"use client";
import AccountsPayable from "@/components/dashboard/FinancialOverview/AccountsPayable";
import AccountsReceivable from "@/components/dashboard/FinancialOverview/AccountsReceivable";
import BudgetVsActual from "@/components/dashboard/FinancialOverview/BudgetVsActual";
import CashFlowSummary from "@/components/dashboard/FinancialOverview/CashFlow";
import EBITDA from "@/components/dashboard/FinancialOverview/EBITDA";
import FinancialRatios from "@/components/dashboard/FinancialOverview/FinancialRatios";
import MonthlyFinancialReport from "@/components/dashboard/FinancialOverview/MonthlyFinancialReport";
import NetProfit from "@/components/dashboard/FinancialOverview/NetProfit";
import OperatingExpenses from "@/components/dashboard/FinancialOverview/OperatingExpenses";
import ProfitMargin from "@/components/dashboard/FinancialOverview/ProfitMargin";
import RefundsReturns from "@/components/dashboard/FinancialOverview/RefundsReturns";
import RevenueBreakdown from "@/components/dashboard/FinancialOverview/RevenueBreakdown";
import TaxSummary from "@/components/dashboard/FinancialOverview/TaxSummary";

export default function FinancialOverviewPage() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">💰 Financial Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AccountsPayable />
        <AccountsReceivable />
        <BudgetVsActual />
        <CashFlowSummary />
        <EBITDA />
        <FinancialRatios />
        <MonthlyFinancialReport />
        <NetProfit />
        <OperatingExpenses />
        <ProfitMargin />
        <RefundsReturns />
        <RevenueBreakdown />
        <TaxSummary />
      </div>
    </div>
  );
}
