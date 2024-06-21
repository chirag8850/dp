"use client";
import { Button } from "@/components/ui/button";
import { firestore } from "../../../../../firebase/firebase";
import { useUser, UserButton } from "@clerk/nextjs";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { Clock, Copy, MapPin, Pen, Settings, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/meeting-scheduler/components/ui/dropdown-menu";

function MeetingEventList() {
  const db = firestore;
  const { user } = useUser();
  const [eventList, setEventList] = useState(null);

  useEffect(() => {
    if (user) {
      getEventList();
    }
  }, [user]);

  const getEventList = async () => {
    if (!user?.id) return;
    setEventList([]);
    const q = query(
      collection(db, "MeetingEvent"),
      where("userId", "==", user?.id)
    );
    const querySnapshot = await getDocs(q);
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push(doc.data());
    });
    setEventList(events);
  };

  const onDeleteMeetingEvent = async (event) => {
    if (!event?.id) return;

    await deleteDoc(doc(db, "MeetingEvent", event.id)).then(() => {
      toast("Meeting Event Deleted!");
      getEventList();
    });
  };

  const onCopyClickHandler = (event) => {
    if (!event?.eventName || !event?.dateTime) return; // Ensure businessInfo and event.id are defined

    const meetingEventUrl =
      "http://localhost:3000" +
      "/meeting-scheduler/" +
      event.eventName +
      "/" +
      event.id;
    navigator.clipboard.writeText(meetingEventUrl);
    toast("Copied to Clipboard");
  };

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {eventList ? (
        eventList.map((event, index) => (
          <div
            key={index}
            className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3"
            style={{ borderTopColor: event?.themeColor }}
          >
            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Settings className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex gap-2">
                    <Pen /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex gap-2"
                    onClick={() => onDeleteMeetingEvent(event)}
                  >
                    <Trash /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h2 className="font-medium text-xl">{event?.eventName}</h2>
            <div className="flex justify-between">
              <h2 className="flex gap-2 text-gray-500">
                <Clock /> {event.duration} Min{" "}
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <MapPin /> {event.locationType} Min{" "}
              </h2>
            </div>
            <hr />
            <div className="flex justify-between">
              <h2
                className="flex gap-2 text-sm text-primary items-center cursor-pointer"
                onClick={() => onCopyClickHandler(event)}
              >
                <Copy className="h-4 w-4" /> Copy Link{" "}
              </h2>
              <Button
                variant="outline"
                className="rounded-full text-primary border-primary "
              >
                Share
              </Button>
            </div>
          </div>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default MeetingEventList;
