"use client";

import React, { ReactNode, useState } from "react";
import Header from "@/components/layout/homepage/header/Header";
import Footer from "@/components/layout/homepage/Footer";
import Sidebar from "@/components/layout/dashboard/Sidebar";

export default function DashboardLayoutClient({
  children,
}: {
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="w-full bg-white dark:bg-gray-800 shadow z-10">
        <div className="px-4 py-3">
          <Header />
        </div>
      </header>

      {/* Main layout: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white dark:bg-gray-800 shadow mt-auto">
        <div className="px-4 py-3">
          <Footer />
        </div>
      </footer>
    </div>
  );
}
