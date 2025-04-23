/*
  Warnings:

  - The `value` column on the `Voucher` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `type` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "createdBy" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "discount" DROP NOT NULL,
DROP COLUMN "value",
ADD COLUMN     "value" DOUBLE PRECISION;
