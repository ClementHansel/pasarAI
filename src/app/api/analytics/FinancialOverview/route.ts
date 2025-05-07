import { NextResponse } from "next/server";
import {
  withSellerAuth,
  withAdminAuth,
  AuthenticatedRequest,
} from "@/lib/middleware";
import { db } from "@/lib/db/db";
import { FinancialOverviewData } from "@/types/analytical/financial";
import { Prisma } from "@prisma/client";

const financialWithRelations =
  Prisma.validator<Prisma.FinancialOverviewInclude>()({
    accountsPayable: true,
    accountsReceivable: true,
    budgetVsActual: true,
    cashFlow: true,
    ebitda: true,
    financialRatio: true,
    financialRatiosDebtToEquity: true,
    financialRatiosCurrentRatio: true,
    monthlyFinancialReport: true,
    revenueBreakdowns: true,
    refundsReturns: true,
    taxSummary: true,
  });

type FinancialWithRelations = Prisma.FinancialOverviewGetPayload<{
  include: typeof financialWithRelations;
}>;

const fetchFinancialData = async (
  accountId: string
): Promise<FinancialOverviewData | null> => {
  const financialData: FinancialWithRelations | null =
    await db.financialOverview.findFirst({
      where: { accountId },
      include: financialWithRelations,
    });

  if (!financialData) return null;

  return {
    accountsPayable: financialData.accountsPayable.map((payable) => ({
      id: payable.id,
      vendor: payable.vendor,
      amount: payable.amount,
      dueDate: payable.dueDate,
      status: payable.status,
    })),
    accountsReceivable: financialData.accountsReceivable.map((receivable) => ({
      id: receivable.id,
      client: receivable.client,
      amount: receivable.amount,
      dueDate: receivable.dueDate,
      status: receivable.status as "Overdue" | "Pending" | "Paid",
    })),
    budgetVsActual: {
      months: financialData.budgetVsActual.map((entry) => entry.month),
      budget: financialData.budgetVsActual.map((entry) => entry.budget),
      actual: financialData.budgetVsActual.map((entry) => entry.actual),
    },
    cashFlow: financialData.cashFlow.map((flow) => ({
      id: flow.id,
      description: flow.description,
      amount: flow.amount,
      type: flow.type,
      createdAt: flow.createdAt,
      financialOverviewId: flow.financialOverviewId.toString(),
    })),
    ebitda: financialData.ebitda.map((e) => ({
      month: e.month, // Assuming 'month' is a property of each ebitda entry
      value: e.value, // The value should be retained as-is
    })),
    financialRatios: {
      debtToEquity: financialData.financialRatiosDebtToEquity.map(
        (r) => r.value
      ),
      currentRatio: financialData.financialRatiosCurrentRatio.map(
        (r) => r.value
      ),
    },
    monthlyFinancialReport: financialData.monthlyFinancialReport.map(
      (report) => ({
        month: report.month,
        revenue: report.revenue,
        expenses: report.expenses,
      })
    ),
    netProfit: financialData.netProfit,
    operatingExpenses: Array.isArray(financialData.operatingExpenses)
      ? financialData.operatingExpenses
      : [{ category: "Total", amount: financialData.operatingExpenses ?? 0 }],
    profitMargin: financialData.profitMargin,
    refundsReturns:
      typeof financialData.refundsReturns === "object" &&
      financialData.refundsReturns !== null
        ? financialData.refundsReturns
        : {
            refunds:
              typeof financialData.refundsReturns === "number"
                ? financialData.refundsReturns
                : 0,
            returns: 0,
          },
    revenueBreakdown: financialData.revenueBreakdowns.map((r) => ({
      productCategory: r.label,
      revenue: r.amount,
    })),
    taxSummary: financialData.taxSummary
      ? {
          taxRate: financialData.taxSummary.taxRate,
          taxAmount: financialData.taxSummary.taxAmount,
        }
      : {
          taxRate: 0,
          taxAmount: 0,
        },
  };
};

const handler = async (req: AuthenticatedRequest) => {
  const accountId = req.user?.id;

  if (!accountId) {
    return NextResponse.json(
      { error: "Account ID is missing." },
      { status: 400 }
    );
  }

  try {
    const financialData = await fetchFinancialData(accountId);

    if (!financialData) {
      return NextResponse.json(
        { error: "No financial data found." },
        { status: 404 }
      );
    }

    return NextResponse.json(financialData);
  } catch (error) {
    console.error("Error fetching financial data:", error);
    return NextResponse.json(
      { error: "Failed to fetch financial data." },
      { status: 500 }
    );
  }
};

export const GET = withSellerAuth(withAdminAuth(handler));
