// src/app/profile/user/page.tsx
"use client";

import React from "react";
import { UserProfileView } from "@/components/profile/UserProfileView";
import { mockUserProfile } from "@/lib/data/profile";

export default function UserProfilePage() {
  return <UserProfileView profile={mockUserProfile} />;
}
