import React, { useState, useEffect } from "react";
import { Dashboard } from "../components/dashboard/dashboard";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { useLocalStore } from "../store/useStore";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [boardYear, setBoardYear] = useState<number | number[]>(
    new Date().getFullYear(),
  );
  const [boardStartMonth, setBoardStartMonth] = useState<number>(
    new Date().getMonth(),
  );
  const { survey } = useLocalStore();
  const {
    setDashboard,
    fetchAndUpdateDashboard,
    dashboard,
    postSurveyData,
    weekDates,
    setWeekDates,
  } = useLocalStore();
  // (state) => ({
  //   dashboard: state.dashboard,
  //   setDashboard: state.setDashboard,
  //   fetchAndUpdateDashboard: state.fetchAndUpdateDashboard,
  // }),
  console.log("survey", survey);
  const [boardEndMonth, setBoardEndMonth] = useState<number>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const [weekDates, setWeekDates] = useState<Date[]>([]);
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

  function handleDateChange(date: Date) {
    setSelectedDate(date);
    let currentDate = moment(date);

    let weekStart = currentDate.clone().startOf("isoWeek");
    let days = [];

    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, "days").toDate());
    }

    setWeekDates(days);
  }

  useEffect(() => {
    handleDateChange(selectedDate);
  }, []);

  useEffect(() => {
    console.log(1);
    fetchAndUpdateDashboard(
      (data) =>
        setDashboard(data, weekDates[0], weekDates[weekDates.length - 1]),
      weekDates[0],
      weekDates[weekDates.length - 1],
    );
    console.log(2);
  }, [selectedDate, survey]);
  console.log("weekdate", weekDates[0]);
  console.log("dashboard", dashboard);
  return (
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
  );
}
