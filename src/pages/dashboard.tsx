import React, { useState, useEffect } from "react";
import { DashboardTable } from "../components/dashboard/table";
import { Advice } from "../components/dashboard/advice";
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
      window.location.href = "/login";
      console.log("succses logout");
    }
  };

  const fillDashboard = async (startDate: Date, endDate: Date) => {
    const isoStartDate = startDate.toISOString();
    const isoEndDate = endDate.toISOString();
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
          console.log("DATA", data);
        }
      }
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  // console.log(calendarRange);
  return (
    // <div className={"container"}>
    <div className="bg-back-gray w-auto">
      <HeaderDashboard startDate={firstDayOfWeek} endDate={lastDayOfWeek} />
      <div className="text-3xl font-normal text-left text-main-light-green py-[1rem]">
        Welcome, {name}!
      </div>
      <DashboardTable startDate={firstDayOfWeek} endDate={lastDayOfWeek} />
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
