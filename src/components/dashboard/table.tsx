import React, { useState } from "react";
import {
  convertMonthToString,
  getColorFromNumber,
  getDaysInMonth,
  getDateRange,
  fillDateOfMonth,
} from "./types";

interface MoodData {
  weekDay: string;
  dateRange?: string;
  date: Date;
  mood: number;
  activities: number;
  sleep: number;
  calmness: number;
  yourself_time: number;
}

interface MoodProps {
  name: string;
  key: keyof Pick<
    MoodData,
    "mood" | "activities" | "sleep" | "calmness" | "yourself_time"
  >;
}

interface MoodState {
  [day: string | number]: MoodData;
}

interface DashboardTableProps {
  startDate: Date;
  endDate: Date;
}
export function DashboardTable({ startDate, endDate }: DashboardTableProps) {
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
  const [boardYear, setBoardYear] = useState<number>(new Date().getFullYear());
  const [boardMonth, setBoardMonth] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [boardDateRange, setBoardDateRange] = useState<number[]>();
  const moodProps: MoodProps[] = [
    {
      name: "Mood",
      key: "mood",
    },
    {
      name: "Activities",
      key: "activities",
    },
    {
      name: "Sleep",
      key: "sleep",
    },
    {
      name: "Calmness",
      key: "calmness",
    },
    {
      name: "Time for me",
      key: "yourself_time",
    },
  ];

  // const color = moodProps.map((color) => color.color);
  const [moods, setMoods] = useState<MoodState>({
    1: {
      weekDay: "M",
      date: new Date(2024, 4, 12),
      mood: 100,
      activities: 100,
      sleep: 100,
      calmness: 100,
      yourself_time: 100,
    },
    2: {
      weekDay: "T",
      date: new Date(2024, 4, 13),
      mood: 50,
      activities: 40,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    3: {
      weekDay: "W",
      date: new Date(2024, 4, 14),
      mood: 0,
      activities: 90,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },

    4: {
      weekDay: "T",
      date: new Date(2024, 4, 15),
      mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    5: {
      weekDay: "F",
      date: new Date(2024, 4, 15),
      mood: 0,
      activities: 65,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    6: {
      weekDay: "S",
      date: new Date(2024, 4, 16),
      mood: 0,
      activities: 0,
      sleep: 90,
      calmness: 0,
      yourself_time: 0,
    },
    7: {
      weekDay: "S",
      date: new Date(2024, 4, 17),
      mood: 0,
      activities: 80,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
  });

  //TO DO    find date range to show on dashboard and map the date accocrding to days of the week
  console.log("range", getDateRange);
  getDaysInMonth(4, 2024);
  const handleMoodChange = (
    mood: string,
    color: string,
    day: keyof MoodData,
    value: string,
  ) => {
    setMoods((prevMoods) => ({
      ...prevMoods,
      [mood]: {
        ...prevMoods[mood],
        [day]: value,
      },
    }));
  };
  const dates = [12, 13, 14, 15, 16, 17, 18];
  console.log("getDates", getDaysInMonth(4, 2024));
  console.log("fill dates", fillDateOfMonth(boardMonth, boardYear));
  const fillDate = fillDateOfMonth(boardMonth, boardYear);
  console.log(fillDate.map((element) => element.dayOfWeek));
  console.log("RANGE", startDate, endDate);
  console.log("date", new Date(2024, 4, 17));
  return (
    <>
      <p className={"pl-[10rem]"}>{boardYear}</p>
      <p className={"pl-[10rem]"}>{convertMonthToString(boardMonth)}</p>
      <div className={"flex flex-row"}>
        <button className={"pl-[10rem] font-extrabold text-2xl"}>-</button>{" "}
        <button className={"pl-[1rem] font-extrabold text-2xl"}>+</button>
      </div>
      <table className="table-fixed w-auto  pb-3 text-center border-separate border-spacing-0.5 leading-[0.5rem] text-main-secondary-gray">
        <thead className="p-0">
          <tr>
            <th className="p-[0.5rem]"></th>
            {fillDate.map((element) => (
              <th key={element.date.getDate()} className=" text-xs font-medium">
                {element.dayOfWeek.slice(0, 2).toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {moodProps.map((moodType) => (
            <tr className="p-[0.5rem]" key={moodType.name}>
              <th className="p-[0.5rem] text-xs font-normal text-left align-top text-main-secondary-gray">
                {moodType.name}
              </th>

              {daysOfWeek.map((day) => (
                <th key={day}>
                  <div
                    className={
                      getColorFromNumber(moods[day][moodType.key]) +
                      " rounded-md shadow-lg w-7 h-7"
                    }
                  ></div>
                </th>
              ))}
            </tr>
          ))}
        </tbody>
        <thead className="p-0">
          <tr>
            <th className="p-[0.5rem]"></th>
            {fillDate.map((element) => (
              <th key={element.date.getDate()} className=" text-xs font-medium">
                {element.date.getDate()}
              </th>
            ))}
            {/*{fillDateOfMonth(boardMonth, boardYear).map((day: string) => (*/}
            {/*  <th key={day} className=" text-xs font-medium">*/}
            {/*    {day.slice(0, 2).toUpperCase()}*/}
            {/*    /!*{moods[day].weekDay}*!/*/}
            {/*  </th>*/}
            {/*))}*/}
            {/*{daysOfWeek.map((day) => (*/}
            {/*  <th key={day} className=" text-xs font-medium">*/}
            {/*    {moods[day].weekDay}*/}
            {/*  </th>*/}
            {/*))}*/}
          </tr>
        </thead>
      </table>
    </>
  );
}
