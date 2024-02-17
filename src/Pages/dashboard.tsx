import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { DashboardTable } from "../components/dashboard/table";
import { Recomend } from "../components/dashboard/recomend";
import { HeaderDashboard } from "../components/dashboard/header";

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

  console.log("Start of the week:", formattedFirstDayOfWeek);
  console.log("End of the week:", formattedLastDayOfWeek);
  const handleSubmit = () => {};
  // const [names, setNames] = useState('kolya')
  // const onchangeinput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setNames(e.target.value) ;
  // };

  const calendarRange = value;

  console.log(calendarRange);
  return (
    <div className="bg-back-gray w-100">
      <HeaderDashboard />
      <div className="text-lg font-medium text-left text-main-light-green">
        Welcome, {name}!
      </div>
      <DashboardTable />

      <div className="text-xs font-medium text-left ">
        Recomendations for today:
      </div>
      <Recomend />
      <Calendar
        onChange={onChange}
        onClickDay={(value, event) => alert(value)}
        value={value}
        goToRangeStartOnSelect={true}
        onViewChange={({ action, activeStartDate, value, view }) => alert(view)}
      />
      {/*<input onChange={onchangeinput}></input>*/}
      {/*<button onClick={handleSubmit}>submit</button>*/}
    </div>
  );
}
//useref
// export default Login;
