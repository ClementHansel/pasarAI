import { NextRequest, NextResponse } from "next/server";
import * as AccountService from "@/services/account/accountService";
import {
  createAccountSchema,
  deleteAccountSchema,
  updateAccountSchema, // fixed the extra comma here
} from "@/lib/validation/accountSchema";
import { handleServerError } from "@/lib/error/handleServerError";

// GET: Fetch all accounts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const result = await AccountService.getAccounts({ page, limit });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("GET /accounts error:", error);
    return handleServerError();
  }
}

// POST: Create new account (admin/buyer/seller)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = createAccountSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const newAccount = await AccountService.createAccount(parsed.data);

    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    console.error("POST /accounts error:", error);
    return handleServerError();
  }
}

// PUT: Update account
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = updateAccountSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const updatedAccount = await AccountService.updateAccount(
      parsed.data.id,
      parsed.data
    );

    return NextResponse.json(updatedAccount, { status: 200 });
  } catch (error) {
    console.error("PUT /accounts error:", error);
    return handleServerError();
  }
}

// DELETE: Delete account
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = deleteAccountSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await AccountService.deleteAccount(parsed.data.id);

    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /accounts error:", error);
    return handleServerError();
  }
}
