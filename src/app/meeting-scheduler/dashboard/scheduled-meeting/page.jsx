"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/meeting-scheduler/components/ui/tabs";
import ScheduledMeetingList from "./_components/ScheduledMeetingList";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app, firestore } from "../../../../firebase/firebase";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { Checkbox } from "../../components/ui/checkbox";

function ScheduledMeeting() {
  const db = firestore;
  const { user } = useAuth();
  const [meetingList, setMeetingList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const getScheduledMeetings = useCallback(async () => {
    setMeetingList([]);
    if (!user || !user.emailAddresses || !user.emailAddresses[0]) {
      console.error("Invalid user data:", user);
      return;
    }

    const businessEmail = user.emailAddresses[0].emailAddress;

    const q = query(
      collection(db, "ScheduledMeetings"),
      where("lawyerEmail", "==", businessEmail)
    );

    const querySnapshot = await getDocs(q);

    const meetings = [];
    querySnapshot.forEach((doc) => {
      meetings.push(doc.data());
    });

    setMeetingList(meetings);
  }, [db, user]);

  useEffect(() => {
    if (user) {
      getScheduledMeetings();
    }
  }, [user, getScheduledMeetings]);

  const filteredMeetings = meetingList.filter((meeting) =>
    meeting.eventName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterMeetingList = (type) => {
    if (type === "upcoming") {
      return meetingList.filter(
        (item) => item.formatedTimeStamp >= format(new Date(), "t")
      );
    } else {
      return meetingList.filter(
        (item) => item.formatedTimeStamp < format(new Date(), "t")
      );
    }
  };

  const renderMeetingList = () => {
    if (searchQuery) {
      return <ScheduledMeetingList meetingList={filteredMeetings} />;
    } else {
      return <ScheduledMeetingList meetingList={meetingList} />;
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-2 p-5 h-full">
      <div className="flex w-full justify-between">
        <div>
          {" "}
          <h2 className="font-bold text-2xl">Scheduled Meetings</h2>
        </div>
        <div>
          {" "}
          <input
            type="text"
            placeholder="Search meetings"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <hr className="my-5" />
      <Tabs defaultValue="upco  ming" className="w-full">
        <TabsList className="flex w-full bg-customGreen text-black justify-start gap-10">
          <Checkbox className=" bg-white " />
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {renderMeetingList(filterMeetingList("upcoming"))}
        </TabsContent>
        <TabsContent value="expired">
          {renderMeetingList(filterMeetingList("expired"))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ScheduledMeeting;
