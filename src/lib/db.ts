// src/lib/db.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Allow global prisma to prevent hot reload issues in dev
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db =
  global.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "production"
        ? ["error"]
        : ["query", "info", "warn", "error"],
  });

// Prevent creating new instance on hot reload in dev
if (process.env.NODE_ENV !== "production") global.prisma = db;

// Handle Prisma Client errors
(db.$on as unknown as (event: string, callback: (e: Error) => void) => void)(
  "error",
  (e: Error) => {
    console.error("Prisma Client Error:", e);
  }
);

// Gracefully disconnect Prisma client in production
if (process.env.NODE_ENV === "production") {
  process.on("beforeExit", async () => {
    await db.$disconnect();
  });
}
