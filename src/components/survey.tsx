import React, { useState, useEffect } from "react";

import { MouseEvent } from "../types";
import { Button } from "./layout/button";
import { useLocalStore } from "../store/useStore";
import { Slider } from "@mui/material";

interface Props {}

interface User {
  email: string;
  password: string;
}
interface SliderName {
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
  const [sliderValue, setSliderValue] = useState<number>(0);

  const { survey, setSurvey } = useLocalStore();
  // const [survey, setSurvey] = useState<Survey>({
  //   mood: 0,
  //   activities: 0,
  //   sleep: 0,
  //   calmness: 0,
  //   yourself_time: 0,
  // });

  console.log("survey", survey);
  const sliderName: SliderName[] = [
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
    event: Event,
    value: number | number[],
    name: string,
  ) => {
    setSliderValue(value as number);
    // setSliderName(name);
  };
  console.log("slader vel", sliderValue);
  console.log("surv2", survey);

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();

    await sendData({
      mood: survey.mood,
      activities: survey.activities,
      sleep: survey.sleep,
      calmness: survey.calmness,
      yourself_time: survey.yourself_time,
    });
    window.location.href = "/user/dashboard";
    setSubmitted(true);
    setError(false);
    console.log("SUBMITTED!!!!", survey);
  };
  const color = () => {
    // setSliderValue(newValue as number[]);
    if (sliderValue === 0) {
      return "#EFF1F4";
    }
    if (sliderValue < 30) {
      return "#680010";
    } else if (sliderValue >= 30 && sliderValue <= 70) {
      return "#E98600";
    } else {
      return "#05413E";
    }
  };
  return (
    <div className="w-100% py-[2rem] px-[1rem] mx-auto bg-back-gray">
      <p className={"title"}> How are you today?</p>

      {sliderName.map((slider) => (
        <div className={"w-100% mx-auto"}>
          <div className="w-100% h-auto flex flex-column p-[0.8rem] align-start bg-white">
            <p className={"paragraph"}>{slider.surveyKey}</p>

            <Slider
              // className={`w-100% m-0 p-0 bg-${color}`}
              sx={{
                width: "100%",
                margin: "0rem",
                padding: "0rem",
                color: color,
                "& .MuiSlider-valueLabel": {
                  backgroundColor: color,
                },
              }}
              // value={sliderValue[1]}
              valueLabelDisplay="auto"
              color="primary"
              onChange={(event, value) =>
                handleSliderChange(event, value, slider.surveyKey)
              }
              value={sliderValue}
            />

            <div className={"flex flex-row justify-between align-center"}>
              <p className={"paragraph"}>{slider.min}</p>
              <p className={"paragraph"}>{slider.max}</p>
            </div>

            {/*<SliderBar*/}
            {/*  // colors={colors[0]}*/}
            {/*  survey={slider.name}*/}
            {/*  onChange={(value: number) =>*/}
            {/*    handleSliderChange(value, slider.surveyKey)*/}
            {/*  }*/}
            {/*  min={slider.min}*/}
            {/*  max={slider.max}*/}
            {/*/>*/}
            <br></br>
            {/*</Box>*/}
          </div>
        </div>
      ))}
      <div className="flex flex-center">
        <Button name={"Submit"} onClick={handleSubmit} />
      </div>
    </div>
  );
}
