-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_currencyId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "currencyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE SET NULL ON UPDATE CASCADE;
