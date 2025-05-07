-- AlterTable
ALTER TABLE "FinancialRatio" ADD COLUMN     "currentRatioOverviewId" INTEGER,
ADD COLUMN     "debtToEquityOverviewId" INTEGER;

-- AddForeignKey
ALTER TABLE "FinancialRatio" ADD CONSTRAINT "FinancialRatio_debtToEquityOverviewId_fkey" FOREIGN KEY ("debtToEquityOverviewId") REFERENCES "FinancialOverview"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialRatio" ADD CONSTRAINT "FinancialRatio_currentRatioOverviewId_fkey" FOREIGN KEY ("currentRatioOverviewId") REFERENCES "FinancialOverview"("id") ON DELETE SET NULL ON UPDATE CASCADE;
