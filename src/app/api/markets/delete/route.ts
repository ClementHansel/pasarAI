
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// DELETE endpoint to delete a market
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    // Validation
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const deletedMarket = await prisma.market.delete({
      where: { id },
    });

    return NextResponse.json(deletedMarket);
  } catch (error) {
    console.error("Error deleting market:", error);
    return NextResponse.json(
      { message: "Error deleting market" },
      { status: 500 }
    );
  }
}