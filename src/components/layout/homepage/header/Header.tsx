// src/components/layout/homepage/header/Header.tsx
"use client";

import React from "react";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import NotificationPopover from "./NotificationPopover";
import MessagePopover from "./MessagePopover";
import UserMenuPopover from "./UserMenuPopover";
import CartPopover from "./CartPopover";
import CategoriesNav from "./CategoriesNav";
import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 text-center text-sm">
        <p>Free shipping on orders over $50 | Get 10% off your first order</p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Logo />

          <div className="hidden lg:flex items-center gap-8 flex-1 max-w-2xl mx-12">
            <CategoriesNav />
            <SearchBox />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center w-20 min-w-[80px]">
              <CartPopover />
              <span className="text-xs mt-1 truncate w-full text-center">
                Cart
              </span>
            </div>
            <div className="flex flex-col items-center w-20 min-w-[80px]">
              <MessagePopover />
              <span className="text-xs mt-1 truncate w-full text-center">
                Chat
              </span>
            </div>
            <div className="flex flex-col items-center w-20 min-w-[80px]">
              <NotificationPopover />
              <span className="text-xs mt-1 truncate w-full text-center">
                Notifications
              </span>
            </div>
            <div className="flex flex-col items-center w-20 min-w-[80px]">
              <UserMenuPopover />
              <span className="text-xs mt-1 truncate w-full text-center">
                Account
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden py-3">
          <SearchBox />
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 py-3 text-sm">
          <Link
            href="/deals"
            className="hover:text-primary relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            Deals
          </Link>
          <Link
            href="/new-arrivals"
            className="hover:text-primary relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            New Arrivals
          </Link>
          <Link
            href="/trending"
            className="hover:text-primary relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            Trending
          </Link>
          <Link
            href="/brands"
            className="hover:text-primary relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            Brands
          </Link>
          <Link
            href="/gift-cards"
            className="hover:text-primary relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:scale-x-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            Gift Cards
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
