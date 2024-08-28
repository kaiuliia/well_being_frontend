import React, { useState } from "react";
import { logOut } from "./types";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { DashboardTable } from "./table";
import { Advice } from "./advice";

interface DashboardProps {
  wholeWeek: any;
  weekDates: any;
  boardYear: number | number[];

  boardStartMonth: number;
  boardEndMonth?: number;
  handleDateChange: (date: Date) => void;
  selectedDate: Date;
  handleChangeRangeWeek: (weekDates: Date[], action: string) => void;
}
export function Dashboard({
  wholeWeek,
  weekDates,
  boardYear,
  boardStartMonth,
  boardEndMonth,
  selectedDate,
  handleDateChange,
  handleChangeRangeWeek,
}: DashboardProps) {
  const name = localStorage.getItem("name");
  return (
    <div className="bg-back-gray w-auto">
      <div className="flex justify-between">
        <div>
          <button
            onClick={() => handleChangeRangeWeek(weekDates, "minus_week")}
            className={"pl-[10rem] font-extrabold text-2xl"}
          >
            - week
          </button>{" "}
          <button
            onClick={() => handleChangeRangeWeek(weekDates, "plus_week")}
            className={"pl-[1rem] font-extrabold text-2xl"}
          >
            + week
          </button>
          <div className={"hidden"}>
            <DatePicker
              selected={selectedDate}
              calendarStartDay={1}
              // onSelect={handleDateChange} //when day is clicked
              onChange={handleDateChange} //only when value has changed
            />
          </div>
        </div>
        <FontAwesomeIcon icon={faSliders} color="#BBC1CE" size={"xl"} />
      </div>
      {/*<HeaderDashboard startDate={firstDayOfWeek} endDate={lastDayOfWeek} />*/}
      <div className="text-3xl font-normal text-left text-main-light-green py-[1rem]">
        Welcome, {name}!
      </div>
      <button
        onClick={() => handleChangeRangeWeek(weekDates, "minus_year")}
        className={"pl-[10rem] font-extrabold text-2xl"}
      >
        - year
      </button>{" "}
      <button
        onClick={() => handleChangeRangeWeek(weekDates, "plus_year")}
        className={"pl-[1rem] font-extrabold text-2xl"}
      >
        + year
      </button>
      <DashboardTable
        dashboardData={wholeWeek}
        weekDates={weekDates}
        boardYear={boardYear}
        boardStartMonth={boardStartMonth}
        // boardData={}
        boardEndMonth={
          boardStartMonth !== boardEndMonth ? boardEndMonth : undefined
        }
      ></DashboardTable>
      <a
        className={"text-orange-800 cursor-pointer"}
        onClick={() => {
          window.location.href = "/user/survey";
        }}
      >
        {" "}
        ADD TODAY
      </a>
      <div className="text-xs font-medium text-left ">
        Recomendations for dtoday:
      </div>
      <div className={"bg-blue-300 w-fit h-fit"}>
        <button className={"pl-[1rem] font-extrabold text-2xl"}>SLEEP</button>
        <div className={"bg-green-300 w-fit h-fit"}>
          <button className={"pl-[1rem] font-extrabold text-2xl"}>MOOD</button>
        </div>
      </div>
      <Advice />
      <div>
        <a
          className={"text-red-300 cursor-pointer"}
          // onClick={() =>
          //   fillDashboard(
          //     setDashboardData,
          //     weekDates[0],
          //     weekDates[weekDates.length - 1],
          //   )
          // }
        >
          {" "}
          GET DASHBOARD DATA
        </a>
        <a className={"text-red-300 cursor-pointer"} onClick={logOut}>
          {" "}
          log out
        </a>
      </div>
    </div>
  );
}
