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

    // Ensure role is either account or SELLER, default to account
    const accountRole =
      role && (role === "SELLER" || role === "account") ? role : "account";

    // Check if the account already exists
    const existingAccount = await prisma.account.findUnique({
      where: { email },
    });
    if (existingAccount) {
      return NextResponse.json(
        { error: "account already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new account
    const newAccount = await prisma.account.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: accountRole, // Set role to account or SELLER
      },
    });

    // Respond with success
    return NextResponse.json({
      message: "account registered successfully",
      account: {
        id: newAccount.id,
        email: newAccount.email,
        name: newAccount.name,
        role: newAccount.role, // Include role in response
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
