/*
  Warnings:

  - You are about to drop the column `userId` on the `VoucherRedemptionLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "VoucherRedemptionLog" DROP COLUMN "userId",
ADD COLUMN     "accountId" TEXT;
