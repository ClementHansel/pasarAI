/*
  Warnings:

  - The primary key for the `City` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `City` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cityId` column on the `Market` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `regionId` column on the `Market` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `subregionId` column on the `Market` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Region` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Region` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Subregion` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Region` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subRegionId` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_cityId_fkey";

-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_regionId_fkey";

-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_subregionId_fkey";

-- AlterTable
ALTER TABLE "City" DROP CONSTRAINT "City_pkey",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "subRegionId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "City_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Market" DROP COLUMN "cityId",
ADD COLUMN     "cityId" INTEGER,
DROP COLUMN "regionId",
ADD COLUMN     "regionId" INTEGER,
DROP COLUMN "subregionId",
ADD COLUMN     "subregionId" INTEGER;

-- AlterTable
ALTER TABLE "Region" DROP CONSTRAINT "Region_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Region_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Subregion";

-- CreateTable
CREATE TABLE "SubRegion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "regionId" INTEGER NOT NULL,

    CONSTRAINT "SubRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AccountCities" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AccountCities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AccountCities_B_index" ON "_AccountCities"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Region_name_key" ON "Region"("name");

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_subregionId_fkey" FOREIGN KEY ("subregionId") REFERENCES "SubRegion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubRegion" ADD CONSTRAINT "SubRegion_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_subRegionId_fkey" FOREIGN KEY ("subRegionId") REFERENCES "SubRegion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountCities" ADD CONSTRAINT "_AccountCities_A_fkey" FOREIGN KEY ("A") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AccountCities" ADD CONSTRAINT "_AccountCities_B_fkey" FOREIGN KEY ("B") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
