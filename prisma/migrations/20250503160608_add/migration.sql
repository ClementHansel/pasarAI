-- CreateTable
CREATE TABLE "CustomerMetric" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "activeUsers" INTEGER,
    "churnRate" DOUBLE PRECISION,
    "acquisitionCost" DOUBLE PRECISION,
    "newCustomers" INTEGER,
    "lifetimeValue" DOUBLE PRECISION,
    "retentionRate" DOUBLE PRECISION,
    "newCustomerCount" INTEGER,
    "returningCustomerCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerMetric_pkey" PRIMARY KEY ("id")
);
