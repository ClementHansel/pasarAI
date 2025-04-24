// src/app/chat/page.tsx

import { Suspense } from "react";
import AIChatPanel from "@/components/chat/AIChatPanel";

export default function ChatPage() {
  return (
    <div className="w-full flex justify-center items-center py-4">
      <Suspense fallback={<div>Loading chat...</div>}>
        <AIChatPanel />
      </Suspense>
    </div>
  );
}
