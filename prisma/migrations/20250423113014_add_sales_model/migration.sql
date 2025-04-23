/*
  Warnings:

  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Sale";

-- CreateTable
CREATE TABLE "Sales" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Sales_pkey" PRIMARY KEY ("id")
);
