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

interface Survey {
  general_mood: number | number[];
  appetite: number | number[];
  sleep: number | number[];
  anxiety: number | number[];
  yourself_time: number | number[];
  screen_time: number | number[];
}
export function Survey(props: Props) {
  const [sliderValue, setSliderValue] = useState<number | number[]>();
  const [survey, setSurvey] = useState<Survey>({
    general_mood: 0,
    appetite: 0,
    sleep: 0,
    anxiety: 0,
    yourself_time: 0,
    screen_time: 0,
  });
  const [statusMessage, setStatusMessage] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  // const name = localStorage.getItem("name");
  //
  // const colors: string[] = [
  //   "#BFCCB5",
  //   "#86A789",
  //   "#B2C8BA",
  //   "#D2E3C8",
  //   "#EBF3E8",
  //   "#86A789",
  //   "#7C96AB",
  // ];

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
      anxiety: survey.anxiety,
      yourself_time: survey.yourself_time,
      screen_time: survey.screen_time,
    });
    window.location.href = "login/user/advises";
    setSubmitted(true);
    setError(false);
    console.log("SUBMITTED!!!!", survey);
  };

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
          <SliderBar
            // colors={colors[0]}
            survey={"general mood"}
            onChange={(value: number | number[]) =>
              handleSliderChange(value, "general_mood")
            }
          />
          <br></br>
          <SliderBar
            // colors={colors[1]}
            survey={"appetite"}
            onChange={(value: number | number[]) =>
              handleSliderChange(value, "appetite")
            }
          />
          <br></br>
          <SliderBar
            // colors={colors[2]}
            survey={"sleep"}
            onChange={(value: number | number[]) =>
              handleSliderChange(value, "sleep")
            }
          />
          <br></br>
          <SliderBar
            // colors={colors[3]}
            survey={"anxiety"}
            onChange={(value: number | number[]) =>
              handleSliderChange(value, "anxiety")
            }
          />
          <br></br>
          <SliderBar
            // colors={colors[4]}
            survey={"time just for you"}
            onChange={(value: number | number[]) =>
              handleSliderChange(value, "yourself_time")
            }
          />

          <br></br>
          <SliderBar
            // colors={colors[5]}
            survey={"screen time"}
            onChange={(value: number | number[]) =>
              handleSliderChange(value, "screen_time")
            }
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </Box>
        {/*</Paper>*/}
      </Container>
    </React.Fragment>
  );
}
