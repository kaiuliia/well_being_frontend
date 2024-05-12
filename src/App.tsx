import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ThemeOptions } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import { Register } from "./pages/registerform";
import { Login } from "./pages/loginform";
import { Route, Routes, NavLink } from "react-router-dom";
import { MainPage } from "./pages/mainpage";
import { Survey } from "./components/survey";
import { Dashboard } from "./pages/dashboard";
import { Advices } from "./components/advices";
import Button from "@mui/material/Button";
import { EntryPage } from "./pages/entry";
import { RequireAuth } from "./hoc/RequireAuth";
import { AuthProvider } from "./hoc/AuthProvider";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import from "./assets/fonts/";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
const customTheme = createTheme({
  palette: {
    // mode: "light",
    primary: {
      main: "#A5BB5A",
    },
    secondary: {
      main: "#8B98AF",
    },
    info: {
      main: "#05413E",
    },
    error: {
      main: "#680010",
    },
    warning: {
      main: "#E98600",
    },
    success: {
      main: "#526637",
    },
    background: {
      default: "#EFF1F4",
    },
    divider: "rgba(0,0,0,0.12)",
  },
  typography: {
    h1: {
      fontFamily: "roboto",
      fontWeight: 300,
    },
    h2: {
      fontFamily: "roboto",
      // fontWeight: 300,
    },
    h3: {
      fontFamily: "roboto",
    },
    h4: {
      fontFamily: "roboto",
    },
    h5: {
      fontFamily: "roboto",
    },
    h6: {
      fontFamily: "roboto",
    },
  },
});

function App() {
  return (
    // <AuthProvider>
    <ThemeProvider theme={customTheme}>
      {/*//   <CssBaseline />*/}
      <div className={"container"}>
        {/*<Grid*/}
        {/*  container*/}
        {/*  direction="column"*/}
        {/*  justifyContent="center"*/}
        {/*  alignItems="center"*/}
        {/*>*/}
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route path="/register" element={<Register title="hrhr" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/user/dashboard"
            element={
              // <RequireAuth>
              <Dashboard />
              // </RequireAuth>
            }
          />

          <Route path="/login/user/advises" element={<Advices />} />
          <Route path="/login/user/survey" element={<Survey />} />
        </Routes>
        {/*</Grid>*/}
      </div>
    </ThemeProvider>

    // </AuthProvider>
  );
}

export default App;
