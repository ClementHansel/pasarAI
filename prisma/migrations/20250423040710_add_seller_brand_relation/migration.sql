-- DropForeignKey
ALTER TABLE "Seller" DROP CONSTRAINT "Seller_brandId_fkey";

-- AlterTable
ALTER TABLE "Seller" ALTER COLUMN "brandId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Seller" ADD CONSTRAINT "Seller_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;
