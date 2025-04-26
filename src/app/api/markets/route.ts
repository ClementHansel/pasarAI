import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  MarketCreateSchema,
  MarketUpdateSchema,
  MarketDeleteSchema,
} from "@/lib/validation/marketSchemas";

const prisma = new PrismaClient();

// GET: Fetch all markets
export async function GET() {
  try {
    const markets = await prisma.market.findMany();
    return NextResponse.json({ success: true, data: markets }, { status: 200 });
  } catch (error) {
    console.error("GET /api/markets:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch markets." },
      { status: 500 }
    );
  }
}

// POST: Create a new market
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = MarketCreateSchema.parse(body);

    const newMarket = await prisma.$transaction(async (tx) => {
      return await tx.market.create({
        data: validated,
      });
    });

    return NextResponse.json(
      { success: true, data: newMarket },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/markets:", error);
    if (error instanceof Error && "issues" in error) {
      return NextResponse.json(
        { success: false, message: "Validation error", issues: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create market." },
      { status: 500 }
    );
  }
}

// PUT: Update an existing market
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = MarketUpdateSchema.parse(body);

    const updatedMarket = await prisma.$transaction(async (tx) => {
      return await tx.market.update({
        where: { id: validated.id },
        data: {
          name: validated.name,
          location: validated.location,
          revenue: validated.revenue,
        },
      });
    });

    return NextResponse.json(
      { success: true, data: updatedMarket },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/markets:", error);
    if (error instanceof Error && "issues" in error) {
      return NextResponse.json(
        { success: false, message: "Validation error", issues: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to update market." },
      { status: 500 }
    );
  }
}

// DELETE: Delete a market
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = MarketDeleteSchema.parse(body);

    const deletedMarket = await prisma.$transaction(async (tx) => {
      return await tx.market.delete({
        where: { id: validated.id },
      });
    });

    return NextResponse.json(
      { success: true, data: deletedMarket },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/markets:", error);
    if (error instanceof Error && "issues" in error) {
      return NextResponse.json(
        { success: false, message: "Validation error", issues: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to delete market." },
      { status: 500 }
    );
  }
}
