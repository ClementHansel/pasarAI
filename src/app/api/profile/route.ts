import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch all accounts
export async function GET() {
  try {
    const accounts = await prisma.account.findMany();
    return NextResponse.json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return NextResponse.json(
      { message: "Error fetching accounts" },
      { status: 500 }
    );
  }
}

// POST: Create a new account
export async function POST(request: Request) {
  try {
    const { name, email, avatar, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const newaccount = await prisma.account.create({
      data: { name, email, avatar, password },
    });

    return NextResponse.json(newaccount, { status: 201 });
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      { message: "Error creating account" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing account
export async function PUT(request: Request) {
  try {
    const { id, name, email, avatar } = await request.json();

    if (!id || !name || !email) {
      return NextResponse.json(
        { message: "ID, name, and email are required" },
        { status: 400 }
      );
    }

    const updatedaccount = await prisma.account.update({
      where: { id },
      data: { name, email, avatar },
    });

    return NextResponse.json(updatedaccount);
  } catch (error) {
    console.error("Error updating account:", error);
    return NextResponse.json(
      { message: "Error updating account" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a account
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const deleted = await prisma.account.delete({
      where: { id },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { message: "Error deleting account" },
      { status: 500 }
    );
  }
}
