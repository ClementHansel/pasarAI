/*
  Warnings:

  - You are about to drop the column `budgetVsActual` on the `FinancialOverview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FinancialOverview" DROP COLUMN "budgetVsActual";

-- CreateTable
CREATE TABLE "BudgetVsActual" (
    "id" SERIAL NOT NULL,
    "month" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "actual" DOUBLE PRECISION NOT NULL,
    "financialOverviewId" INTEGER NOT NULL,

    CONSTRAINT "BudgetVsActual_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BudgetVsActual" ADD CONSTRAINT "BudgetVsActual_financialOverviewId_fkey" FOREIGN KEY ("financialOverviewId") REFERENCES "FinancialOverview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
