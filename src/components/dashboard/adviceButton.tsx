import React, { useState, useRef } from "react";
import { Popup } from "../layout/popup";
import { Button } from "../layout/button";
import { IonIcon } from "@ionic/react";
import {
  bedOutline,
  accessibilityOutline,
  footstepsOutline,
  bookOutline,
  radioButtonOffOutline,
} from "ionicons/icons";

export function AdviceButton({ moodType }: { moodType: string }) {
  const adviceArray = {
    sleep: {
      adviceName: "sleep",
      iconName: bedOutline,
      description:
        "Go to bed and wake up at the same time every day (even on weekends). This helps regulate your body's internal clock and improves the quality of your sleep." +
        "Dark, Cool, and Quiet: Ensure your bedroom is dark (use blackout curtains if necessary), cool (ideally between 60-67°F or 15-19°C), and quiet (use earplugs or white noise machines if needed)." +
        "Comfortable Bedding: Invest in a good mattress and pillows. Comfort is key to a restful night.",
    },

    activities: {
      adviceName: "activity",
      iconName: footstepsOutline,
      description:
        "Go to bed and wake up at the same time every day (even on weekends). This helps regulate your body's internal clock and improves the quality of your sleep." +
        "Dark, Cool, and Quiet: Ensure your bedroom is dark (use blackout curtains if necessary), cool (ideally between 60-67°F or 15-19°C), and quiet (use earplugs or white noise machines if needed)." +
        "Comfortable Bedding: Invest in a good mattress and pillows. Comfort is key to a restful nig",
    },

    general_mood: {
      adviceName: "mood",
      iconName: accessibilityOutline,
      description: "mood desct",
    },

    yourself_time: {
      adviceName: "selfcare",
      iconName: bookOutline,
      description: "time for you",
    },

    calmness: {
      adviceName: "calmness",
      iconName: radioButtonOffOutline,
      description: "calmness",
    },
  };
  let advice = "";
  let adviceDescription = "";
  let icon = "";
  switch (moodType) {
    case "sleep":
      icon = adviceArray.sleep.iconName;
      advice = adviceArray.sleep.adviceName;
      adviceDescription = adviceArray.sleep.description;
      break;
    case "activities":
      icon = adviceArray.activities.iconName;
      advice = adviceArray.activities.adviceName;
      adviceDescription = adviceArray.activities.description;
      break;
    case "general_mood":
      icon = adviceArray.general_mood.iconName;
      advice = adviceArray.general_mood.adviceName;
      adviceDescription = adviceArray.general_mood.description;
      break;
    case "yourself_time":
      icon = adviceArray.yourself_time.iconName;
      advice = adviceArray.yourself_time.adviceName;
      adviceDescription = adviceArray.yourself_time.description;
      break;
    case "calmness":
      icon = adviceArray.calmness.iconName;
      advice = adviceArray.calmness.adviceName;
      adviceDescription = adviceArray.calmness.description;
      break;
  }
  // const popover = useRef<HTMLIonPopoverElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = (e: any) => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/*<Button onClick={openPopover}>Click Me</Button>*/}
      {isOpen && (
        <>
          <Popup
            close={() => setIsOpen(false)}
            description={advice}
            title={"How to sleep better"}
          />
        </>
      )}
      <div>
        <div
          onClick={open}
          className={`text-white bg-gradient-to-r from-teal-400 via-teal-500 relative flex justify-center cursor-pointer to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-900 w-[50px] h-[50px] rounded-full`}
        >
          <IonIcon
            className={
              "cursor-pointer text-lg text-white absolute top-[16px] left-[16px]"
            }
            icon={icon}
            // style={{ color: "#94c55a" }}
          ></IonIcon>
          <p className="text-[10px] top-[55px] absolute  text-white">
            {" "}
            {advice}
          </p>
        </div>
      </div>
    </>
  );
}
