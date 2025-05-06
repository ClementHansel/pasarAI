// src/lib/db/financial.ts
import { db } from "@/lib/db/db";
import {
  // FinancialOverview,
  AccountsPayable,
  AccountsReceivable,
  BudgetVsActual,
  CashFlow,
  EBITDA,
  FinancialRatio,
  MonthlyFinancialReport,
  RefundsReturn,
  TaxSummary,
  RevenueBreakdown,
} from "@prisma/client";

/**
 * Type definition for financial overview data (matches Prisma model)
 */
export interface FinancialOverviewData {
  id: number;
  accountId: string;
  netProfit: number;
  operatingExpenses: number;
  profitMargin: number;
  refundsReturnsId: number | null;
  taxSummaryId: number | null;
  accountsPayable: AccountsPayable[];
  accountsReceivable: AccountsReceivable[];
  budgetVsActual: BudgetVsActual[];
  cashFlow: CashFlow[];
  ebitda: EBITDA[];
  financialRatio: FinancialRatio[];
  financialRatiosDebtToEquity: FinancialRatio[];
  financialRatiosCurrentRatio: FinancialRatio[];
  monthlyFinancialReport: MonthlyFinancialReport[];
  refundsReturns: RefundsReturn | null;
  revenueBreakdowns: RevenueBreakdown[];
  taxSummary: TaxSummary | null;
}

/**
 * Fetch financial data for a given account ID.
 * @param accountId - The account ID to fetch the data for.
 * @returns The financial data or null if not found.
 */
export const fetchFinancialData = async (
  accountId: string
): Promise<FinancialOverviewData | null> => {
  try {
    const financialData = await db.financialOverview.findFirst({
      where: {
        accountId,
      },
      include: {
        accountsPayable: true,
        accountsReceivable: true,
        budgetVsActual: true,
        cashFlow: true,
        ebitda: true,
        financialRatio: true,
        financialRatiosDebtToEquity: true,
        financialRatiosCurrentRatio: true,
        monthlyFinancialReport: true,
        refundsReturns: true,
        revenueBreakdowns: true,
        taxSummary: true,
      },
    });

    if (!financialData) {
      return null;
    }

    // Return the data as is (Prisma already includes relations)
    return financialData;
  } catch (error) {
    console.error("Error fetching financial data:", error);
    throw new Error("Failed to fetch financial data.");
  }
};
