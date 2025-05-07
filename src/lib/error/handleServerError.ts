// src/lib/error/handleServerError.ts

import { NextResponse } from "next/server";

export function handleServerError() {
  return NextResponse.json(
    { message: "Internal server error" },
    { status: 500 }
  );
}
