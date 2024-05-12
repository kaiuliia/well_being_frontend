import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import { DashboardTable } from "../components/dashboard/table";
import { Recomend } from "../components/dashboard/recomend";
import { HeaderDashboard } from "../components/dashboard/header";
import moment from "moment";
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
  const handleDateChange = () => {};

  const handleDateSelect = () => {};
  const calendarRange = value;
  // const startDate = moment().startOf("week").utc().format("D MMM");
  const endDate = moment().endOf("week").utc().format("D MMM");
  const logOut = async () => {
    const response = await fetch("http://localhost:9090/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.status > 299) {
      console.log("user still herelogout");
    } else {
      localStorage.clear();
      window.location.href = "/user/login";
      console.log("succses logout");
    }
  };
  console.log(calendarRange);
  return (
    // <div className={"container"}>
    <div className="bg-back-gray w-auto">
      <HeaderDashboard startDate={chosenDate} endDate={chosenDate} />
      <div className="text-3xl font-normal text-left text-main-light-green py-[1rem]">
        Welcome, {name}!
      </div>
      <DashboardTable />
      <a
        className={"text-orange-800"}
        onClick={() => {
          window.location.href = "/sliders";
        }}
      >
        {" "}
        ADD TODAY
      </a>
      <div className="text-xs font-medium text-left ">
        Recomendations for today:
      </div>
      <Recomend />
      <div>
        <a className={"text-red-300"} onClick={logOut}>
          {" "}
          log out
        </a>
      </div>
    </div>
  );
}
