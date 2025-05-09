// src/components/layout/homepage/header/Header.tsx
"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import NotificationPopover from "./NotificationPopover";
import MessagePopover from "./MessagePopover";
import UserMenuPopover from "./UserMenuPopover";
import CartPopover from "./CartPopover";
import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSearch } from "@/context/SearchContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { query, setQuery, submitSearch } = useSearch();

  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname.startsWith("/chat") ||
    pathname.startsWith("/message");

  const mainNavItems = [
    { href: "/market", label: "Market" },
    { href: "/product", label: "Products" },
  ];

  if (isAuthPage) {
    return (
      <header className="w-full bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center py-4">
            <Logo />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 text-center text-sm">
        <p>Free shipping on orders over $50 | Get 10% off your first order</p>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <button
              className="mr-4 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Mobile menu toggle"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Logo />
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <SearchBox
              value={query}
              onChange={setQuery}
              onSubmit={submitSearch}
            />
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <CartPopover />
            <MessagePopover />
            <NotificationPopover />
            <UserMenuPopover />
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="lg:hidden py-3">
          <SearchBox
            value={query}
            onChange={setQuery}
            onSubmit={submitSearch}
          />
        </div>

        {/* Unified Navigation */}
        <nav className="hidden lg:flex items-center justify-between py-3">
          <div className="flex items-center space-x-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="underline-hover-effect text-sm hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="underline-hover-effect text-sm hover:text-primary px-4 py-2"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
