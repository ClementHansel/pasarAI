// src/types/next-auth.d.ts
import 'next-auth';
import { Role } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role: Role;
      hasProfile: boolean;
      isVerified: boolean;
    };
  }

  interface User {
    id: string;
    email: string; 
    role: Role;
    hasProfile: boolean;
    isVerified: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    role: Role;
    hasProfile: boolean;
    isVerified: boolean;
  }
}