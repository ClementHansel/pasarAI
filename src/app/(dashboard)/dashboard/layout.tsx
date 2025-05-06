// src/app/(dashboard)/layout.tsx
"use client";

import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import "@/styles/globals.css";
import Sidebar from "@/components/layout/dashboard/Sidebar";
import { NotificationProvider } from "@/context/NotificationContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setAccountId(session?.user?.id || null);
    };
    fetchSession();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  if (!accountId) {
    // Optionally, show a loading spinner or fallback UI
    return <div>Loading...</div>;
  }

  return (
    <NotificationProvider accountId={accountId}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`flex-1 overflow-y-auto transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-16"
          }`}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>
    </NotificationProvider>
  );
}
