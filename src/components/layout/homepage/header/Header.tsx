// src/components/layout/homepage/header/Header.tsx
"use client";

import React from "react";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import NotificationPopover from "./NotificationPopover";
import MessagePopover from "./MessagePopover";
import UserMenuPopover from "./UserMenuPopover";
import CartPopover from "./CartPopover";

const Header = () => {
  return (
    <header className="w-full px-4 py-3 border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Logo />

        <div className="flex-1 max-w-xl">
          <SearchBox />
        </div>

        <div className="flex items-center gap-4">
          <CartPopover />
          <MessagePopover />
          <NotificationPopover />
          <UserMenuPopover />
        </div>
      </div>
    </header>
  );
};

export default Header;
