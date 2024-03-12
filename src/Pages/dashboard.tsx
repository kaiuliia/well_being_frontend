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

  console.log(calendarRange);
  return (
    <div className="bg-back-gray w-100">
      <HeaderDashboard startDate={chosenDate} endDate={chosenDate} />
      <div className="text-lg font-medium text-left text-main-light-green">
        Welcome, {name}!
      </div>
      <DashboardTable />

      <div className="text-xs font-medium text-left ">
        Recomendations for today:
      </div>
      <Recomend />
    </div>
  );
}
//useref
// export default Login;
