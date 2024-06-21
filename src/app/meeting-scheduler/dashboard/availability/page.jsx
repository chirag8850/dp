"use client";
import DaysList from "../../_utils/DaysList";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/app/meeting-scheduler/components/ui/checkbox";
import { Input } from "@/app/meeting-scheduler/components/ui/input";
import { Button } from "@/app/meeting-scheduler/components/ui/button";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { app, firestore } from "../../../../firebase/firebase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

function Availability() {
  const initialDaysState = {
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  };

  const [daysAvailable, setDaysAvailable] = useState(initialDaysState);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { user, isSignedIn } = useAuth();

  useEffect(() => {
    user && getUserInfo();
  }, [user]);

  const getUserInfo = async () => {
    if (
      user?.emailAddresses &&
      Array.isArray(user.emailAddresses) &&
      user.emailAddresses[0]?.emailAddress
    ) {
      const docRef = doc(firestore, "Users", user.id);
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();
      setDaysAvailable(result?.daysAvailable || initialDaysState);
      setStartTime(result?.startTime || "");
      setEndTime(result?.endTime || "");
    }
  };

  const onHandleChange = (day, value) => {
    setDaysAvailable((prev) => ({
      ...prev,
      [day]: value,
    }));
  };

  const handleSave = async () => {
    if (
      user?.emailAddresses &&
      Array.isArray(user.emailAddresses) &&
      user.emailAddresses[0]?.emailAddress
    ) {
      const userEmail = user.emailAddresses[0]?.emailAddress;
      const docRef = doc(firestore, "Users", user.id);

      try {
        await setDoc(
          docRef,
          {
            daysAvailable: daysAvailable,
            startTime: startTime,
            endTime: endTime,
            email: userEmail,
          },
          { merge: true }
        );

        toast("Change Updated!");
      } catch (error) {
        console.error("Error updating or creating document: ", error);
        toast("An error occurred while updating the changes.");
      }
    }
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7" />
      <div>
        <h2 className="font-bold">Availability Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
          {DaysList &&
            DaysList.map((item, index) => (
              <div key={index}>
                <h2>
                  <Checkbox
                    checked={daysAvailable[item.day] || false}
                    onCheckedChange={(e) => onHandleChange(item.day, e)}
                  />{" "}
                  {item.day}
                </h2>
              </div>
            ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold mt-10">Availability Time</h2>
        <div className="flex gap-10">
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h2>End Time</h2>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button className="mt-10" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}

export default Availability;
