import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/db"; // Prisma client instance
import { z } from "zod";

// Define validation schema
const querySchema = z.object({
  accountId: z.string().min(1, "accountId is required"),
  page: z.string().optional(), // For pagination
  limit: z.string().optional(), // For pagination
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Validate query params
  const parseResult = querySchema.safeParse(
    Object.fromEntries(searchParams.entries())
  );
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { accountId, page = "1", limit = "20" } = parseResult.data;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  try {
    const [notifications, totalCount] = await Promise.all([
      db.notification.findMany({
        where: { accountId },
        orderBy: { createdAt: "desc" },
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
      }),
      db.notification.count({
        where: { accountId },
      }),
    ]);

    return NextResponse.json(
      {
        notifications,
        pagination: {
          total: totalCount,
          page: pageNumber,
          limit: limitNumber,
          totalPages: Math.ceil(totalCount / limitNumber),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
