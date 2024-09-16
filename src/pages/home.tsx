import React, { useState, useEffect } from "react";
import { Dashboard } from "../components/dashboard/dashboard";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { useLocalStore } from "../store/useStore";
import { logOut } from "../components/dashboard/types";
import { Button } from "../components/layout/button";

export function Home() {
  const [boardYear, setBoardYear] = useState<number | number[]>(
    new Date().getFullYear(),
  );
  const [boardStartMonth, setBoardStartMonth] = useState<number>(
    new Date().getMonth(),
  );
  const {
    weekDates,
    setWeekDates,
    dashboard,
    fetchAndUpdateDashboard,
    getTodayAdvice,
  } = useLocalStore();

  const [boardEndMonth, setBoardEndMonth] = useState<number>();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChangeRangeWeek = (weekDates: Date[], action: string) => {
    const startOfCurrentWeek = moment(selectedDate).clone().startOf("isoWeek");
    const endOfCurrentWeek = moment(selectedDate)
      .clone()
      .endOf("isoWeek")
      .endOf("day");
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

  function handleDateChange(date: Date) {
    setSelectedDate(date);
    let currentDate = moment(date);

    let weekStart = currentDate.clone().startOf("isoWeek");
    let days = [];

    for (let i = 0; i <= 5; i++) {
      days.push(moment(weekStart).add(i, "days").toDate());
    }

    days.push(moment(weekStart).add(6, "days").endOf("day").toDate());

    setWeekDates(days);
  }

  useEffect(() => {
    handleDateChange(selectedDate);
    fetchAndUpdateDashboard();
  }, [selectedDate]);

  return (
    <div className={"w-full h-[100%] relative justify-center"}>
      <div>
        <Dashboard
          boardYear={boardYear}
          boardStartMonth={boardStartMonth}
          boardEndMonth={boardEndMonth}
          handleChangeRangeWeek={handleChangeRangeWeek}
          handleDateChange={handleDateChange}
          selectedDate={selectedDate}
          wholeWeek={dashboard.length === 7 && dashboard}
          weekDates={weekDates}
        />
      </div>

      <div
        className={
          "w-full absolute bottom-0 text-medium-gray text-sm cursor-pointer flex justify-center items-center h-10"
        }
        onClick={logOut}
      >
        log out
      </div>
    </div>
  );
}
//todo: add forgot password, add check remember me in log form,
//todo: adjust desktop vers,
//todo add advices
