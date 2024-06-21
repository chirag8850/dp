"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "../../../firebase/firebase";
import { useRouter } from "next/navigation";
import MeetingType from "./meeting-type/page";
function Dashboard() {
  const db = getFirestore(app);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    user;
  }, [user]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <MeetingType />
    </div>
  );
}

export default Dashboard;
