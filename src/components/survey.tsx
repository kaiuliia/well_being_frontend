import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SliderBar } from "./slider/slide_bar";
import { MouseEvent } from "../types";
import Button from "@mui/material/Button";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, Theme, ThemeProvider } from "@mui/material/styles";

interface Props {}

interface User {
  email: string;
  password: string;
}
interface SliderProps {
  name: string;
  min: string;
  max: string;
  surveyKey: keyof Survey;
}

interface Survey {
  general_mood: number | number[];
  activities: number | number[];
  sleep: number | number[];
  calmness: number | number[];
  yourself_time: number | number[];
}
export function Survey(props: Props) {
  const [sliderValue, setSliderValue] = useState<number | number[]>();
  const [survey, setSurvey] = useState<Survey>({
    general_mood: 0,
    activities: 0,
    sleep: 0,
    calmness: 0,
    yourself_time: 0,
  });
  const sliderProps: SliderProps[] = [
    {
      name: "General mood",
      min: "Bad",
      max: "Very good",
      surveyKey: "general_mood",
    },
    {
      name: "Activities",
      min: "To low",
      max: "High level",
      surveyKey: "activities",
    },
    {
      name: "Sleep",
      min: "Feel shattered",
      max: "Good",
      surveyKey: "sleep",
    },
    {
      name: "Calmness",
      min: "Fell anxious",
      max: "I'm calm",
      surveyKey: "calmness",
    },
    {
      name: "Time for me",
      min: "Don't have",
      max: "Have a lot",
      surveyKey: "yourself_time",
    },
  ];

  const [statusMessage, setStatusMessage] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const sendData = async (survey: Survey) => {
    const response = await fetch("http://localhost:9090/survey", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(survey),
    });
    if (response.status > 299) {
      const error = await response.json();
      setStatusMessage(error.error);
    } else {
      const message = await response.json();
      setStatusMessage(`Survey ${message} saved to database`);
    }
  };

  const handleSliderChange = (
    value: number | number[],
    sliderName: keyof Survey,
  ) => {
    setSurvey((prevSurvey) => ({
      ...prevSurvey,
      [sliderName]: value,
    }));
    setSliderValue(value);
  };
  console.log(sliderValue);
  console.log(survey);

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();

    await sendData({
      general_mood: survey.general_mood,
      activities: survey.activities,
      sleep: survey.sleep,
      calmness: survey.calmness,
      yourself_time: survey.yourself_time,
    });
    window.location.href = "login/user/advises";
    setSubmitted(true);
    setError(false);
    console.log("SUBMITTED!!!!", survey);
  };

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    // <ThemeProvider theme={props.theme}>
    <React.Fragment>
      <CssBaseline />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        {/*<Paper*/}
        {/*  variant="outlined"*/}
        {/*  elevation={3}*/}
        {/*  sx={{*/}
        {/*    my: { xs: 3, md: 6 },*/}
        {/*    p: { xs: 2, md: 3 },*/}
        {/*    // background: "#DDE6ED",*/}
        {/*  }}*/}
        {/*>*/}

        <Box>
          {sliderProps.map((prop) => (
            <Box>
              <SliderBar
                // colors={colors[0]}
                survey={prop.name}
                onChange={(value: number | number[]) =>
                  handleSliderChange(value, prop.surveyKey)
                }
                min={prop.min}
                max={prop.max}
              />
              <br></br>
            </Box>
          ))}

          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
        {/*</Paper>*/}
      </Container>
    </React.Fragment>
    // </ThemeProvider>
  );
}
