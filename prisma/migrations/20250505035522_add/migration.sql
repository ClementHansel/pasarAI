-- CreateTable
CREATE TABLE "NetProfit" (
    "id" SERIAL NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "expenses" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "NetProfit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperatingExpense" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "OperatingExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfitMargin" (
    "id" SERIAL NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ProfitMargin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefundsReturn" (
    "id" SERIAL NOT NULL,
    "refunds" DOUBLE PRECISION NOT NULL,
    "returns" INTEGER NOT NULL,

    CONSTRAINT "RefundsReturn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevenueBreakdown" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RevenueBreakdown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxSummary" (
    "id" SERIAL NOT NULL,
    "taxType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "TaxSummary_pkey" PRIMARY KEY ("id")
);
