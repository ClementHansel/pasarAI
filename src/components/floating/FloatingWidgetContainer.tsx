// src/components/floating/FloatingWidgetContainer.tsx
"use client";

import ChatWidget from "./ChatWidget";
import WhatsAppWidget from "./WhatsAppWidget";

export default function FloatingWidgetContainer() {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-4 z-50">
      <WhatsAppWidget />
      <ChatWidget />
    </div>
  );
}
