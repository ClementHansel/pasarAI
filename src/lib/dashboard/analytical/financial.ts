// import { db } from "@/lib/db/db";
// import { FinancialOverviewData } from "@/types/analytical/financial"; // Import your data types

// /**
//  * Fetch financial data for a given account ID.
//  *
//  * @param accountId - The account ID to fetch the data for.
//  * @returns The financial data or null if not found.
//  */
// export const fetchFinancialData = async (
//   accountId: string
// ): Promise<FinancialOverviewData | null> => {
//   try {
//     // Use findFirst since accountId is not unique, or use findUnique if accountId is unique
//     const financialData = await db.financialOverview.findFirst({
//       where: {
//         accountId: accountId, // Use accountId to find the first match
//       },
//     });

//     if (!financialData) {
//       return null;
//     }

//     // Map the Prisma data to the FinancialOverviewData interface
//     const mappedData: FinancialOverviewData = {
//       accountsPayable: financialData.accountsPayable,
//       accountsReceivable: financialData.accountsReceivable,
//       budgetVsActual: {
//         budget: financialData.budgetVsActualBudget,
//         actual: financialData.budgetVsActualActual,
//       },
//       cashFlow: financialData.cashFlow,
//       ebitda: financialData.ebitda,
//       financialRatios: {
//         debtToEquity: financialData.financialRatiosDebtToEquity,
//         currentRatio: financialData.financialRatiosCurrentRatio,
//       },
//       monthlyFinancialReport: {
//         month: financialData.monthlyFinancialReportMonth,
//         revenue: financialData.monthlyFinancialReportRevenue,
//         expenses: financialData.monthlyFinancialReportExpenses,
//       },
//       netProfit: financialData.netProfit,
//       operatingExpenses: financialData.operatingExpenses,
//       profitMargin: financialData.profitMargin,
//       refundsReturns: financialData.refundsReturns,
//       revenueBreakdown: financialData.revenueBreakdown as {
//         productCategory: string;
//         revenue: number;
//       }[], // Assuming the JSON is already in the correct format
//       taxSummary: {
//         taxRate: financialData.taxSummaryTaxRate,
//         taxAmount: financialData.taxSummaryTaxAmount,
//       },
//     };

//     return mappedData;
//   } catch (error) {
//     console.error("Error fetching financial data:", error);
//     throw new Error("Failed to fetch financial data.");
//   }
// };
