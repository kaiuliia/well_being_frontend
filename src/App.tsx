import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import { Register } from "./components/registerform";
import { Login } from "./components/loginform";
import { Route, Routes, NavLink } from "react-router-dom";
import { MainPage } from "./components/mainpage";
import { Survey } from "./components/survey";
import { Dashboard } from "./components/dashboard";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <NavLink to="/">Main</NavLink>
        <NavLink to="/register">Reg</NavLink>
        <NavLink to="/login"> Log</NavLink>
        <NavLink to="/login/user"> User </NavLink>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register title="hrhr" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/user" element={<Dashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
