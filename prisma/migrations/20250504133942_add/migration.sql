/*
  Warnings:

  - You are about to drop the column `employeeId` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Collaboration` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Payroll` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Performance` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Satisfaction` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `Training` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `WorkingHours` table. All the data in the column will be lost.
  - Added the required column `accountId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Collaboration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Payroll` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Satisfaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `Training` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `WorkingHours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "employeeId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Collaboration" DROP COLUMN "employeeId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payroll" DROP COLUMN "employeeId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Performance" DROP COLUMN "employeeId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Satisfaction" DROP COLUMN "employeeId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "employeeId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "employeeId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkingHours" DROP COLUMN "employeeId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Attendance_accountId_idx" ON "Attendance"("accountId");

-- CreateIndex
CREATE INDEX "Collaboration_accountId_idx" ON "Collaboration"("accountId");

-- CreateIndex
CREATE INDEX "Payroll_accountId_idx" ON "Payroll"("accountId");

-- CreateIndex
CREATE INDEX "Performance_accountId_idx" ON "Performance"("accountId");

-- CreateIndex
CREATE INDEX "Satisfaction_accountId_idx" ON "Satisfaction"("accountId");

-- CreateIndex
CREATE INDEX "Task_accountId_idx" ON "Task"("accountId");

-- CreateIndex
CREATE INDEX "Training_accountId_idx" ON "Training"("accountId");

-- CreateIndex
CREATE INDEX "WorkingHours_accountId_idx" ON "WorkingHours"("accountId");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Satisfaction" ADD CONSTRAINT "Satisfaction_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collaboration" ADD CONSTRAINT "Collaboration_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkingHours" ADD CONSTRAINT "WorkingHours_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
