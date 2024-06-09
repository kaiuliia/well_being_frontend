import React, { useState, useEffect } from "react";
import { DashboardTable } from "../components/dashboard/table";
import { Advice } from "../components/dashboard/advice";

import { fillDashboard } from "../components/dashboard/types";
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
  const [value, onChange] = useState<Value>(new Date());

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();
  const [selectedCalendarRange, setSelectedCalendarRange] = useState();
  const [startDate, setStartDate] = useState(
    moment().startOf("week").utc().format("D MMM"),
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

  // Formatting the dates to 'YYYY-MM-DD' format
  const formattedFirstDayOfWeek = firstDayOfWeek.toISOString().split("T")[0];
  const formattedLastDayOfWeek = lastDayOfWeek.toISOString().split("T")[0];

  moment.updateLocale("en", {
    week: {
      dow: 1, // Monday is the first day of the week.
    },
  });

  const logOut = async () => {
    const response = await fetch("http://localhost:9090/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.status > 299) {
      console.log("user still herelogout");
    } else {
      localStorage.clear();
      window.location.href = "/login";
      console.log("succses logout");
    }
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };

  const [weekDates, setWeekDates] = useState([]);

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

  console.log(selectedDate);
  useEffect(() => {
    handleDateChange(selectedDate);
  }, []);
  return (
    // <div className={"container"}>
    <div className="bg-back-gray w-auto">
      <div className="flex justify-between">
        <FontAwesomeIcon icon={faCalendarDays} color="#BBC1CE" size={"xl"} />
        <div>
          <FontAwesomeIcon
            icon={faChevronLeft}
            color="#A5BB5A"
            className="pr-2"
            size={"xl"}
          />
          <DatePicker
            selected={selectedDate}
            // onSelect={handleDateChange} //when day is clicked
            onChange={handleDateChange} //only when value has changed
          />
          <FontAwesomeIcon
            icon={faChevronRight}
            color="#A5BB5A"
            className="pl-2"
            size={"xl"}
            // onClick={minusWeek}
          />
        </div>
        <FontAwesomeIcon icon={faSliders} color="#BBC1CE" size={"xl"} />
      </div>
      {/*<HeaderDashboard startDate={firstDayOfWeek} endDate={lastDayOfWeek} />*/}
      <div className="text-3xl font-normal text-left text-main-light-green py-[1rem]">
        Welcome, {name}!
      </div>
      <DashboardTable weekDates={weekDates} endDate={lastDayOfWeek} />
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
