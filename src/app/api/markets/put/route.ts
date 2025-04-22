import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT endpoint to update a market
export async function PUT(request: Request) {
  try {
    const { id, name, location, revenue } = await request.json();

    // Basic validation
    if (!id || !name || !location || !revenue) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const updatedMarket = await prisma.market.update({
      where: { id },
      data: { name, location, revenue },
    });

    return NextResponse.json(updatedMarket);
  } catch (error) {
    console.error("Error updating market:", error);
    return NextResponse.json(
      { message: "Error updating market" },
      { status: 500 }
    );
  }
}