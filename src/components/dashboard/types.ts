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

export function formatDate(date: Date) {
  // Get the year, month, and day, and format them as "YYYY-MM-DD"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so we add 1
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

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

export const capitalizeFirstLetter = (name: string | null) => {
  if (!name) return ""; // Handle empty string cases
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export function getRandomElements(arr: any) {
  const arrCopy = [...arr];

  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }

  return arrCopy.slice(0, 3);
}
