// src/components/layout/homepage/header/CategoriesNav.tsx

import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Menu } from "lucide-react";

const CategoriesNav = () => {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black">
        <Menu className="w-5 h-5" />
        Categories
      </PopoverTrigger>
      <PopoverContent className="w-[600px] p-4 grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-2">All Categories</h4>
          <ul className="space-y-1 text-sm">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home</li>
            <li>Sports</li>
            <li>Automotive</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Selected Category Content</h4>
          <p className="text-sm text-gray-600">
            Details about the selected category will be displayed here.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CategoriesNav;
