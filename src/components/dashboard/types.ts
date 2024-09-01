import React from "react";
import { Survey } from "./survey";

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

//DATE FUNCTIONS
export function convertMonthToString(month: number): string {
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Check if the month number is valid
  if (month < 0 || month > 11) {
    throw new Error("Invalid month number");
  }

  return monthNames[month];
}

//DASHBOARD VIEW FUNCTIONS

export const getColorFromNumber = (point: string | null) => {
  if (point === null) {
    return "bg-black-700";
  }
  if (Number(point) === 0) {
    return "bg-black-700 border-[1px] border-black";
  }

  if (Number(point) < 30) {
    return "bg-scale-light";
  } else if (Number(point) >= 30 && Number(point) <= 70) {
    return "bg-scale-medium";
  } else {
    return "bg-scale-dark";
  }
};

export interface Survey {
  general_mood: number | number[];
  activities: number | number[];
  sleep: number | number[];
  calmness: number | number[];
  yourself_time: number | number[];
}
export interface SliderName {
  name: string;
  min: string;
  max: string;
  surveyKey: keyof Survey;
}
export const sliderName: SliderName[] = [
  {
    name: "Mood",
    min: "Bad",
    max: "Very good",
    surveyKey: "general_mood",
  },
  {
    name: "Activities",
    min: "Not active",
    max: "Very active",
    surveyKey: "activities",
  },
  {
    name: "Sleep",
    min: "Feel shattered",
    max: "Well-rested",
    surveyKey: "sleep",
  },
  {
    name: "Calmness",
    min: "Feel anxious",
    max: "Feel calm",
    surveyKey: "calmness",
  },
  {
    name: "Time for me",
    min: "None",
    max: "A lot",
    surveyKey: "yourself_time",
  },
];

//USERDATA

export const logOut = async () => {
  const response = await fetch("http://localhost:9090/logout", {
    method: "POST",
    credentials: "include",
  });
  if (response.status > 299) {
  } else {
    localStorage.clear();
    window.location.href = "/login";
  }
};
