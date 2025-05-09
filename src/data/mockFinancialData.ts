// src/data/mockFinancialData.ts

import { FinancialOverviewData } from "@/types/analytical/financial";

const mockFinancialData: FinancialOverviewData = {
  accountsPayable: [
    {
      id: "ap1",
      vendor: "Vendor A",
      amount: 5000,
      dueDate: new Date("2025-05-20"),
      status: "Pending",
    },
    {
      id: "ap2",
      vendor: "Vendor B",
      amount: 10000,
      dueDate: new Date("2025-06-15"),
      status: "Paid",
    },
  ],
  accountsReceivable: [
    {
      id: "ar1",
      client: "Client A",
      amount: 12000,
      dueDate: new Date("2025-05-25"),
      status: "Overdue",
    },
    {
      id: "ar2",
      client: "Client B",
      amount: 10000,
      dueDate: new Date("2025-06-10"),
      status: "Pending",
    },
  ],
  budgetVsActual: {
    months: ["Jan", "Feb", "Mar"],
    budget: [50000, 52000, 54000],
    actual: [48000, 53000, 50000],
  },
  cashFlow: [
    { type: "Inflow", description: "Sales", amount: 30000 },
    { type: "Outflow", description: "Rent", amount: 8000 },
    { type: "Inflow", description: "Consulting", amount: 2000 },
    { type: "Outflow", description: "Supplies", amount: 3000 },
    { type: "Inflow", description: "Investment", amount: 4000 },
    { type: "Outflow", description: "Utilities", amount: 2500 },
  ],
  ebitda: [
    { month: "Jan", value: 12000 },
    { month: "Feb", value: 13000 },
    { month: "Mar", value: 11000 },
  ],
  financialRatios: {
    debtToEquity: [1.5],
    currentRatio: [2.1],
  },
  monthlyFinancialReport: [
    { month: "Jan", revenue: 60000, expenses: 40000 },
    { month: "Feb", revenue: 62000, expenses: 41000 },
    { month: "Mar", revenue: 58000, expenses: 39000 },
  ],
  netProfit: 39000,
  operatingExpenses: [
    { category: "Salaries", amount: 20000 },
    { category: "Utilities", amount: 3000 },
    { category: "Rent", amount: 5000 },
  ],
  profitMargin: 0.25,
  refundsReturns: {
    refunds: 1200,
    returns: 800,
  },
  revenueBreakdown: [
    { productCategory: "Product A", revenue: 20000 },
    { productCategory: "Product B", revenue: 18000 },
    { productCategory: "Product C", revenue: 22000 },
  ],
  taxSummary: {
    taxRate: 15,
    taxAmount: 8700,
  },
};

export default mockFinancialData;
