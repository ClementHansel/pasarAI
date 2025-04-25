/*
  Warnings:

  - The values [CONSUMER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `activityType` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucherType` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('VIEW', 'PURCHASE', 'LIKE', 'SHARE');

-- CreateEnum
CREATE TYPE "VoucherType" AS ENUM ('MANUAL', 'REFERRAL');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'SELLER', 'BUYER');
ALTER TABLE "Account" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Account" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Account" ALTER COLUMN "role" SET DEFAULT 'BUYER';
COMMIT;

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "activityType" "ActivityType" NOT NULL,
ADD COLUMN     "voucherType" "VoucherType" NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'BUYER';

-- AlterTable
ALTER TABLE "Activity" ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "accountId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Sales" ALTER COLUMN "productId" SET DATA TYPE TEXT,
ALTER COLUMN "accountId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Wishlist" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
