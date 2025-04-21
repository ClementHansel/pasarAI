// src/components/layout/homepage/header/NotificationPopover.tsx

import React from "react";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const NotificationPopover = () => {
  return (
    <Popover>
      <PopoverTrigger className="relative">
        <Bell className="w-6 h-6 text-gray-700" />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        <h4 className="font-semibold mb-2">Notifications</h4>
        <ul className="text-sm space-y-1">
          <li className="hover:text-primary cursor-pointer">Order updates</li>
          <li className="hover:text-primary cursor-pointer">Promotions</li>
          <li className="hover:text-primary cursor-pointer">Seller updates</li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
