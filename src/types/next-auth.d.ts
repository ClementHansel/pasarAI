import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    account: {
      id: string;
      email: string;
      role: string;
    } & DefaultSession["account"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role: string;
  }
}
