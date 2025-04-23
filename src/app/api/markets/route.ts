import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch all markets
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

// POST: Create a new market
export async function POST(request: Request) {
  try {
    const { name, location, revenue } = await request.json();

    if (!name || !location || !revenue) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newMarket = await prisma.market.create({
      data: { name, location, revenue },
    });

    return NextResponse.json(newMarket, { status: 201 });
  } catch (error) {
    console.error("Error creating market:", error);
    return NextResponse.json(
      { message: "Error creating market" },
      { status: 500 }
    );
  }
}

// PUT: Update a market
export async function PUT(request: Request) {
  try {
    const { id, name, location, revenue } = await request.json();

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

// DELETE: Delete a market
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

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
