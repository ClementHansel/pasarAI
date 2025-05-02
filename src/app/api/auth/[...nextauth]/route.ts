// src/app/api/auth/[...nextauth]/route.ts
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import { authOptions } from "@/lib/auth";

// export const handler = NextAuth({
//   ...authOptions,
//   providers: [
//     ...authOptions.providers,
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//   ],
// });

// export { handler as GET, handler as POST };

// src/app/api/auth/[...nextauth]/route.ts
// MUST be picked up by TypeScript via tsconfig "include"
// src/types/next-auth.d.ts
// src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      email: string;
      role: string;
      hasProfile: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  // Just declare your extra properties on the JWT interface—
  // don't extend the existing one, to avoid recursive loops.
  interface JWT {
    id: string;
    email: string;
    role: string;
    hasProfile?: boolean;
  }
}

export {};
