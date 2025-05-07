/*
  Warnings:

  - You are about to drop the column `budgetVsActualActual` on the `FinancialOverview` table. All the data in the column will be lost.
  - You are about to drop the column `budgetVsActualBudget` on the `FinancialOverview` table. All the data in the column will be lost.
  - Added the required column `budgetVsActual` to the `FinancialOverview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FinancialOverview" DROP COLUMN "budgetVsActualActual",
DROP COLUMN "budgetVsActualBudget",
ADD COLUMN     "budgetVsActual" DOUBLE PRECISION NOT NULL;
