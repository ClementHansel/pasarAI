import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-screen flex-col">{children}</div>;
}
