import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Category, Product } from "@/types/product"; // Import your types

const CategoriesNav = ({
  setIsMobileMenuOpen,
}: {
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch products data from the existing products API
        const res = await fetch("/api/products");
        const data = await res.json();

        // Ensure that we get a correctly typed response
        const products: Product[] | [] = data?.products || [];

        // Extract categories from the products
        const categoriesSet = new Set<Category>();
        products.forEach((product) => {
          if (product.category) {
            categoriesSet.add(product.category); // Add category to set to ensure uniqueness
          }
        });

        // Convert the set to an array
        setCategories(Array.from(categoriesSet));
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 300);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
      setIsMobileMenuOpen(false); // Close the mobile menu when a category is clicked
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
          <span className="mr-2">All Categories</span>
          <ChevronDown className="w-4 h-4" />
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-4 grid grid-cols-1 gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/product/${encodeURIComponent(category.name)}`}
              className="text-sm text-gray-700 hover:text-primary"
            >
              {category.name}
            </Link>
          ))}
        </PopoverContent>
      </div>
    </Popover>
  );
};

export default CategoriesNav;
