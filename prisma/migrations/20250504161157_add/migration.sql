/*
  Warnings:

  - You are about to drop the column `createdAt` on the `AccountsReceivable` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `AccountsReceivable` table. All the data in the column will be lost.
  - You are about to drop the column `accountsReceivable` on the `FinancialOverview` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `AccountsReceivable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `financialId` to the `AccountsReceivable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountsReceivable" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "financialId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "FinancialOverview" DROP COLUMN "accountsReceivable";

-- AddForeignKey
ALTER TABLE "AccountsReceivable" ADD CONSTRAINT "AccountsReceivable_financialId_fkey" FOREIGN KEY ("financialId") REFERENCES "FinancialOverview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccountsReceivable" ADD CONSTRAINT "AccountsReceivable_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
