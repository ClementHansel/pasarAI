// src/app/chat/layout.tsx

import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Main content (chat panel) */}
      <main className="flex-1 flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
