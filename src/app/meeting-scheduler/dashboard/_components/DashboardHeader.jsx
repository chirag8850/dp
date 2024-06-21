import { UserButton } from "@clerk/nextjs";
import React from "react";

function DashboardHeader() {
  return (
    <div className="p-4 px-10">
      <div className="flex items-center float-right">
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
