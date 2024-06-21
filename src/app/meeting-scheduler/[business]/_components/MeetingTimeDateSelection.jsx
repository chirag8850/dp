import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarCheck, Clock, LoaderIcon, MapPin, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import TimeDateSelection from "./TimeDateSelection";
import UserFormInfo from "./UserFormInfo";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { app } from "../../../../firebase/firebase";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import Email from "../../emails";

function MeetingTimeDateSelection({ eventInfo, businessInfo }) {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();
  const [enableTimeSlot, setEnabledTimeSlot] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userNote, setUserNote] = useState("");
  const [prevBooking, setPrevBooking] = useState([]);
  const [step, setStep] = useState(1);
  const router = useRouter();
  const db = getFirestore(app);
  const [loading, setLoading] = useState(false);
  const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY);

  useEffect(() => {
    eventInfo?.duration && createTimeSlot(eventInfo?.duration);
  }, [eventInfo]);

  useEffect(() => {
    console.log(timeSlots);
  }, [timeSlots]);

  const createTimeSlot = async (interval) => {
    const userId = businessInfo?.userId;
    const docRef = doc(db, "Users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const startTimeString = docSnap.data().startTime;
      const endTimeString = docSnap.data().endTime;

      const [startHour, startMinute] = startTimeString.split(":").map(Number);
      const [endHour, endMinute] = endTimeString.split(":").map(Number);
      const startTime = startHour * 60 + startMinute;
      const endTime = endHour * 60 + endMinute;

      const totalSlots = (endTime - startTime) / interval;
      const slots = Array.from({ length: totalSlots }, (_, i) => {
        const totalMinutes = startTime + i * interval;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
        const period = hours >= 12 ? "PM" : "AM";
        return `${String(formattedHours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")} ${period}`;
      });
      console.log(slots);
      setTimeSlots(slots);
    }
  };

  const handleDateChange = async (date_received) => {
    setDate(date_received);
    const day = format(date_received, "EEEE");
    const userId = businessInfo?.userId;
    const docRef = doc(db, "Users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (docSnap.data()?.daysAvailable?.[day]) {
        getPrevEventBooking(date_received);
        setEnabledTimeSlot(true);
      } else {
        setEnabledTimeSlot(false);
      }
    }
  };

  /**
   * Handle Schedule Event on Click Schedule Button
   * @returns
   */

  const randomStrings = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const handleScheduleEvent = async () => {
    let isUnique = false;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(userEmail) == false) {
      toast("Enter valid email address");
      return;
    }

    setLoading(true);
    while (!isUnique) {
      const uniqueId = randomStrings();
      const docRef = doc(db, "ScheduledMeetings", uniqueId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        isUnique = true;
        await setDoc(docRef, {
          eventName: businessInfo.eventName,
          lawyerEmail: businessInfo.lawyerEmail,
          selectedTime: selectedTime,
          selectedDate: date,
          formatedDate: format(date, "PPP"),
          formatedTimeStamp: format(date, "t"),
          duration: eventInfo.duration,
          locationType: businessInfo.locationType,
          locationUrl: eventInfo.locationUrl,
          themeColor: businessInfo.themeColor,
          eventId: eventInfo.id,
          userName: userName,
          userEmail: userEmail,
          userNote: userNote,
        }).then((resp) => {
          toast("Meeting Scheduled successfully!");
          sendEmail(userName);
        });
      }
    }
  };

  /**
   * Used to Send an email to User
   * @param {*} user
   */
  const sendEmail = (user) => {
    const emailHtml = render(
      <Email
        businessName={businessInfo?.businessName}
        date={format(date, "PPP").toString()}
        duration={eventInfo?.duration}
        meetingTime={selectedTime}
        meetingUrl={eventInfo.locationUrl}
        userFirstName={user}
      />
    );

    plunk.emails
      .send({
        to: userEmail,
        subject: "Meeting Schedule Details",
        body: emailHtml,
      })
      .then((resp) => {
        setLoading(false);
        router.replace("/meeting-scheduler/confirmation");
      });
  };

  /**
   * Used to Fetch Previous Booking for given event
   * @param {*} date_
   */
  const getPrevEventBooking = async (date_) => {
    const q = query(
      collection(db, "ScheduledMeetings"),
      where("selectedDate", "==", date_),
      where("eventId", "==", eventInfo.id)
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log("--", doc.data());
      setPrevBooking((prev) => [...prev, doc.data()]);
    });
  };
  return (
    <div
      className="p-5 py-10 shadow-lg m-5 border-t-8
    mx-10
    md:mx-26
    lg:mx-56
    my-10"
      style={{ borderTopColor: eventInfo?.themeColor }}
    >
      <Image src="/logo.png" alt="logo" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-5">
        {/* Meeting Info  */}
        <div className="p-4 border-r">
          <h2>{businessInfo?.businessName}</h2>
          <h2 className="font-bold text-3xl">
            {eventInfo?.eventName ? eventInfo?.eventName : "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock />
              {eventInfo?.duration} Min{" "}
            </h2>
            <h2 className="flex gap-2">
              <MapPin />
              {eventInfo?.locationType} Meeting{" "}
            </h2>
            <h2 className="flex gap-2">
              <CalendarCheck />
              {format(date, "PPP")}{" "}
            </h2>
            {selectedTime && (
              <h2 className="flex gap-2">
                <Timer />
                {selectedTime}{" "}
              </h2>
            )}

            <Link
              href={eventInfo?.locationUrl ? eventInfo?.locationUrl : "#"}
              className="text-primary"
            >
              {eventInfo?.locationUrl}
            </Link>
          </div>
        </div>
        {/* Time & Date Selction  */}
        {step == 1 ? (
          <TimeDateSelection
            date={date}
            enableTimeSlot={enableTimeSlot}
            handleDateChange={handleDateChange}
            setSelectedTime={setSelectedTime}
            timeSlots={timeSlots}
            selectedTime={selectedTime}
            prevBooking={prevBooking}
          />
        ) : (
          <UserFormInfo
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNote={setUserNote}
          />
        )}
      </div>
      <div className="flex gap-3 justify-end">
        {step == 2 && (
          <Button variant="outline" onClick={() => setStep(1)}>
            Back
          </Button>
        )}
        {step == 1 ? (
          <Button
            className="mt-10 float-right"
            disabled={!selectedTime || !date}
            onClick={() => setStep(step + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={!userEmail || !userName}
            onClick={handleScheduleEvent}
          >
            {loading ? <LoaderIcon className="animate-spin" /> : "Schedule"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default MeetingTimeDateSelection;
