/*
  Warnings:

  - Added the required column `reason` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `PaymentLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `PaymentLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PaymentLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PaymentLog" ADD COLUMN     "reason" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
