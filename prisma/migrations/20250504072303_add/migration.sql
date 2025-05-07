-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeePerformance" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeePerformance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeSatisfaction" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "satisfactionScore" INTEGER NOT NULL,
    "surveyDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmployeeSatisfaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PayrollStatus" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PayrollStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TasksWorkflow" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "taskName" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TasksWorkflow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamCollaborationScore" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "reviewDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamCollaborationScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingProgress" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "trainingCourse" TEXT NOT NULL,
    "completionStatus" TEXT NOT NULL,

    CONSTRAINT "TrainingProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkingHoursSummary" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "hoursWorked" DOUBLE PRECISION NOT NULL,
    "weekStartDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkingHoursSummary_pkey" PRIMARY KEY ("id")
);
