import React, { useState } from "react";
import { convertMonthToString, getColorFromNumber } from "./types";
import { IonIcon } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";

interface MoodData {
  weekDay: string;
  dateRange?: string;
  date: Date;
  general_mood: number;
  activities: number;
  sleep: number;
  calmness: number;
  yourself_time: number;
}

interface MoodProps {
  name: string;
  key: keyof Pick<
    MoodData,
    "general_mood" | "activities" | "sleep" | "calmness" | "yourself_time"
  >;
}

interface DashboardTableProps {
  weekDates: any[];
  boardYear: number | number[];
  boardStartMonth: number;
  boardEndMonth: number | undefined;
  dashboardData: any;
  handleChangeRangeWeek: (weekDates: Date[], action: string) => void;
}
export function DashboardTable({
  weekDates,
  boardYear,
  boardStartMonth,
  boardEndMonth,
  dashboardData,
  handleChangeRangeWeek,
}: DashboardTableProps) {
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
  const nameOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  const moodProps: MoodProps[] = [
    {
      name: "General_mood",
      key: "general_mood",
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

  return (
    <>
      <IonIcon
        onClick={() => handleChangeRangeWeek(weekDates, "minus_week")}
        className={"cursor-pointer"}
        icon={chevronBack}
        style={{ color: "#ffffff" }}
      ></IonIcon>
      <IonIcon
        onClick={() => handleChangeRangeWeek(weekDates, "plus_week")}
        className={"cursor-pointer"}
        icon={chevronForward}
        style={{ color: "#ffffff" }}
      ></IonIcon>
      <p className={"text-white"}>{boardYear}</p>
      <div className="flex flex-row">
        <p className={" text-white"}>
          {convertMonthToString(boardStartMonth).toLowerCase()}
        </p>
        {boardEndMonth !== undefined && (
          <p className={" text-white"}>
            {convertMonthToString(boardEndMonth).toLowerCase()}{" "}
          </p>
        )}
      </div>
      <table className="table-fixed text-white w-auto  pb-3 text-center border-separate border-spacing-0.5 leading-[0.5rem] ">
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
            <tr className="p-[0.5rem] text-white" key={moodType.name}>
              <th className="p-[0.5rem] text-xs font-normal text-left align-top text-white">
                {moodType.name}
              </th>

              {daysOfWeek.map((day, idx) => (
                <th key={day}>
                  <div
                    className={
                      // dashboardData &&
                      (dashboardData
                        ? getColorFromNumber(dashboardData[idx][moodType.key])
                        : "bg-white") + " rounded-md shadow-lg -white w-7 h-7"
                    }
                  ></div>
                </th>
              ))}
            </tr>
          ))}
        </tbody>
        <thead className="p-0">
          <tr>
            <th className="p-[0.5rem] "></th>
            {daysOfWeek.map((day, idx) => (
              <th key={day} className=" text-xs text-white font-medium">
                {nameOfWeek[idx]}
              </th>
            ))}
          </tr>
        </thead>
      </table>
    </>
  );
}
