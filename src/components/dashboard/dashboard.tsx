import React, { useState } from "react";
import { capitalizeFirstLetter, logOut } from "./types";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { DashboardTable } from "./table";
import { Advice } from "./advice";
import { IonButton } from "@ionic/react";
import { IonIcon } from "@ionic/react";
import { logoIonic, chevronBack, chevronForward } from "ionicons/icons";
import { Button } from "../layout/button";
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
    <>
      <div className="">
        <div className="">
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

        <div className={"gap - 2"}>
          <p className="text-3xl font-normal text-left text-white pt-[1rem]">
            {`Welcome, ${capitalizeFirstLetter(name)}!`}
          </p>
          <p className="text-md font-normal text-left text-white pt-[1rem]">
            How are you today?
          </p>
        </div>
        <br />
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
        <div className={"before::bg-gray-700 "}>
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
        </div>
        <Button
          name={"ADD TODAY"}
          onClick={() => {
            window.location.href = "/user/survey";
          }}
          className={"text-white cursor-pointer"}
        />

        <Advice />
      </div>
    </>
  );
}
