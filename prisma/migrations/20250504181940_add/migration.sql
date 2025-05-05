/*
  Warnings:

  - You are about to drop the column `cashFlow` on the `FinancialOverview` table. All the data in the column will be lost.
  - You are about to drop the column `ebitda` on the `FinancialOverview` table. All the data in the column will be lost.
  - You are about to drop the column `financialRatiosCurrentRatio` on the `FinancialOverview` table. All the data in the column will be lost.
  - You are about to drop the column `financialRatiosDebtToEquity` on the `FinancialOverview` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyFinancialReportExpenses` on the `FinancialOverview` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyFinancialReportMonth` on the `FinancialOverview` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyFinancialReportRevenue` on the `FinancialOverview` table. All the data in the column will be lost.
  - Added the required column `financialOverviewId` to the `CashFlow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financialOverviewId` to the `EBITDA` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financialOverviewId` to the `FinancialRatio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financialOverviewId` to the `MonthlyFinancialReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CashFlow" ADD COLUMN     "financialOverviewId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EBITDA" ADD COLUMN     "financialOverviewId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FinancialOverview" DROP COLUMN "cashFlow",
DROP COLUMN "ebitda",
DROP COLUMN "financialRatiosCurrentRatio",
DROP COLUMN "financialRatiosDebtToEquity",
DROP COLUMN "monthlyFinancialReportExpenses",
DROP COLUMN "monthlyFinancialReportMonth",
DROP COLUMN "monthlyFinancialReportRevenue";

-- AlterTable
ALTER TABLE "FinancialRatio" ADD COLUMN     "financialOverviewId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MonthlyFinancialReport" ADD COLUMN     "financialOverviewId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CashFlow" ADD CONSTRAINT "CashFlow_financialOverviewId_fkey" FOREIGN KEY ("financialOverviewId") REFERENCES "FinancialOverview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EBITDA" ADD CONSTRAINT "EBITDA_financialOverviewId_fkey" FOREIGN KEY ("financialOverviewId") REFERENCES "FinancialOverview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialRatio" ADD CONSTRAINT "FinancialRatio_financialOverviewId_fkey" FOREIGN KEY ("financialOverviewId") REFERENCES "FinancialOverview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyFinancialReport" ADD CONSTRAINT "MonthlyFinancialReport_financialOverviewId_fkey" FOREIGN KEY ("financialOverviewId") REFERENCES "FinancialOverview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
