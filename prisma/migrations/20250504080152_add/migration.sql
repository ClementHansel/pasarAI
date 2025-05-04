/*
  Warnings:

  - You are about to drop the `EmployeePerformance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeSatisfaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PayrollStatus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TasksWorkflow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamCollaborationScore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkingHoursSummary` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "EmployeePerformance";

-- DropTable
DROP TABLE "EmployeeSatisfaction";

-- DropTable
DROP TABLE "PayrollStatus";

-- DropTable
DROP TABLE "TasksWorkflow";

-- DropTable
DROP TABLE "TeamCollaborationScore";

-- DropTable
DROP TABLE "TrainingProgress";

-- DropTable
DROP TABLE "WorkingHoursSummary";

-- CreateTable
CREATE TABLE "Performance" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Satisfaction" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "satisfactionScore" INTEGER NOT NULL,
    "surveyDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Satisfaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payroll" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payroll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "taskName" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collaboration" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collaboration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "trainingCourse" TEXT NOT NULL,
    "completionStatus" TEXT NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingHours" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "hoursWorked" DOUBLE PRECISION NOT NULL,
    "weekStartDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkingHours_pkey" PRIMARY KEY ("id")
);
