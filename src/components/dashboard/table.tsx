import React from "react";
import { convertMonthToString, getColorFromNumber } from "./types";
import { IonIcon } from "@ionic/react";
import { chevronBack, chevronForward } from "ionicons/icons";
import { ApiSurvey } from "../../store/useStore";

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
  weekDates: Date[];
  boardYear: number | number[];
  boardStartMonth: number;
  boardEndMonth: number | undefined;
  dashboardData: ApiSurvey[];
  handleChangeRangeWeek: (weekDates: Date[], action: string) => void;
}
export function DashboardTable({
  weekDates,
  boardStartMonth,
  boardEndMonth,
  dashboardData,
  handleChangeRangeWeek,
}: DashboardTableProps) {
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];
  const nameOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  const moodProps: MoodProps[] = [
    {
      name: "Mood",
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
    <div className={"w-fit"}>
      <div className="flex flex-row justify-between items-center">
        <IonIcon
          onClick={() => handleChangeRangeWeek(weekDates, "minus_week")}
          className={"cursor-pointer f"}
          icon={chevronBack}
          style={{ color: "#d27600" }}
        ></IonIcon>{" "}
        <div className={"flex flex-row"}>
          <div className={"text-main-orange font-medium"}>
            {convertMonthToString(boardStartMonth).toLowerCase()}
          </div>
          {boardEndMonth !== undefined && (
            <div className={" text-main-orange font-medium"}>
              {"-" + convertMonthToString(boardEndMonth).toLowerCase()}{" "}
            </div>
          )}
        </div>
        <IonIcon
          onClick={() => handleChangeRangeWeek(weekDates, "plus_week")}
          className={"cursor-pointer"}
          icon={chevronForward}
          style={{ color: "#d27600" }}
        ></IonIcon>
      </div>
      <br />
      <table className="table-fixed text-white w-auto items-center pb-3 text-center border-separate leading-[0.5rem] ">
        <thead className="p-0 ">
          <tr>
            <th className=" "></th>

            {weekDates.map((element, index) => (
              <th key={index} className="text-xs font-medium">
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
                  <div className={"bg-black-900 rounded-md shadow-lg"}>
                    <div
                      className={
                        (dashboardData
                          ? getColorFromNumber(dashboardData[idx][moodType.key])
                          : "bg-white") +
                        " rounded-md shadow-lg -white  w-7 h-7"
                      }
                    ></div>
                  </div>
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
    </div>
  );
}
