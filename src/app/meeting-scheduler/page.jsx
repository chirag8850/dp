"use client";
import { useState } from "react";
import { user, UserButton } from "@clerk/nextjs";
import DashboardLayout from "./dashboard/layout";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardLayout />
    </div>
  );
}
