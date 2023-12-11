import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import { Register } from "./Pages/registerform";
import { Login } from "./Pages/loginform";
import { Route, Routes, NavLink } from "react-router-dom";
import { MainPage } from "./Pages/mainpage";
import { Survey } from "./components/survey";
import { Dashboard } from "./Pages/dashboard";
import { Advices } from "./components/advices";
import Button from "@mui/material/Button";
import { EntryPage } from "./Pages/Entry";
import { RequireAuth } from "./hoc/RequireAuth";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#A5BB5A",
      light: "#EFF1F4",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#8B98AF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
  },
});

function App() {
  // const handleLoginClick = () => {
  //   window.location.href = "/login";
  // };
  //
  // const handleRegisterClick = () => {
  //   window.location.href = "/register";
  // };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/register" element={<Register title="hrhr" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/login/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="/login/user/advises" element={<Advices />} />
          <Route path="/login/user/survey" element={<Survey />} />
        </Routes>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
