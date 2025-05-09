// src/components/layout/homepage/header/MessagePopover.tsx
"use client";

import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const MessagePopover = () => {
  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger className="relative">
        <MessageCircle className="w-6 h-6 text-gray-700" />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        <h4 className="font-semibold mb-2">Chat & Message</h4>
        <ul className="text-sm space-y-1">
          <li
            className="hover:text-primary cursor-pointer py-1.5"
            onClick={() => router.push("/chat")}
          >
            Chat
          </li>
          <li
            className="hover:text-primary cursor-pointer py-1.5"
            onClick={() => router.push("/message")}
          >
            Messages
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default MessagePopover;
