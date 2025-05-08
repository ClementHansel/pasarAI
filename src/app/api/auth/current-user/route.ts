// src/app/api/auth/current-user/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { db } from "@/lib/db/db";
import { authOptions } from "@/lib/auth/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await db.account.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
      role: true,
      isVerified: true,
      name: true,
      profileImage: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
