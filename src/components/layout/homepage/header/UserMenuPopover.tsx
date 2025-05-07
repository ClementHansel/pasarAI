// src/components/layout/homepage/header/UserMenuPopover.tsx

import React from "react";
import { User } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";

const UserMenuPopover = () => {
  const router = useRouter();
  return (
    <Popover>
      <PopoverTrigger className="relative">
        <User className="w-6 h-6 text-gray-700" />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4">
        <h4 className="font-semibold mb-2">Account</h4>
        <ul className="text-sm space-y-1">
          <li
            className="hover:text-primary cursor-pointer"
            onClick={() => router.push("/auth/login")}
          >
            Login / Register
          </li>
          <li
            className="hover:text-primary cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            Seller Dashboard
          </li>
          <li
            className="hover:text-primary cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            Profile
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenuPopover;
