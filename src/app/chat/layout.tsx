// src/app/chat/layout.tsx

import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      {/* Chat Header with flexible height */}
      <header className="bg-blue-600 text-white px-6 py-4 sm:py-6 md:py-8 flex justify-between items-center">
        <h1 className="text-xl font-semibold">AI Chat</h1>
      </header>

      {/* Main content (chat panel) */}
      <main className="flex-1 flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
