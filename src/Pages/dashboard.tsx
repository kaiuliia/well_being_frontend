import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Survey } from "../components/survey";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import { Dialog } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Grid from "@mui/material/Grid";
import { DashboardTable } from "../components/dashboard/table";
import { Recomend } from "../components/dashboard/recomend";
interface Props {
  // theme: Theme;
}

interface User {
  email: string;
  password: string;
}
export function Dashboard(props: Props) {
  const name = localStorage.getItem("name");

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const dialogOpen = () => {
    setOpen(!open);
  };
  const handleSurveyClick = () => {
    window.location.href = "/login/user/survey";
  };

  const handleSubmit = () => {};
  // const [names, setNames] = useState('kolya')
  // const onchangeinput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //  setNames(e.target.value) ;
  // };
  return (
    <div className="bg-back-gray w-100">
      <div className="text-lg font-medium text-left text-main-light-green">
        Welcome, {name}!
      </div>
      <DashboardTable />

      <div className="text-xs font-medium text-left ">
        Recomendations for today:
      </div>
      <Recomend />
      {/*<input onChange={onchangeinput}></input>*/}
      {/*<button onClick={handleSubmit}>submit</button>*/}
    </div>
  );
}
//useref
// export default Login;
