// src/app/(dashboard)/layout.tsx
"use client";

import React, { useState } from "react";
import "@/styles/globals.css";
import Sidebar from "@/components/layout/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`flex-1 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "ml-32" : "ml-16"
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
