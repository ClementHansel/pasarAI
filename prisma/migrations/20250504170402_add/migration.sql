/*
  Warnings:

  - You are about to drop the column `financialId` on the `AccountsReceivable` table. All the data in the column will be lost.
  - Added the required column `financialOverviewId` to the `AccountsReceivable` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AccountsReceivable" DROP CONSTRAINT "AccountsReceivable_financialId_fkey";

-- AlterTable
ALTER TABLE "AccountsReceivable" DROP COLUMN "financialId",
ADD COLUMN     "financialOverviewId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AccountsReceivable" ADD CONSTRAINT "AccountsReceivable_financialOverviewId_fkey" FOREIGN KEY ("financialOverviewId") REFERENCES "FinancialOverview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
