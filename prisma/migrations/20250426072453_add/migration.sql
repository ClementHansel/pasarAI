/*
  Warnings:

  - You are about to drop the column `userId` on the `AnalyticsEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AnalyticsEvent" DROP COLUMN "userId",
ADD COLUMN     "accountId" TEXT;
