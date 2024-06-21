import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/app/meeting-scheduler/components/ui/checkbox";
import LocationOption from "@/app/meeting-scheduler/_utils/LocationOption";
import { parse, format, addMinutes } from "date-fns";

function ScheduledMeetingList({ meetingList }) {
  const sortedMeetings = meetingList.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const groupedMeetings = sortedMeetings.reduce((acc, meeting) => {
    const date = meeting.formatedDate;
    if (!acc[date]) acc[date] = [];
    acc[date].push(meeting);
    return acc;
  }, {});

  const dates = Object.keys(groupedMeetings);

  const formatTimeRange = (startTime, duration) => {
    const parsedStartTime = parse(startTime, "h:mm a", new Date());
    const endTime = addMinutes(parsedStartTime, duration);
    return `${format(parsedStartTime, "HH:mm")} - ${format(endTime, "HH:mm")}`;
  };

  const getLocationIcon = (locationType) => {
    const location = LocationOption.find(
      (option) => option.name === locationType
    );
    return location ? location.icon : null;
  };

  return (
    <div>
      {dates.map((date, index) => (
        <div key={index}>
          <h2 className="text-xl font-semibold bg-gray-500 w-full justify-between p-2 rounded-lg ">
            {date}
          </h2>
          {groupedMeetings[date].map((meeting, idx) => (
            <div
              key={idx}
              className="p-4 border-b border-gray-200 flex justify-between items-center w-full"
            >
              <div className="flex items-center gap-2">
                <Checkbox />
                <h3 className="font-semibold ml-2">{meeting.eventName}</h3>
                <div
                  className={`w-10 h-10 rounded-full mr-2`}
                  style={{ backgroundColor: meeting.themeColor }}
                ></div>
              </div>

              <div className="flex flex-col text-sm text-gray-500 ">
                <p className="font-semibold">
                  {formatTimeRange(meeting.selectedTime, meeting.duration)}
                </p>
                <p>where {meeting.locationType}</p>
              </div>
              <Link href={meeting.locationUrl}>
                <Button className="ml-auto gap-2 flex items-center">
                  <div>Join via</div>
                  {getLocationIcon(meeting.locationType) && (
                    <img
                      src={getLocationIcon(meeting.locationType)}
                      alt={meeting.locationType}
                      className="w-6 h-6 ml-2"
                    />
                  )}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      ))}
      {meetingList.length == 0 ? (
        <div className="flex justify-center items-center mt-4 text-gray-400">
          No meetings found
        </div>
      ) : (
        <div className="flex justify-center items-center mt-4 text-gray-400">
          You have reached the end of the list
        </div>
      )}
    </div>
  );
}

export default ScheduledMeetingList;
