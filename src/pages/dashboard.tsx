import React, { useState, useEffect } from "react";
import { DashboardTable } from "../components/dashboard/table";
import { Advice } from "../components/dashboard/advice";
import {
  convertMonthToString,
  fillDashboard,
  logOut,
} from "../components/dashboard/types";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface User {
  email: string;
  password: string;
}
export function Dashboard() {
  const name = localStorage.getItem("name");

  const [open, setOpen] = useState(false);
  const [boardYear, setBoardYear] = useState<number>(new Date().getFullYear());
  const [boardStartMonth, setBoardStartMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [boardEndMonth, setBoardEndMonth] = useState<number>();

  const dialogOpen = () => {
    setOpen(!open);
  };
  const handleSurveyClick = () => {
    window.location.href = "/login/user/survey";
  };
  const chosenDate = new Date(); // Your chosen date

  // Find the first day of the week (Sunday)
  const firstDayOfWeek = new Date(chosenDate);
  firstDayOfWeek.setDate(chosenDate.getDate() - chosenDate.getDay());

  // Find the last day of the week (Saturday)
  const lastDayOfWeek = new Date(chosenDate);
  lastDayOfWeek.setDate(chosenDate.getDate() - chosenDate.getDay() + 7);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [weekDates, setWeekDates] = useState<Date[]>([]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);

    const start = startOfWeek(date, { weekStartsOn: 1 }); // Week starts on Monday
    const end = endOfWeek(date, { weekStartsOn: 1 });
    const dates: any[] = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
      dates.push(day);
    }
    // @ts-ignore
    setWeekDates(dates);
    console.log("weekdates", weekDates);
  };
  const handleRangeMinusWeek = (weekDates: Date[]) => {
    let previousWeek;
    previousWeek = weekDates.map((date) => addDays(date, -7));
    if (previousWeek) {
      setWeekDates(previousWeek);
      const newSelectedStartDate = previousWeek[0];
      const newSelectedEndDate = previousWeek[previousWeek.length - 1];
      setSelectedDate(newSelectedStartDate);
      setBoardStartMonth(newSelectedStartDate.getMonth());
      setBoardEndMonth(newSelectedEndDate.getMonth());
      setBoardYear(newSelectedStartDate.getFullYear());
    }
  };

  const handleRangePlusWeek = (weekDates: Date[]) => {
    let nextWeek;

    nextWeek = weekDates.map((date) => addDays(date, 7));

    if (nextWeek) {
      setWeekDates(nextWeek);
      const newSelectedStartDate = nextWeek[0];
      const newSelectedEndDate = nextWeek[nextWeek.length - 1];
      setSelectedDate(newSelectedStartDate);
      setBoardStartMonth(newSelectedStartDate.getMonth());
      setBoardEndMonth(newSelectedEndDate.getMonth());
      setBoardYear(newSelectedStartDate.getFullYear());
    }
  };

  console.log(selectedDate);

  useEffect(() => {
    handleDateChange(selectedDate);
  }, []);

  console.log("board month,", boardStartMonth);
  return (
    // <div className={"container"}>
    <div className="bg-back-gray w-auto">
      <div className="flex justify-between">
        <div>
          <button
            onClick={() => handleRangeMinusWeek(weekDates)}
            className={"pl-[10rem] font-extrabold text-2xl"}
          >
            -
          </button>{" "}
          <button
            onClick={() => handleRangePlusWeek(weekDates)}
            className={"pl-[1rem] font-extrabold text-2xl"}
          >
            +
          </button>
          <DatePicker
            selected={selectedDate}
            calendarStartDay={1}
            // onSelect={handleDateChange} //when day is clicked
            onChange={handleDateChange} //only when value has changed
          />
        </div>
        <FontAwesomeIcon icon={faSliders} color="#BBC1CE" size={"xl"} />
      </div>
      {/*<HeaderDashboard startDate={firstDayOfWeek} endDate={lastDayOfWeek} />*/}
      <div className="text-3xl font-normal text-left text-main-light-green py-[1rem]">
        Welcome, {name}!
      </div>
      <DashboardTable
        weekDates={weekDates}
        boardYear={boardYear}
        boardStartMonth={boardStartMonth}
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
        Recomendations for today:
      </div>
      <Advice />
      <div>
        <a
          className={"text-red-300 cursor-pointer"}
          onClick={() =>
            fillDashboard(new Date(2023, 10, 18), new Date(2023, 10, 23))
          }
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
