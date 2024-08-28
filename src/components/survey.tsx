import React, { useState, useEffect } from "react";

import { MouseEvent } from "../types";
import { Button } from "./layout/button";
import { useLocalStore } from "../store/useStore";
import { Slider } from "@mui/material";

import { sliderName } from "./types";
import { useNavigate } from "react-router-dom";
interface Props {}
interface Survey {
  general_mood: number | number[];
  activities: number | number[];
  sleep: number | number[];
  calmness: number | number[];
  yourself_time: number | number[];
}

export function Survey(props: Props) {
  const { survey, setSurvey } = useLocalStore();

  const [statusMessage, setStatusMessage] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const sendData = async () => {
    try {
      const response = await fetch("http://localhost:9090/survey", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          general_mood: survey.general_mood,
          activities: survey.activities,
          sleep: survey.sleep,
          calmness: survey.calmness,
          yourself_time: survey.yourself_time,
          date: new Date().toISOString(),
        }),
      });

      if (response.status > 299) {
        const error = await response.json();
        setStatusMessage(error.error);
        setError(true);
      } else {
        const message = await response.json();
        setStatusMessage(`Survey ${message} saved to database`);
        setSubmitted(true);
        navigate("/user/dashboard");
      }
    } catch (error) {
      setStatusMessage("An unexpected error occurred.");
      setError(true);
    }
  };
  const updateValue = (name: keyof Survey, value: number) => {
    setSurvey({
      ...survey,
      [name]: value,
    });
  };

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();
    await sendData();
  };
  const color = (value: number) => {
    if (value === 0) {
      return "#EFF1F4";
    }
    if (value < 30) {
      return "#680010";
    } else if (value >= 30 && value <= 70) {
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
              sx={{
                width: "100%",
                margin: "0rem",
                padding: "0rem",
                color: color(survey[slider.surveyKey]),
                "& .MuiSlider-valueLabel": {
                  backgroundColor: color(survey[slider.surveyKey]),
                },
              }}
              valueLabelDisplay="auto"
              color="primary"
              onChange={(e, value) =>
                updateValue(slider.surveyKey, value as number)
              }
              value={survey[slider.surveyKey]}
            />

            <div className={"flex flex-row justify-between align-center"}>
              <p className={"paragraph"}>{slider.min}</p>
              <p className={"paragraph"}>{slider.max}</p>
            </div>

            <br></br>
          </div>
        </div>
      ))}
      <div className="flex flex-center">
        <Button name={"Submit"} onClick={handleSubmit} />
      </div>
    </div>
  );
}
