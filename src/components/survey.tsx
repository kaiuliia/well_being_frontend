import React, { useState, useEffect } from "react";

import { SliderBar } from "./slider/slide_bar";
import { MouseEvent } from "../types";
import { Button } from "./layout/button";

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
  mood: number | number[];
  activities: number | number[];
  sleep: number | number[];
  calmness: number | number[];
  yourself_time: number | number[];
}
export function Survey(props: Props) {
  const [sliderValue, setSliderValue] = useState<number | number[]>();
  const [survey, setSurvey] = useState<Survey>({
    mood: 0,
    activities: 0,
    sleep: 0,
    calmness: 0,
    yourself_time: 0,
  });
  const sliderProps: SliderProps[] = [
    {
      name: "Mood",
      min: "Bad",
      max: "Very good",
      surveyKey: "mood",
    },
    {
      name: "Activities",
      min: "Not active",
      max: "Very active",
      surveyKey: "activities",
    },
    {
      name: "Sleep",
      min: "Feel shattered",
      max: "Well-rested",
      surveyKey: "sleep",
    },
    {
      name: "Calmness",
      min: "Feel anxious",
      max: "Feel calm",
      surveyKey: "calmness",
    },
    {
      name: "Time for me",
      min: "None",
      max: "A lot",
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
      mood: survey.mood,
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

  return (
    // <React.Fragment>
    //   <CssBaseline />
    <div className="w-100% py-[2rem] px-[1rem] mx-auto bg-back-gray">
      <p className={"title"}> How are you today?</p>

      {sliderProps.map((prop) => (
        <div className={"w-100% mx-auto"}>
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
          {/*</Box>*/}
        </div>
      ))}
      <div className="flex flex-center">
        <Button name={"Submit"} onSubmit={handleSubmit} />
      </div>
    </div>
    // </React.Fragment>
  );
}
