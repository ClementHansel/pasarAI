-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);
