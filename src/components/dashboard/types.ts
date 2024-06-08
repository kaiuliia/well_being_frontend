import React from "react";

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
  if (month < 1 || month > 12) {
    throw new Error("Invalid month number");
  }

  return monthNames[month - 1];
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

export const getDateRange = (boardMonth: number, boardYear: number) => {
  let dayOfTheWeekForCurrentDate = getDaysInMonth(boardMonth, boardYear).find(
    (element) => element.date.toLocaleString() === new Date().toLocaleString(),
  );
  return dayOfTheWeekForCurrentDate;
};
export const fillDateOfMonth = (month: number, year: number) => {
  let datesArray = Array(7).fill(0);
  let boardDate = getDaysInMonth(month, year);
  let todayDate: Date = new Date();
  datesArray = boardDate.map((element) => element.dayOfWeek).slice(0, 7);
  return boardDate.slice(0, 7);
};
//DASHBOARD VIEW FUNCTIONS
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
