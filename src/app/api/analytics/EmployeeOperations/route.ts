import { db } from "@/lib/db/db"; // Import Prisma client
import { NextResponse } from "next/server";
import { withSellerAuth } from "@/lib/middleware"; // For authentication
import { UserRequest } from "@/types/api"; // User request types

export async function GET(request: UserRequest) {
  const { searchParams } = new URL(request.url);
  const metric = searchParams.get("metric"); // Get the metric from query params

  const sellerId = request.user?.id; // Seller ID from authenticated user

  if (!sellerId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    switch (metric) {
      case "attendance": {
        // Fetch attendance data from Prisma
        const attendance = await db.attendance.findMany({
          where: { accountId: sellerId },
          select: { date: true, status: true },
          orderBy: { date: "asc" },
        });

        return NextResponse.json(attendance);
      }

      case "performance": {
        // Fetch employee performance data from Prisma
        const performance = await db.performance.findMany({
          where: { accountId: sellerId },
          select: { reviewDate: true, score: true },
          orderBy: { reviewDate: "asc" },
        });

        return NextResponse.json(performance);
      }

      case "satisfaction": {
        // Fetch employee satisfaction data from Prisma
        const satisfaction = await db.satisfaction.findMany({
          where: { accountId: sellerId },
          select: { surveyDate: true, satisfactionScore: true },
          orderBy: { surveyDate: "asc" },
        });

        return NextResponse.json(satisfaction);
      }

      case "payroll": {
        // Fetch payroll data from Prisma
        const payroll = await db.payroll.findMany({
          where: { accountId: sellerId },
          select: { paymentDate: true, salary: true },
          orderBy: { paymentDate: "asc" },
        });

        return NextResponse.json(payroll);
      }

      case "task": {
        // Fetch task workflow data from Prisma
        const task = await db.task.findMany({
          where: { accountId: sellerId },
          select: { taskName: true, dueDate: true },
          orderBy: { dueDate: "asc" },
        });

        return NextResponse.json(task);
      }

      case "collaboration": {
        // Fetch team collaboration scores from Prisma
        const collaboration = await db.collaboration.findMany({
          where: { accountId: sellerId },
          select: { reviewDate: true, score: true },
          orderBy: { reviewDate: "asc" },
        });

        return NextResponse.json(collaboration);
      }

      case "training": {
        // Fetch training progress data from Prisma
        const training = await db.training.findMany({
          where: { accountId: sellerId },
          select: { completionStatus: true, trainingCourse: true },
          orderBy: { completionStatus: "asc" },
        });

        return NextResponse.json(training);
      }

      case "workingHours": {
        // Fetch working hours summary from Prisma
        const workingHours = await db.workingHours.findMany({
          where: { accountId: sellerId },
          select: { weekStartDate: true, hoursWorked: true },
          orderBy: { weekStartDate: "asc" },
        });

        return NextResponse.json(workingHours);
      }

      default:
        return NextResponse.json({ error: "Invalid metric" }, { status: 400 });
    }
  } catch (error) {
    console.error("EmployeeOperations API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export const handler = withSellerAuth(GET);
