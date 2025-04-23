/*
  Warnings:

  - You are about to drop the column `giftcardId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `giftcardId` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the `Giftcard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_giftcardId_fkey";

-- DropForeignKey
ALTER TABLE "Referral" DROP CONSTRAINT "Referral_giftcardId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "giftcardId",
ADD COLUMN     "voucherId" TEXT;

-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "giftcardId",
ADD COLUMN     "voucherId" TEXT;

-- DropTable
DROP TABLE "Giftcard";

-- CreateTable
CREATE TABLE "Voucher" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_code_key" ON "Voucher"("code");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
