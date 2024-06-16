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

  // const handleDateChange = (date: Date) => {
  //   setSelectedDate(date);
  //
  //   const start = startOfWeek(date, { weekStartsOn: 1 }); // Week starts on Monday
  //   const end = endOfWeek(date, { weekStartsOn: 1 });
  //   const dates: any[] = [];
  //   for (let day = start; day <= end; day = addDays(day, 1)) {
  //     dates.push(day);
  //   }
  //   // @ts-ignore
  //   setWeekDates(dates);
  //   console.log("weekdates", weekDates);
  // };
  function handleDateChange(date: Date) {
    setSelectedDate(date);
    let currentDate = moment(date);
    console.log("currentDate", currentDate);
    let weekStart = currentDate.clone().startOf("isoWeek");
    let weekEnd = currentDate.clone().endOf("isoWeek");

    let days = [];

    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, "days").toDate());
    }

    setWeekDates(days);
    console.log("week", weekDates);
  }

  // console.log("moment curr weel", getCurrentWeek());
  const handleChangeRangeWeek = (weekDates: Date[], amount: number) => {
    let newRangeWeek;
    newRangeWeek = weekDates.map((date) => addDays(date, amount));
    if (newRangeWeek) {
      setWeekDates(newRangeWeek);
      const newSelectedStartDate = newRangeWeek[0];
      const newSelectedEndDate = newRangeWeek[6];
      setSelectedDate(newSelectedStartDate);
      setBoardStartMonth(newSelectedStartDate.getMonth());
      setBoardEndMonth(newSelectedEndDate.getMonth());
      setBoardYear(newSelectedStartDate.getFullYear());
      console.log("BOARDEND", boardEndMonth);
      console.log("weekdatesfun", weekDates);
    }
  };
  console.log("weekdates", weekDates);
  const handleChangeRangeYear = (weekDates: Date[], amount: number) => {
    let newRangeWeek;
    newRangeWeek = weekDates.map((date) => addDays(date, amount));

    if (newRangeWeek) {
      setWeekDates(newRangeWeek);
      console.log("weekdates", weekDates);
      const newSelectedStartDate = newRangeWeek[0];
      const newSelectedEndDate = newRangeWeek[6];
      setSelectedDate(newSelectedStartDate);
      setBoardStartMonth(newSelectedStartDate.getMonth());
      setBoardEndMonth(newSelectedEndDate.getMonth());
      setBoardYear(newSelectedStartDate.getFullYear());
      console.log("BOARDEND", boardEndMonth);
    }
  };
  console.log(selectedDate);

  useEffect(() => {
    handleDateChange(selectedDate);
  }, []);

  console.log("board month rrrrrr,", boardStartMonth);
  return (
    // <div className={"container"}>
    <div className="bg-back-gray w-auto">
      <div className="flex justify-between">
        <div>
          <button
            onClick={() => handleChangeRangeWeek(weekDates, -7)}
            className={"pl-[10rem] font-extrabold text-2xl"}
          >
            - week
          </button>{" "}
          <button
            onClick={() => handleChangeRangeWeek(weekDates, 7)}
            className={"pl-[1rem] font-extrabold text-2xl"}
          >
            + week
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
      <button
        onClick={() => handleChangeRangeWeek(weekDates, -365)}
        className={"pl-[10rem] font-extrabold text-2xl"}
      >
        - year
      </button>{" "}
      <button
        onClick={() => handleChangeRangeWeek(weekDates, 365)}
        className={"pl-[1rem] font-extrabold text-2xl"}
      >
        + year
      </button>
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

//NEXT TIME :
//SORT WEEKDATES ARRAY (now its starts randomly!!!)
//2 fill dashboard according to fetching data

//TODO GLOBALLY
//+- check year - check the february for 29 days
