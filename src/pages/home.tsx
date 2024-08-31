import React, { useState, useEffect } from "react";
import { Dashboard } from "../components/dashboard/dashboard";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";
import { useLocalStore } from "../store/useStore";

export function Home() {
  const [boardYear, setBoardYear] = useState<number | number[]>(
    new Date().getFullYear(),
  );
  const [boardStartMonth, setBoardStartMonth] = useState<number>(
    new Date().getMonth(),
  );
  const { survey, dashboard } = useLocalStore();
  const { setDashboard, fetchAndUpdateDashboard } = useLocalStore((state) => ({
    setDashboard: state.setDashboard,
    fetchAndUpdateDashboard: state.fetchAndUpdateDashboard,
  }));
  console.log("survey", survey);
  const [boardEndMonth, setBoardEndMonth] = useState<number>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekDates, setWeekDates] = useState<Date[]>([]);
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

  // console.log(fetchAndUpdateDashboard(setDashboard, ));

  // const fillDashboard = async (
  //   setData: any,
  //   startDate?: Date,
  //   endDate?: Date,
  // ) => {
  //   if (startDate === undefined || endDate === undefined) {
  //     return;
  //   }
  //   const isoStartDate = startDate && startDate.toISOString();
  //   const isoEndDate = endDate && endDate.toISOString();
  //   console.log("startDate", startDate);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:9090/survey?startDate=${isoStartDate}&endDate=${isoEndDate}`,
  //       {
  //         method: "GET",
  //         credentials: "include",
  //       },
  //     );
  //     if (response.status > 299) {
  //       console.log("err");
  //     } else {
  //       console.log("response", response);
  //       const data = await response.json();
  //       if (data.length > 0) {
  //         console.log("result", data);
  //
  //         setData(data);
  //       }
  //     }
  //   } catch (error) {
  //     // Handle any errors that occur during the fetch operation
  //     console.error("There was a problem with the fetch operation:", error);
  //   }
  // };
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

  const [dashboardData, setDashboardData] = useState();

  useEffect(() => {
    handleDateChange(selectedDate);
  }, []);

  // function fillMissingDates(data: any, startDate: any, endDate: any) {
  //   if (!data) {
  //     return;
  //   }
  //
  //   startDate?.setHours(0, 0, 0, 0);
  //   endDate?.setHours(0, 0, 0, 0);
  //
  //   let currentDate = new Date(startDate);
  //   let filledData = [];
  //
  //   while (currentDate <= endDate) {
  //     let formattedDate = `${currentDate.getFullYear()}-${String(
  //       currentDate.getMonth() + 1,
  //     ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
  //
  //     let existingData =
  //       data && data.find((item: any) => item.date === formattedDate);
  //
  //     if (existingData) {
  //       filledData.push(existingData);
  //     } else {
  //       filledData.push({
  //         date: formattedDate,
  //         id: null,
  //         user_id: null,
  //         general_mood: null,
  //         sleep: null,
  //         activities: null,
  //         yourself_time: null,
  //         calmness: null,
  //       });
  //     }
  //     currentDate.setDate(currentDate.getDate() + 1);
  //   }
  //   return filledData;
  // }

  useEffect(() => {
    fetchAndUpdateDashboard(
      (data) =>
        setDashboard(data, weekDates[0], weekDates[weekDates.length - 1]),
      weekDates[0],
      weekDates[weekDates.length - 1],
    );
  }, [selectedDate, survey]);

  console.log("dashboard", dashboard);
  return (
    <Dashboard
      boardYear={boardYear}
      boardStartMonth={boardStartMonth}
      boardEndMonth={boardEndMonth}
      handleChangeRangeWeek={handleChangeRangeWeek}
      handleDateChange={handleDateChange}
      selectedDate={selectedDate}
      wholeWeek={dashboard.length > 0 && dashboard}
      weekDates={weekDates}
    />
  );
}
