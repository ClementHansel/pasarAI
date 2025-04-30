import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/auth/authUtils";
import { findAccountByEmail } from "./accountService";
import { JWT } from "next-auth/jwt";
import { Role } from "@prisma/client";

// Extend the default User object
interface ExtendedUser extends User {
  id: string;
  email: string;
  role: Role;
}

// Define ExtendedToken to match JWT's structure and change role to string
interface ExtendedToken extends JWT {
  id: string;
  email: string;
  role: string; // Change this to string to match JWT's role type
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password required");
        }

        const account = await findAccountByEmail(credentials.email);

        if (
          !account ||
          typeof account.email !== "string" ||
          typeof account.password !== "string" ||
          typeof account.role !== "string"
        ) {
          throw new Error("Invalid account data");
        }

        const isValid = await verifyPassword(
          credentials.password,
          account.password
        );
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: account.id,
          email: account.email,
          role: account.role as Role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }): Promise<ExtendedToken> {
      // Add user info to JWT token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }

      return token;
    },

    // Correct it when integrate session
    // async session({
    //   session,
    //   token,
    // }: {
    //   session: Session;
    //   token: ExtendedToken;
    // }): Promise<Session> {
    //   // Ensure session is typed correctly
    //   session.user.id = token.id as string;
    //   session.user.email = token.email as string;
    //   session.user.role = token.role as Role;
    //   return session;
    // },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
