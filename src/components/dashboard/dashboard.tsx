import React, { useState, useEffect } from "react";
import { capitalizeFirstLetter, formatDate, logOut } from "./types";
import DatePicker from "react-datepicker";
import { DashboardTable } from "./table";
import { Advice } from "./advice";
import { Button } from "../layout/button";
import { useLocalStore } from "../../store/useStore";
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
  const { dashboard, adviceToday, advicesArray, getTodayAdvice } =
    useLocalStore();
  // const [adv, setAdv] = useState([]);

  useEffect(() => {
    const fetchAdvice = async () => {
      const response = await getTodayAdvice();
    };

    fetchAdvice();
  }, []);

  console.log("adv arra", advicesArray);
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
          {adviceToday ? (
            <p className="text-md font-normal text-left text-white pt-[1.5rem]">
              It's time for self care. See advices
            </p>
          ) : (
            <p className="text-md font-normal text-left text-white pt-[1rem]">
              How are you today?
            </p>
          )}
        </div>
        {adviceToday && <Advice />}

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

        <div className={"before::bg-gray-700"}>
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
          name={adviceToday ? "EDIT TODAY" : "ADD TODAY"}
          className={"text-white cursor-pointer"}
          onClick={() => {
            window.location.href = "/user/survey";
          }}
        />
      </div>
    </>
  );
}
