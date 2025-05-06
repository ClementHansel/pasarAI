"use client";
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
import { RouteGuard } from "@/components/auth/RouteGuard";

export default function FinancialOverviewPage() {
  return (
    <RouteGuard allowedRoles={["SELLER"]}>
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
    </RouteGuard>
  );
}
