import React, { useState } from "react";
import { logOut } from "./types";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { DashboardTable } from "./table";
import { Advice } from "./advice";
import { IonIcon } from "@ionic/react";
import { logoIonic, chevronBack, chevronForward } from "ionicons/icons";
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
    <div className=" w-auto">
      <div className="flex justify-between">
        <div>
          <div className={"hidden"}>
            <DatePicker
              selected={selectedDate}
              calendarStartDay={1}
              onChange={handleDateChange} //only when value has changed
            />
          </div>
        </div>
      </div>

      <div className="text-3xl font-normal text-left text-main-light-green py-[1rem]">
        Welcome, {name}!
      </div>
      {/*<button*/}
      {/*  onClick={() => handleChangeRangeWeek(weekDates, "minus_year")}*/}
      {/*  className={"pl-[10rem] font-extrabold text-2xl"}*/}
      {/*>*/}
      {/*  - year*/}
      {/*</button>{" "}*/}
      {/*<button*/}
      {/*  onClick={() => handleChangeRangeWeek(weekDates, "plus_year")}*/}
      {/*  className={"pl-[1rem] font-extrabold text-2xl"}*/}
      {/*>*/}
      {/*  + year*/}
      {/*</button>*/}
      <DashboardTable
        handleChangeRangeWeek={handleChangeRangeWeek}
        dashboardData={wholeWeek}
        weekDates={weekDates}
        boardYear={boardYear}
        boardStartMonth={boardStartMonth}
        boardEndMonth={
          boardStartMonth !== boardEndMonth ? boardEndMonth : undefined
        }
      ></DashboardTable>
      <a
        className={"text-white cursor-pointer"}
        onClick={() => {
          window.location.href = "/user/survey";
        }}
      >
        {" "}
        ADD TODAY
      </a>
      <Advice />
      <div>
        <a className={"text-white cursor-pointer"} onClick={logOut}>
          {" "}
          log out
        </a>
      </div>
    </div>
  );
}
