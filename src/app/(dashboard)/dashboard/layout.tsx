// src/app/(dashboard)/layout.tsx
// import React, { ReactNode } from "react";

import "@/styles/globals.css";
// import DashboardLayoutClient from "@/components/layout/dashboard/DashboardLayoutClient";

// interface DashboardLayoutProps {
//   children: ReactNode;
// }

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
