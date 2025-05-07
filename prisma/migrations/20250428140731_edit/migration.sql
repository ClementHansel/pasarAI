/*
  Warnings:

  - You are about to drop the column `subregionId` on the `Market` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_subregionId_fkey";

-- AlterTable
ALTER TABLE "Market" DROP COLUMN "subregionId",
ADD COLUMN     "subRegionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_subRegionId_fkey" FOREIGN KEY ("subRegionId") REFERENCES "SubRegion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
