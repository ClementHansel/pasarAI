-- AlterTable
ALTER TABLE "EventLog" ADD COLUMN     "orderId" TEXT;

-- AddForeignKey
ALTER TABLE "EventLog" ADD CONSTRAINT "EventLog_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
