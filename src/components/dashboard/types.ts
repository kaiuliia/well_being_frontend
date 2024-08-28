import React from "react";
import { addDays, endOfWeek, startOfWeek } from "date-fns/index";
import moment from "moment/moment";

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
    return "bg-white";
  }
  if (Number(point) === 0) {
    return "bg-white";
  }

  if (Number(point) < 30) {
    return "bg-custom-red";
  } else if (Number(point) >= 30 && Number(point) <= 70) {
    return "bg-custom-orange";
  } else {
    return "bg-custom-green";
  }
};

//USERDATA

export const logOut = async () => {
  const response = await fetch("http://localhost:9090/logout", {
    method: "POST",
    credentials: "include",
  });
  if (response.status > 299) {
    console.log("user still herelogout");
  } else {
    localStorage.clear();
    window.location.href = "/login";
    console.log("succses logout");
  }
};

// export function fillDashboard = ()=> [
//   {
//     date: new Date(2024, 4, 12),
//     mood: 15,
//     activities: 0,
//     sleep: 14,
//     calmness: 0,
//     yourself_time: 0,
//   },
//   {
//     date: new Date(2024, 4, 13),
//     mood: 15,
//     activities: 0,
//     sleep: 14,
//     calmness: 0,
//     yourself_time: 0,
//   },
//   {
//     date: new Date(2024, 4, 14),
//     mood: 15,
//     activities: 0,
//     sleep: 14,
//     calmness: 0,
//     yourself_time: 0,
//   },
//   {
//     date: new Date(2024, 4, 15),
//     mood: 15,
//     activities: 0,
//     sleep: 14,
//     calmness: 0,
//     yourself_time: 0,
//   },
//   {
//     date: new Date(2024, 4, 16),
//     mood: 30,
//     activities: 0,
//     sleep: 14,
//     calmness: 0,
//     yourself_time: 0,
//   },
//
//   {
//     date: new Date(2024, 4, 17),
//     mood: 15,
//     activities: 0,
//     sleep: 14,
//     calmness: 0,
//     yourself_time: 0,
//   },
//
//   {
//     date: new Date(2024, 4, 18),
//     mood: 15,
//     activities: 0,
//     sleep: 14,
//     calmness: 0,
//     yourself_time: 0,
//   },
//   {
//     date: new Date(2024, 4, 19),
//     mood: 15,
//     activities: 0,
//     sleep: 14,
//     calmness: 0,
//     yourself_time: 0,
//   },
// ];
