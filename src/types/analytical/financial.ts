export interface FinancialOverviewData {
  accountsPayable: AccountsPayable[];
  accountsReceivable: AccountsReceivable[];
  budgetVsActual: {
    months: string[];
    budget: number[];
    actual: number[];
  };
  cashFlow: CashFlowItem[];
  ebitda: { month: string; value: number }[];
  financialRatios: {
    debtToEquity: number[];
    currentRatio: number[];
  }; // Changed from FinancialRatio[]
  monthlyFinancialReport: MonthlyFinanceEntry[];
  netProfit: number;
  operatingExpenses: number | { category: string; amount: number }[]; // Made flexible
  profitMargin: number;
  refundsReturns: {
    refunds: number;
    returns: number;
  };
  revenueBreakdown: RevenueBreakdown[];
  taxSummary: {
    taxRate: number;
    taxAmount: number;
  }; // Changed from TaxSummary[]
}

export interface AccountsPayable {
  id: string;
  vendor: string;
  amount: number;
  dueDate: Date;
  status: string;
}

export interface AccountsReceivable {
  id: string;
  client: string;
  dueDate: Date;
  amount: number;
  status: "Overdue" | "Pending" | "Paid";
}

export type CashFlowType = "Inflow" | "Outflow";

export interface CashFlowItem {
  id?: string;
  type: CashFlowType;
  description: string;
  amount: number;
  createdAt?: Date;
  financialOverviewId?: string;
}

export interface MonthlyFinanceEntry {
  month: string;
  revenue: number;
  expenses: number;
}

export interface RevenueBreakdown {
  productCategory: string;
  revenue: number;
}
