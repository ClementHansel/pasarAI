/*
  Warnings:

  - A unique constraint covering the columns `[currencyId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currencyId` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Currency` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "currencyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Currency" ADD COLUMN     "accountId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_currencyId_key" ON "Account"("currencyId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
