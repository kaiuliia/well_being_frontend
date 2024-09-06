import React, { useState, useRef } from "react";
import { Popup } from "../layout/popup";
import { Button } from "../layout/button";
import { sliderName } from "./types";
import { useLocalStore } from "../../store/useStore";
import { formatDate, Survey } from "./types";

export function AdviceButton({ moodType }: { moodType: string }) {
  const advice = {
    sleep:
      "Go to bed and wake up at the same time every day (even on weekends). This helps regulate your body's internal clock and improves the quality of your sleep." +
      "Dark, Cool, and Quiet: Ensure your bedroom is dark (use blackout curtains if necessary), cool (ideally between 60-67°F or 15-19°C), and quiet (use earplugs or white noise machines if needed)." +
      "Comfortable Bedding: Invest in a good mattress and pillows. Comfort is key to a restful night.",
    activities:
      "Go to bed and wake up at the same time every day (even on weekends). This helps regulate your body's internal clock and improves the quality of your sleep." +
      "Dark, Cool, and Quiet: Ensure your bedroom is dark (use blackout curtains if necessary), cool (ideally between 60-67°F or 15-19°C), and quiet (use earplugs or white noise machines if needed)." +
      "Comfortable Bedding: Invest in a good mattress and pillows. Comfort is key to a restful night.",
    general_mood:
      "Go to bed and wake up at the same time every day (even on weekends). This helps regulate your body's internal clock and improves the quality of your sleep." +
      "Dark, Cool, and Quiet: Ensure your bedroom is dark (use blackout curtains if necessary), cool (ideally between 60-67°F or 15-19°C), and quiet (use earplugs or white noise machines if needed)." +
      "Comfortable Bedding: Invest in a good mattress and pillows. Comfort is key to a restful night.",
    yourself_time:
      "Go to bed and wake up at the same time every day (even on weekends). This helps regulate your body's internal clock and improves the quality of your sleep." +
      "Dark, Cool, and Quiet: Ensure your bedroom is dark (use blackout curtains if necessary), cool (ideally between 60-67°F or 15-19°C), and quiet (use earplugs or white noise machines if needed)." +
      "Comfortable Bedding: Invest in a good mattress and pillows. Comfort is key to a restful night.",
    calmness:
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
      {/*<Button onClick={openPopover}>Click Me</Button>*/}
      {isOpen && (
        <>
          <Popup
            close={() => setIsOpen(false)}
            description={moodType}
            title={"How to sleep better"}
          />
        </>
      )}
      <div className={"float-animation"} id={"float"}>
        <Button
          onClick={open}
          name={moodType}
          className={`text-white cursor-pointer`}
        />
      </div>
    </>
  );
}
