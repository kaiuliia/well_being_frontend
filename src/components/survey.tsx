import React, { useState } from "react";

import { Button } from "./layout/button";
import { useLocalStore } from "../store/useStore";
import { Slider } from "@mui/material";

import { sliderName } from "./types";
import { useNavigate } from "react-router-dom";
interface Props {}
interface Survey {
  general_mood: number;
  activities: number;
  sleep: number;
  calmness: number;
  yourself_time: number;
}

export function Survey(props: Props) {
  const { postSurveyData, fetchAndUpdateDashboard } = useLocalStore();

  const [survey, setSurvey] = useState<Survey>({
    general_mood: 0,
    activities: 0,
    sleep: 0,
    calmness: 0,
    yourself_time: 0,
  });

  const navigate = useNavigate();

  const updateValue = (name: keyof Survey, value: number) => {
    setSurvey({
      ...survey,
      [name]: value,
    });
  };

  const handleSubmit = async (): Promise<void> => {
    // e.preventDefault();
    console.log(3.9);
    await postSurveyData(survey);
    console.log(3);

    await fetchAndUpdateDashboard();
    navigate("/user/home");
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
        <Button onClick={handleSubmit} />
      </div>
    </div>
  );
}
