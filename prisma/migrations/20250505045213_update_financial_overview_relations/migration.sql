/*
  Warnings:

  - You are about to drop the column `refundsReturns` on the `FinancialOverview` table. All the data in the column will be lost.
  - You are about to drop the column `revenueBreakdown` on the `FinancialOverview` table. All the data in the column will be lost.
  - You are about to drop the column `taxSummaryTaxAmount` on the `FinancialOverview` table. All the data in the column will be lost.
  - You are about to drop the column `taxSummaryTaxRate` on the `FinancialOverview` table. All the data in the column will be lost.
  - You are about to drop the column `amount` on the `TaxSummary` table. All the data in the column will be lost.
  - You are about to drop the column `taxType` on the `TaxSummary` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[refundsReturnsId]` on the table `FinancialOverview` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[taxSummaryId]` on the table `FinancialOverview` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[financialOverviewId]` on the table `RefundsReturn` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[financialOverviewId]` on the table `TaxSummary` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `financialOverviewId` to the `RevenueBreakdown` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxAmount` to the `TaxSummary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxRate` to the `TaxSummary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FinancialOverview" DROP COLUMN "refundsReturns",
DROP COLUMN "revenueBreakdown",
DROP COLUMN "taxSummaryTaxAmount",
DROP COLUMN "taxSummaryTaxRate",
ADD COLUMN     "refundsReturnsId" INTEGER,
ADD COLUMN     "taxSummaryId" INTEGER;

-- AlterTable
ALTER TABLE "RefundsReturn" ADD COLUMN     "financialOverviewId" INTEGER;

-- AlterTable
ALTER TABLE "RevenueBreakdown" ADD COLUMN     "financialOverviewId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TaxSummary" DROP COLUMN "amount",
DROP COLUMN "taxType",
ADD COLUMN     "financialOverviewId" INTEGER,
ADD COLUMN     "taxAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "taxRate" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FinancialOverview_refundsReturnsId_key" ON "FinancialOverview"("refundsReturnsId");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialOverview_taxSummaryId_key" ON "FinancialOverview"("taxSummaryId");

-- CreateIndex
CREATE UNIQUE INDEX "RefundsReturn_financialOverviewId_key" ON "RefundsReturn"("financialOverviewId");

-- CreateIndex
CREATE UNIQUE INDEX "TaxSummary_financialOverviewId_key" ON "TaxSummary"("financialOverviewId");

-- AddForeignKey
ALTER TABLE "FinancialOverview" ADD CONSTRAINT "FinancialOverview_refundsReturnsId_fkey" FOREIGN KEY ("refundsReturnsId") REFERENCES "RefundsReturn"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialOverview" ADD CONSTRAINT "FinancialOverview_taxSummaryId_fkey" FOREIGN KEY ("taxSummaryId") REFERENCES "TaxSummary"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevenueBreakdown" ADD CONSTRAINT "RevenueBreakdown_financialOverviewId_fkey" FOREIGN KEY ("financialOverviewId") REFERENCES "FinancialOverview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
