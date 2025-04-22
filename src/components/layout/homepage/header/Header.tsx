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

          <div className="flex items-center gap-4">
            <CartPopover />
            <MessagePopover />
            <NotificationPopover />
            <UserMenuPopover />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden py-3">
          <SearchBox />
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6 py-3 text-sm">
          <Link href="/deals" className="hover:text-primary">
            Deals
          </Link>
          Deals
          <Link href="/new-arrivals" className="hover:text-primary">
            New Arrivals
          </Link>
          <Link href="/trending" className="hover:text-primary">
            Trending
          </Link>
          <Link href="/brands" className="hover:text-primary">
            Brands
          </Link>
          <Link href="/gift-cards" className="hover:text-primary">
            Gift Cards
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
