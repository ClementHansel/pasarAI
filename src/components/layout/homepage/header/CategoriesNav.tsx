// src/components/layout/homepage/header/CategoriesNav.tsx
import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const categories = {
  Fashion: ["Men's Wear", "Women's Wear", "Kids' Fashion", "Accessories"],
  Electronics: ["Smartphones", "Laptops", "Accessories", "Gaming"],
  "Home & Living": ["Furniture", "Decor", "Kitchen", "Storage"],
  Beauty: ["Skincare", "Makeup", "Haircare", "Fragrances"],
  Sports: ["Equipment", "Clothing", "Shoes", "Accessories"],
  Books: ["Fiction", "Non-Fiction", "Academic", "Children's"],
  Toys: ["Educational", "Action Figures", "Board Games", "Outdoor"],
  Automotive: ["Parts", "Accessories", "Tools", "Car Care"],
};

const CategoriesNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Function to check if device is mobile based on window width
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Handlers for mouse enter and leave to open/close popover on desktop
  const handleMouseEnter = () => {
    if (!isMobile) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      closeTimeoutRef.current = setTimeout(() => {
        setIsOpen(false);
      }, 300); // delay before closing
    }
  };

  // Handler for click to toggle popover on mobile
  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        <PopoverTrigger
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
          onClick={handleClick}
        >
          <div className="flex items-center">
            <span className="mr-2">All Categories</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[800px] p-6 grid grid-cols-4 gap-6">
          {Object.entries(categories).map(([category, subcategories]) => (
            <div key={category}>
              <h3 className="font-semibold mb-2">{category}</h3>
              <ul className="space-y-1">
                {subcategories.map((sub) => (
                  <li
                    key={sub}
                    className="text-sm text-gray-600 hover:text-primary cursor-pointer"
                  >
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default CategoriesNav;
