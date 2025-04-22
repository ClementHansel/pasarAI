// src/components/layout/homepage/header/Header.tsx
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
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          3
        </span>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <h4 className="font-semibold mb-2">Notifications</h4>
        <div className="space-y-2">
          <div className="text-sm">
            <p className="font-medium">New Order Placed</p>
            <p className="text-gray-500">Your order #123 has been confirmed</p>
          </div>
          <div className="text-sm">
            <p className="font-medium">Price Drop Alert</p>
            <p className="text-gray-500">
              Item in your wishlist is now on sale
            </p>
          </div>
          <div className="text-sm">
            <p className="font-medium">Delivery Update</p>
            <p className="text-gray-500">Your package is out for delivery</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPopover;
