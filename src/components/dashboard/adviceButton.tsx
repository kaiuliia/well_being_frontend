import React, { useState } from "react";
import { Popup } from "../layout/popup";
import { IonIcon } from "@ionic/react";
import {
  bedOutline,
  accessibilityOutline,
  footstepsOutline,
  bookOutline,
  radioButtonOffOutline,
} from "ionicons/icons";
import {
  sleepTips,
  activityTips,
  moodBoostingTips,
  meTimeTips,
  calmnessTips,
} from "./adviceLibrary";
import { getRandomElements } from "./types";

export function AdviceButton({ moodType }: { moodType: string }) {
  let advice = "";
  let adviceDescription: { [key: string]: string | undefined }[] = [];
  let icon = "";
  let adviceTitle = "";
  const adviceArray = {
    sleep: {
      adviceName: "sleep",
      iconName: bedOutline,
      title: "Here are some tips on how to improve your sleep.",
      description: getRandomElements(sleepTips),
    },

    activities: {
      adviceName: "activity",
      iconName: footstepsOutline,
      title: "Here are some tips on how to be more active during the day.",
      description: getRandomElements(activityTips),
    },

    general_mood: {
      adviceName: "mood",
      iconName: accessibilityOutline,
      title: "Here are some tips on how to make your mood better.",
      description: getRandomElements(moodBoostingTips),
    },

    yourself_time: {
      adviceName: "selfcare",
      iconName: bookOutline,
      title: "Here are some tips how get more time just for yourself.",
      description: getRandomElements(meTimeTips),
    },
    calmness: {
      adviceName: "calmness",
      iconName: radioButtonOffOutline,
      title: "Here are some tips how to more calm.",
      description: getRandomElements(calmnessTips),
    },
  };

  switch (moodType) {
    case "sleep":
      icon = adviceArray.sleep.iconName;
      advice = adviceArray.sleep.adviceName;
      adviceDescription = adviceArray.sleep.description;
      adviceTitle = adviceArray.sleep.title;
      break;
    case "activities":
      icon = adviceArray.activities.iconName;
      advice = adviceArray.activities.adviceName;
      adviceDescription = adviceArray.activities.description;
      adviceTitle = adviceArray.activities.title;
      break;
    case "general_mood":
      icon = adviceArray.general_mood.iconName;
      advice = adviceArray.general_mood.adviceName;
      adviceDescription = adviceArray.general_mood.description;
      adviceTitle = adviceArray.general_mood.title;
      break;
    case "yourself_time":
      icon = adviceArray.yourself_time.iconName;
      advice = adviceArray.yourself_time.adviceName;
      adviceDescription = adviceArray.yourself_time.description;
      adviceTitle = adviceArray.yourself_time.title;
      break;
    case "calmness":
      icon = adviceArray.calmness.iconName;
      advice = adviceArray.calmness.adviceName;
      adviceDescription = adviceArray.calmness.description;
      adviceTitle = adviceArray.calmness.title;
      break;
  }
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {isOpen && (
        <>
          <Popup
            close={() => setIsOpen(false)}
            description={adviceDescription}
            title={adviceTitle}
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
