import React from "react";
import { AuthGuard } from "src/components/auth/AuthGuard";
import { Role } from "@prisma/client";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={[Role.BUYER, Role.SELLER, Role.ADMIN]}>
      <div className="w-full h-screen flex-col">{children}</div>
    </AuthGuard>
  );
}
