import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST endpoint to create a new market
export async function POST(request: Request) {
    try {
      const { name, location, revenue } = await request.json();
  
      // Basic validation
      if (!name || !location || !revenue) {
        return NextResponse.json(
          { message: "All fields are required" },
          { status: 400 }
        );
      }
  
      const newMarket = await prisma.market.create({
        data: {
          name,
          location,
          revenue,
        },
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