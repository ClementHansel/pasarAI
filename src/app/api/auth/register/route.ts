// src/app/api/auth/register/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "@/lib/auth/authUtils";

// Initialize Prisma client
const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Parse incoming JSON data
    const { name, email, password, role } = await req.json();

    // Input validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Ensure role is either USER or SELLER, default to USER
    const userRole =
      role && (role === "SELLER" || role === "USER") ? role : "USER";

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole, // Set role to USER or SELLER
      },
    });

    // Respond with success
    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role, // Include role in response
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
