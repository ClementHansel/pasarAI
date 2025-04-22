// src/components/layout/homepage/header/Logo.tsx

import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-2xl font-bold text-primary"
    >
      <span className="text-3xl">🛒</span>
      <span>PasarAI</span>
    </Link>
  );
};

export default Logo;
