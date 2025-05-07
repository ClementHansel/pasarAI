/*
  Warnings:

  - You are about to drop the column `accountsPayable` on the `FinancialOverview` table. All the data in the column will be lost.
  - Added the required column `financialOverviewId` to the `AccountsPayable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountsPayable" ADD COLUMN     "financialOverviewId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FinancialOverview" DROP COLUMN "accountsPayable";

-- AddForeignKey
ALTER TABLE "AccountsPayable" ADD CONSTRAINT "AccountsPayable_financialOverviewId_fkey" FOREIGN KEY ("financialOverviewId") REFERENCES "FinancialOverview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
