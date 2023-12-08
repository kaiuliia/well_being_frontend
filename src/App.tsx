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
import { EntryPage } from "./Pages/entry";
import { RequireAuth } from "./hoc/RequireAuth";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#FF5733",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#E0C2FF",
      light: "#F5EBFF",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#47008F",
    },
  },
});

function App() {
  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleRegisterClick = () => {
    window.location.href = "/register";
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        {/*<NavLink to="/">Main</NavLink>*/}
        {/*<NavLink to="/register">Reg</NavLink>*/}
        {/*<NavLink to="/login"> Log</NavLink>*/}
        {/*<NavLink to="/login/user"> User </NavLink>*/}

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
        <Button onClick={handleLoginClick}>Login</Button>
        <Button onClick={handleRegisterClick}>Register</Button>
      </div>
    </ThemeProvider>
  );
}

export default App;
