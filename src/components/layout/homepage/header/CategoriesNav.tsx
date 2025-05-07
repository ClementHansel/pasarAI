// src/components/layout/homepage/header/CategoriesNav.tsx
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useProductFilter } from "@/context/ProductCategoryContext";

const hardcodedMainCategories = ["Fashion", "Electronics", "Home & Living"];

const CategoriesNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [fetchedCategories, setFetchedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { setCategory } = useProductFilter();

  // Detect mobile view
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/products?getCategories=true");
        if (res.ok) {
          const data = await res.json();
          setFetchedCategories(data.categories || []);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Combine and sort categories
  const combinedCategories = Array.from(
    new Set([...hardcodedMainCategories, ...fetchedCategories])
  ).sort(); // Alphabetical sort

  // Desktop hover handlers
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
      }, 300);
    }
  };

  // Mobile click handler
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

        <PopoverContent className="w-[400px] p-6 grid grid-cols-2 gap-6">
          {isLoading ? (
            <div className="grid grid-cols-2 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-6 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          ) : (
            combinedCategories.map((categoryName) => (
              <div key={categoryName}>
                <h3
                  className="font-semibold mb-2 cursor-pointer hover:text-primary"
                  onClick={() => {
                    setCategory(categoryName);
                    setIsOpen(false);
                  }}
                >
                  {categoryName}
                </h3>
              </div>
            ))
          )}
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default CategoriesNav;
