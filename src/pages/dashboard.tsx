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
  const [boardYear, setBoardYear] = useState<number | number[]>(
    new Date().getFullYear(),
  );
  const [boardStartMonth, setBoardStartMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [boardEndMonth, setBoardEndMonth] = useState<number>();

  const dialogOpen = () => {
    setOpen(!open);
  };

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [weekDates, setWeekDates] = useState<Date[]>([]);

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

  const handleChangeRangeWeek = (weekDates: Date[], action: string) => {
    const startOfCurrentWeek = moment(selectedDate).clone().startOf("isoWeek");
    const endOfCurrentWeek = moment(selectedDate).clone().endOf("isoWeek");
    let startOfNewWeek;
    let endOfNewWeek;
    let startNextYear;
    let newWeekDates: Date[] = [];
    switch (action) {
      case "minus_week":
        startOfNewWeek = startOfCurrentWeek.clone().subtract(1, "week");
        endOfNewWeek = endOfCurrentWeek.clone().subtract(1, "week");
        setSelectedDate(startOfNewWeek.toDate());
        for (let i = 0; i < 7; i++) {
          newWeekDates.push(startOfNewWeek.clone().add(i, "day").toDate());
        }
        setWeekDates(newWeekDates);
        setBoardStartMonth(startOfNewWeek.toDate().getMonth());
        setBoardEndMonth(endOfNewWeek.toDate().getMonth());
        break;
      case "plus_week":
        startOfNewWeek = startOfCurrentWeek.clone().add(1, "week");
        endOfNewWeek = endOfCurrentWeek.clone().add(1, "week");
        setSelectedDate(startOfNewWeek.toDate());
        for (let i = 0; i < 7; i++) {
          newWeekDates.push(startOfNewWeek.clone().add(i, "day").toDate());
        }
        setWeekDates(newWeekDates);
        setBoardStartMonth(startOfNewWeek.toDate().getMonth());
        endOfNewWeek && setBoardEndMonth(endOfNewWeek.toDate().getMonth());
        break;
      case "minus_year":
        startNextYear = startOfCurrentWeek.clone().subtract(1, "year");
        startOfNewWeek = startNextYear.clone().startOf("isoWeek");
        endOfNewWeek = startNextYear.clone().endOf("isoWeek");
        setSelectedDate(startOfNewWeek.toDate());
        for (let i = 0; i < 7; i++) {
          newWeekDates.push(startOfNewWeek.clone().add(i, "day").toDate());
        }
        setWeekDates(newWeekDates);
        setBoardStartMonth(startOfNewWeek.toDate().getMonth());
        setBoardEndMonth(endOfNewWeek.toDate().getMonth());
        break;
      case "plus_year":
        startNextYear = startOfCurrentWeek.clone().add(1, "year");
        startOfNewWeek = startNextYear.clone().startOf("isoWeek");
        endOfNewWeek = startNextYear.clone().endOf("isoWeek");
        setSelectedDate(startOfNewWeek.toDate());
        for (let i = 0; i < 7; i++) {
          newWeekDates.push(startOfNewWeek.clone().add(i, "day").toDate());
        }
        setWeekDates(newWeekDates);
        setBoardStartMonth(startOfNewWeek.toDate().getMonth());
        setBoardEndMonth(endOfNewWeek.toDate().getMonth());
        break;
    }

    if (
      startOfNewWeek &&
      endOfNewWeek &&
      startOfNewWeek.toDate().getFullYear() ===
        endOfNewWeek.toDate().getFullYear()
    ) {
      startOfNewWeek && setBoardYear(startOfNewWeek.toDate().getFullYear());
    } else if (
      startOfNewWeek &&
      endOfNewWeek &&
      startOfNewWeek.toDate().getFullYear() !==
        endOfNewWeek.toDate().getFullYear()
    ) {
      setBoardYear([
        startOfNewWeek.toDate().getFullYear(),
        endOfNewWeek.toDate().getFullYear(),
      ]);
    }
  };

  useEffect(() => {
    handleDateChange(selectedDate);
  }, []);

  return (
    // <div className={"container"}>
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

//2 fill dashboard according to fetching data

//TODO GLOBALLY
//+- check year - check the february for 29 days
