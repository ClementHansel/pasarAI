/*
  Warnings:

  - A unique constraint covering the columns `[referralCode]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `referralCode` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "referralCode" TEXT NOT NULL,
ADD COLUMN     "referredById" TEXT;

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "referredId" TEXT NOT NULL,
    "giftcardId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_referralCode_key" ON "Account"("referralCode");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_referredById_fkey" FOREIGN KEY ("referredById") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referredId_fkey" FOREIGN KEY ("referredId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_giftcardId_fkey" FOREIGN KEY ("giftcardId") REFERENCES "Giftcard"("id") ON DELETE SET NULL ON UPDATE CASCADE;
