import React, { useState, useRef } from "react";
import { Popup } from "../layout/popup";
import { Button } from "../layout/button";
import { AdviceButton } from "./adviceButton";
import { useLocalStore } from "../../store/useStore";
import { formatDate } from "./types";

export function Advice() {
  const { dashboard } = useLocalStore();
  const lastDashBoardData = [...dashboard]
    .reverse()
    .find((element) => element.id !== "");

  const parsedDate = lastDashBoardData?.date;
  const today = formatDate(new Date());

  if (lastDashBoardData && lastDashBoardData?.sleep < 50) {
    console.log("The sleep value is less than 50.");
  } else {
    console.log("The sleep value is 50 or more.");
  }
  console.log("compare dates", parsedDate === today);

  console.log("lastDashBoardData", lastDashBoardData);

  const filteredData = {
    general_mood: lastDashBoardData?.general_mood,
    activities: lastDashBoardData?.activities,
    sleep: lastDashBoardData?.sleep,
    calmness: lastDashBoardData?.calmness,
    yourself_time: lastDashBoardData?.yourself_time,
  };

  const map = new Map(Object.entries(filteredData));
  const entriesArray = Array.from(map.entries());

  // Find keys where values are less than 50
  const keysWithValuesLessThan50 = entriesArray
    .filter(([key, value]) => Number(value) < 50) // Filter entries where value < 50
    .map(([key]) => key); // Extract keys

  const advice = {
    sleep:
      "Go to bed and wake up at the same time every day (even on weekends). This helps regulate your body's internal clock and improves the quality of your sleep." +
      "Dark, Cool, and Quiet: Ensure your bedroom is dark (use blackout curtains if necessary), cool (ideally between 60-67°F or 15-19°C), and quiet (use earplugs or white noise machines if needed)." +
      "Comfortable Bedding: Invest in a good mattress and pillows. Comfort is key to a restful night.",
  };
  // const popover = useRef<HTMLIonPopoverElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = (e: any) => {
    // popover.current!.event = e;
    setIsOpen(!isOpen);
  };
  return (
    <>
      {keysWithValuesLessThan50.map((element) => (
        <AdviceButton moodType={element} />
      ))}
    </>
  );
}
