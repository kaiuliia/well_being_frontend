import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import icon from "../assets/icon.png";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
interface Props {}

interface User {
  email: string;
  password: string;
}
export function EntryPage(props: Props) {
  const defaultTheme = createTheme();
  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleRegisterClick = () => {
    window.location.href = "/register";
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          WELLBE
          <Button
            variant="contained"
            sx={{
              width: "10rem",
              backgroundColor: "#A5BB5A",
              color: "#FFFFFF",
            }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Button
            variant="contained"
            sx={{
              width: "10rem",
              backgroundColor: "#8B98AF",
              color: "#FFFFFF",
            }}
            onClick={handleRegisterClick}
          >
            Register
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

//login
// register
// dashboard
// entry
// -----pages

// survey
// meditatin
// video
// calendar
// settings
// recomendations
// ----dialogs
