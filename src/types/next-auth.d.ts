// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    account?: {
      id: string;
      // Add other custom properties to the session here (Andreas)
    };
  }
}
