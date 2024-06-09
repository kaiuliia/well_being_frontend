import React, { useState, useEffect } from "react";
import { DashboardTable } from "../components/dashboard/table";
import { Advice } from "../components/dashboard/advice";
import { fillDashboard, logOut } from "../components/dashboard/types";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChevronLeft,
  faChevronRight,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
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
  const [boardMonth, setBoardMonth] = useState<number>(
    new Date().getMonth() + 1,
  );

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
    const isFirstDayInTheWeek = weekDates.some(
      (element: Date) => element.getDate() === 1,
    );
    const isJanuary = weekDates.some(
      (element: Date) => element.getMonth() === 0,
    );

    let previousWeek;
    if (!isFirstDayInTheWeek && !isJanuary) {
      previousWeek = weekDates.map((date) => addDays(date, -7));
    }

    previousWeek && setSelectedDate(previousWeek[0]);
    setBoardMonth(selectedDate.getMonth());
    setBoardYear(selectedDate.getFullYear());
    console.log("selectedDate", selectedDate);
    console.log("isFirst", isFirstDayInTheWeek);
    console.log("weekDates", weekDates);
    console.log("isJanuary", isJanuary);
    console.log("previousWeek", previousWeek);
  };
  const handleRangePlusWeek = (weekDates: Date[]) => {
    const isFirstDayInTheWeek = weekDates.some(
      (element: Date) => element.getDate() === 1,
    );
    const isJanuary = weekDates.some(
      (element: Date) => element.getMonth() === 0,
    );

    let previousWeek;
    if (!isFirstDayInTheWeek && !isJanuary) {
      previousWeek = weekDates.map((date) => addDays(date, 7));
    }

    previousWeek && setSelectedDate(previousWeek[0]);
    setBoardMonth(selectedDate.getMonth());
    setBoardYear(selectedDate.getFullYear());
    console.log("selectedDate", selectedDate);
    console.log("isFirst", isFirstDayInTheWeek);
    console.log("weekDates", weekDates);
    console.log("isJanuary", isJanuary);
    console.log("previousWeek", previousWeek);
  };
  console.log(selectedDate);

  useEffect(() => {
    handleDateChange(selectedDate);
  }, []);
  // @ts-ignore
  // @ts-ignore
  return (
    // <div className={"container"}>
    <div className="bg-back-gray w-auto">
      <div className="flex justify-between">
        {/*<FontAwesomeIcon icon={faCalendarDays} color="#BBC1CE" size={"xl"} />*/}
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
          {/*<FontAwesomeIcon*/}
          {/*  icon={faChevronLeft}*/}
          {/*  color="#A5BB5A"*/}
          {/*  className="pr-2"*/}
          {/*  size={"xl"}*/}
          {/*/>*/}
          <DatePicker
            selected={selectedDate}
            calendarStartDay={1}
            // onSelect={handleDateChange} //when day is clicked
            onChange={handleDateChange} //only when value has changed
          />
          {/*<FontAwesomeIcon*/}
          {/*  icon={faChevronRight}*/}
          {/*  color="#A5BB5A"*/}
          {/*  className="pl-2"*/}
          {/*  size={"xl"}*/}
          {/*  // onClick={handleClick}*/}
          {/*/>*/}
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
        boardMonth={boardMonth}
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
