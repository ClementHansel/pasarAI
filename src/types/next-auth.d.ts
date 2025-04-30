// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    account?: {
      id: string;
      
      // Add other custom properties to the session here (Andreas)
    };

    user: {
      /** The user's postal address. */
      address: string
      } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
      /** OpenID ID Token */
      idToken?: string
  }
  }
