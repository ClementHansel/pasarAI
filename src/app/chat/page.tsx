// src/app/chat/page.tsx

import AIChatPanel from "@/components/chat/AIChatPanel";

export default function ChatPage() {
  return (
    <div className="w-full flex justify-center items-center py-4">
      <AIChatPanel fullPage />
    </div>
  );
}
