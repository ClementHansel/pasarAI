-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "activityType" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);
