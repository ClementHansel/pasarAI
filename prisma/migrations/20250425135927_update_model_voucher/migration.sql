/*
  Warnings:

  - You are about to alter the column `value` on the `Voucher` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Made the column `createdBy` on table `Voucher` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Voucher" ALTER COLUMN "createdBy" SET NOT NULL,
ALTER COLUMN "value" SET DATA TYPE INTEGER;
