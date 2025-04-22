// src/components/layout/homepage/header/MessagePopover.tsx

import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { MessageCircle } from "lucide-react";

const MessagePopover = () => {
  return (
    <Popover>
      <PopoverTrigger className="relative">
        <MessageCircle className="w-6 h-6 text-gray-700" />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        <h4 className="font-semibold mb-2">Messages & Support</h4>
        <ul className="text-sm space-y-1">
          <li className="hover:text-primary cursor-pointer">Chat</li>
          <li className="hover:text-primary cursor-pointer">Reviews</li>
          <li className="hover:text-primary cursor-pointer">Help Center</li>
          <li className="hover:text-primary cursor-pointer">Complaint</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default MessagePopover;
