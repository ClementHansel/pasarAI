import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET endpoint to fetch all markets
export async function GET() {
  try {
    const markets = await prisma.market.findMany();
    return NextResponse.json(markets);
  } catch (error) {
    console.error("Error fetching markets:", error);
    return NextResponse.json(
      { message: "Error fetching markets" },
      { status: 500 }
    );
  }
}
