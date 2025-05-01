-- DropForeignKey
ALTER TABLE "Market" DROP CONSTRAINT "Market_currencyId_fkey";

-- AlterTable
ALTER TABLE "Market" ALTER COLUMN "currencyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Market" ADD CONSTRAINT "Market_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
