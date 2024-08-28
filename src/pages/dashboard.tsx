import React, { useState, useEffect } from "react";
import { DashboardTable } from "../components/dashboard/table";
import { Advice } from "../components/dashboard/advice";
import { convertMonthToString, logOut } from "../components/dashboard/types";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocalStore } from "../store/useStore";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface User {
  email: string;
  password: string;
}

export function Dashboard() {
  const name = localStorage.getItem("name");
  const { survey, setSurvey } = useLocalStore();

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
  const fillDashboard = async (
    setData: any,
    startDate?: Date,
    endDate?: Date,
  ) => {
    const isoStartDate = startDate && startDate.toISOString();
    const isoEndDate = endDate && endDate.toISOString();
    console.log("startDate", startDate);
    try {
      const response = await fetch(
        `http://localhost:9090/survey?startDate=${isoStartDate}&endDate=${isoEndDate}`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (response.status > 299) {
        console.log("err");
      } else {
        console.log("response", response);
        const data = await response.json();
        if (data.length > 0) {
          console.log("result", data);

          setData(data);
        }
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  function handleDateChange(date: Date) {
    setSelectedDate(date);
    let currentDate = moment(date);

    let weekStart = currentDate.clone().startOf("isoWeek");
    let weekEnd = currentDate.clone().endOf("isoWeek");
    let days = [];

    for (let i = 0; i <= 6; i++) {
      days.push(moment(weekStart).add(i, "days").toDate());
    }

    setWeekDates(days);
  }

  const [dashboardData, setDashboardData] = useState();
  // useEffect(() => {
  //   result && setDashboardData(result);
  // }, []);

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
  // console.log("dashboardData", dashboardData);
  useEffect(() => {
    handleDateChange(selectedDate);
  }, []);

  function fillMissingDates(data: any, startDate: any, endDate: any) {
    // Ensure the time part of the date is set to midnight in local time
    startDate?.setHours(0, 0, 0, 0);
    endDate?.setHours(0, 0, 0, 0);

    // Create a new Date object for iteration
    let currentDate = new Date(startDate);

    // Create an array to store the final result
    let filledData = [];

    // Iterate over the date range
    while (currentDate <= endDate) {
      // Format the current date as a string (yyyy-mm-dd) without converting to UTC
      let formattedDate = `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1,
      ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;

      // Check if the current date exists in the original data
      let existingData =
        data && data.find((item: any) => item.date === formattedDate);

      // If the date exists, add the existing object to the filledData array
      // Otherwise, add a new object with null values
      if (existingData) {
        filledData.push(existingData);
      } else {
        filledData.push({
          date: formattedDate,
          id: null,
          user_id: null,
          general_mood: null,
          sleep: null,
          activities: null,
          yourself_time: null,
          calmness: null,
        });
      }

      // Move to the next date
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return filledData;
  }
  console.log("dashboardData", dashboardData);
  useEffect(() => {
    fillDashboard(
      setDashboardData,
      weekDates[0],
      weekDates[weekDates.length - 1],
    );
  }, [selectedDate]);

  const wholeWeek = fillMissingDates(
    dashboardData,
    weekDates[0],
    weekDates[weekDates.length - 1],
  );
  console.log("wholeWeek", wholeWeek);

  const handleAddSleep = async (sleepNum: number) => {
    const response = await fetch("http://localhost:9090/survey/sleep", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        sleep: sleepNum,
        date: new Date().toISOString(), // Sending the current date
      }),
    });
    if (response.status > 299) {
      const error = await response.json();
      console.log("ERR SLEEP REQ");
    } else {
      const message = await response.json();
      console.log("SLEEP IS THERE", message);
    }
  };

  const handleAddMood = () => {};
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
        dashboardData={dashboardData}
        weekDates={weekDates}
        boardYear={boardYear}
        boardStartMonth={boardStartMonth}
        // boardData={}
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
        Recomendations for dtoday:
      </div>
      <div className={"bg-blue-300 w-fit h-fit"}>
        <button
          onClick={() => handleAddSleep(1)}
          className={"pl-[1rem] font-extrabold text-2xl"}
        >
          SLEEP
        </button>
        <div className={"bg-green-300 w-fit h-fit"}>
          <button
            onClick={() => handleAddMood()}
            className={"pl-[1rem] font-extrabold text-2xl"}
          >
            MOOD
          </button>
        </div>
      </div>
      <Advice />
      <div>
        <a
          className={"text-red-300 cursor-pointer"}
          onClick={() =>
            fillDashboard(
              setDashboardData,
              weekDates[0],
              weekDates[weekDates.length - 1],
              // new Date(2024, 7, 20),
              // new Date(2024, 7, 28),
            )
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
