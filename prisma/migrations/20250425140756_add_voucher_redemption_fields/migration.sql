-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "expiryDate" TIMESTAMP(3),
ADD COLUMN     "isRedeemed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "redeemedAt" TIMESTAMP(3),
ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "VoucherRedemptionLog" (
    "id" TEXT NOT NULL,
    "voucherId" TEXT NOT NULL,
    "userId" TEXT,
    "redeemedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "reason" TEXT,

    CONSTRAINT "VoucherRedemptionLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VoucherRedemptionLog" ADD CONSTRAINT "VoucherRedemptionLog_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
