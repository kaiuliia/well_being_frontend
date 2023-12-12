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
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
interface Props {
  theme: Theme;
}

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
    <ThemeProvider theme={props.theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            WellBe
          </Typography>
          {/*<Typography component="h6" variant="h6">*/}
          {/*  Your mental support*/}
          {/*</Typography>*/}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              // width: "10rem",
              color: "#FFFFFF",
            }}
            onClick={handleLoginClick}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,

              // width: "10rem",
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
