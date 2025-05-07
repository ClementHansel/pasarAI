-- CreateTable
CREATE TABLE "FinancialOverview" (
    "id" SERIAL NOT NULL,
    "accountId" TEXT NOT NULL,
    "accountsPayable" DOUBLE PRECISION NOT NULL,
    "accountsReceivable" DOUBLE PRECISION NOT NULL,
    "budgetVsActualBudget" DOUBLE PRECISION NOT NULL,
    "budgetVsActualActual" DOUBLE PRECISION NOT NULL,
    "cashFlow" DOUBLE PRECISION NOT NULL,
    "ebitda" DOUBLE PRECISION NOT NULL,
    "financialRatiosDebtToEquity" DOUBLE PRECISION NOT NULL,
    "financialRatiosCurrentRatio" DOUBLE PRECISION NOT NULL,
    "monthlyFinancialReportMonth" TEXT NOT NULL,
    "monthlyFinancialReportRevenue" DOUBLE PRECISION NOT NULL,
    "monthlyFinancialReportExpenses" DOUBLE PRECISION NOT NULL,
    "netProfit" DOUBLE PRECISION NOT NULL,
    "operatingExpenses" DOUBLE PRECISION NOT NULL,
    "profitMargin" DOUBLE PRECISION NOT NULL,
    "refundsReturns" DOUBLE PRECISION NOT NULL,
    "revenueBreakdown" JSONB NOT NULL,
    "taxSummaryTaxRate" DOUBLE PRECISION NOT NULL,
    "taxSummaryTaxAmount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "FinancialOverview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FinancialOverview_accountId_idx" ON "FinancialOverview"("accountId");

-- AddForeignKey
ALTER TABLE "FinancialOverview" ADD CONSTRAINT "FinancialOverview_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
