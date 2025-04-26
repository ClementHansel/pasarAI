"use client";

import ChatWidget from "./ChatWidget";
import WhatsAppWidget from "./WhatsAppWidget";

export default function FloatingWidgetContainer() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-50">
      <ChatWidget />
      <WhatsAppWidget />
    </div>
  );
}
