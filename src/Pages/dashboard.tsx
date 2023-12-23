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
interface Props {
  theme: Theme;
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
  return (
    <ThemeProvider theme={props.theme}>
      <div>
        <Box
          // component="main"
          sx={
            {
              // backgroundColor: (theme) =>
              //   theme.palette.mode === "dark"
              //     ? theme.palette.grey[100]
              //     : theme.palette.grey[900],
              // flexGrow: 1,
              // height: "100vh",
              // overflow: "auto",
            }
          }
        >
          <Typography component="h2" variant="h4" align="center">
            Hello, {name}! How are you today?
          </Typography>

          <Typography component="h6" variant="h4" align="center">
            Here is your progress for past week
          </Typography>
          <Button onClick={dialogOpen}>Change today</Button>
          {/*<Survey />*/}
        </Box>

        <Dialog fullWidth={true} open={open}>
          <Survey />
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

// export default Login;
