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

interface Props {}

interface User {
  email: string;
  password: string;
}

type SurveyType =
  | "appetite"
  | "general_mood"
  | "sleep"
  | "calmness"
  | "yourself_time";

interface Survey {
  general_mood: number | number[];
  appetite: number | number[];
  sleep: number | number[];
  calmness: number | number[];
  yourself_time: number | number[];
}
export function Survey(props: Props) {
  const [sliderValue, setSliderValue] = useState<number | number[]>();
  const [survey, setSurvey] = useState<Survey>({
    general_mood: 0,
    appetite: 0,
    sleep: 0,
    calmness: 0,
    yourself_time: 0,
  });

  const surveyCategories: SurveyType[] = [
    "general_mood",
    "appetite",
    "sleep",
    "calmness",
    "yourself_time",
    // Add more categories as needed
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
      appetite: survey.appetite,
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
  return (
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
          {surveyCategories.map((survey) => (
            <Box>
              <SliderBar
                // colors={colors[0]}
                survey={survey}
                onChange={(value: number | number[]) =>
                  handleSliderChange(value, survey)
                }
              />
              <br></br>
            </Box>
          ))}

          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
        {/*</Paper>*/}
      </Container>
    </React.Fragment>
  );
}
