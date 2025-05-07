/*
  Warnings:

  - Changed the type of `type` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WalletTransactionType" AS ENUM ('TOPUP', 'INITIAL', 'WITHDRAW', 'REFUND', 'BILLS', 'REVENUE');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "type",
ADD COLUMN     "type" "WalletTransactionType" NOT NULL;
