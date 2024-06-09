import React from "react";
import { addDays, endOfWeek, startOfWeek } from "date-fns/index";

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

export function getDaysInMonth(month: number, year: number) {
  // Adjust month from 1-12 to 0-11 for JavaScript Date
  month = month - 1;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    daysArray.push({ date, dayOfWeek });
  }

  return daysArray;
}

//DASHBOARD VIEW FUNCTIONS

export const fillDashboard = async (startDate: Date, endDate: Date) => {
  const isoStartDate = startDate.toISOString();
  const isoEndDate = endDate.toISOString();
  try {
    const response = await fetch(
      `http://localhost:9090/survey?startDate=${isoStartDate}&endDate=${isoEndDate}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    if (response.status > 299) {
      console.log("err");
    } else {
      console.log("response", response);
      const data = await response.json();
      if (data.length > 0) {
        console.log("result", data);
        console.log("date", data[0].date);
      }
    }
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    console.error("There was a problem with the fetch operation:", error);
  }
};

// export const addDays = (date: Date, days: number): Date => {
//   const result = date;
//   result.setDate(result.getDate() + days);
//   return result;
// };

export const getColorFromNumber = (number: number) => {
  if (number === 0) {
    return "bg-white";
  }
  if (number < 30) {
    return "bg-custom-red";
  } else if (number >= 30 && number <= 70) {
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