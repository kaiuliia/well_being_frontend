import React, { useState } from "react";
import { convertMonthToString, getColorFromNumber } from "./types";

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
  weekDates: any[];
  boardYear: number | number[];
  boardStartMonth: number;
  boardEndMonth: number | undefined;
  dashboardData: any;
}
export function DashboardTable({
  weekDates,
  boardYear,
  boardStartMonth,
  boardEndMonth,
  dashboardData,
}: DashboardTableProps) {
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
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
      mood: 4,
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
      date: new Date(2024, 6, 24),
      mood: 0,
      activities: 80,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
  });

  const dash = [
    {
      activities: "15",
      calmness: "0",
      date: "2024-05-19T18:53:57.223Z",
      general_mood: "10",
      id: "298972bb-b6e4-4f49-850d-bddf1a2787a6",
      sleep: "25",
      user_id: "28f5f6f2-95d8-4fff-8b7d-5c2c621a6a1d",
      yourself_time: "35",
    },
    {
      activities: "15",
      calmness: "0",
      date: "2024-05-19T18:53:57.223Z",
      general_mood: "10",
      id: "298972bb-b6e4-4f49-850d-bddf1a2787a6",
      sleep: "25",
      user_id: "28f5f6f2-95d8-4fff-8b7d-5c2c621a6a1d",
      yourself_time: "35",
    },
    {
      activities: "15",
      calmness: "0",
      date: "2024-05-19T18:53:57.223Z",
      general_mood: "10",
      id: "298972bb-b6e4-4f49-850d-bddf1a2787a6",
      sleep: "25",
      user_id: "28f5f6f2-95d8-4fff-8b7d-5c2c621a6a1d",
      yourself_time: "35",
    },
    {
      activities: "78",
      calmness: "0",
      date: "2024-05-19T18:53:57.223Z",
      general_mood: "10",
      id: "298972bb-b6e4-4f49-850d-bddf1a2787a6",
      sleep: "25",
      user_id: "28f5f6f2-95d8-4fff-8b7d-5c2c621a6a1d",
      yourself_time: "35",
    },
    {
      activities: "16",
      calmness: "0",
      date: "2024-05-19T18:53:57.223Z",
      general_mood: "10",
      id: "298972bb-b6e4-4f49-850d-bddf1a2787a6",
      sleep: "25",
      user_id: "28f5f6f2-95d8-4fff-8b7d-5c2c621a6a1d",
      yourself_time: "35",
    },
    {
      activities: "15",
      calmness: "0",
      date: "2024-05-19T18:53:57.223Z",
      general_mood: "67",
      id: "298972bb-b6e4-4f49-850d-bddf1a2787a6",
      sleep: "25",
      user_id: "28f5f6f2-95d8-4fff-8b7d-5c2c621a6a1d",
      yourself_time: "35",
    },
    {
      activities: "15",
      calmness: "0",
      date: "2024-05-19T18:53:57.223Z",
      general_mood: "11",
      id: "298972bb-b6e4-4f49-850d-bddf1a2787a6",
      sleep: "25",
      user_id: "28f5f6f2-95d8-4fff-8b7d-5c2c621a6a1d",
      yourself_time: "35",
    },
  ];
  console.log("dashboardData", dashboardData);
  const findDayToChange = (today: Date) => {};
  const dateStr = "2023-11-18T10:11:09.655Z";
  const date = new Date(dateStr);

  // setMoods({ ...moods });
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

  return (
    <>
      <p className={"pl-[10rem]"}>{boardYear}</p>
      <div className="flex flex-row">
        <p className={"pl-[10rem]"}>{convertMonthToString(boardStartMonth)}</p>
        {boardEndMonth !== undefined && (
          <p>{convertMonthToString(boardEndMonth)} </p>
        )}
      </div>
      <table className="table-fixed w-auto  pb-3 text-center border-separate border-spacing-0.5 leading-[0.5rem] text-main-secondary-gray">
        <thead className="p-0">
          <tr>
            <th className="p-[0.5rem]"></th>
            {weekDates.map((element) => (
              <th key={element} className=" text-xs font-medium">
                {element.getDate()}
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
                      dashboardData &&
                      getColorFromNumber(dashboardData[0][moodType.key]) +
                        " rounded-md shadow-lg w-7 h-7"
                    }
                    // className={
                    //   getColorFromNumber(moods[day][moodType.key]) +
                    //   " rounded-md shadow-lg w-7 h-7"
                    // }
                  ></div>
                </th>
              ))}
            </tr>
          ))}
        </tbody>
        <thead className="p-0">
          <tr>
            <th className="p-[0.5rem]"></th>
            {daysOfWeek.map((day) => (
              <th key={day} className=" text-xs font-medium">
                {moods[day].weekDay}
              </th>
            ))}
          </tr>
        </thead>
      </table>
    </>
  );
}
