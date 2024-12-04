import React, { useState } from "react";

import { Button } from "../layout/button";
import { useLocalStore } from "../../store/useStore";
import { Slider } from "@mui/material";

import { sliderName } from "./types";
import { useNavigate } from "react-router-dom";
interface Survey {
  general_mood: number;
  activities: number;
  sleep: number;
  calmness: number;
  yourself_time: number;
}

export function Survey() {
  const { postSurveyData, fetchAndUpdateDashboard, getTodayAdvice } =
    useLocalStore();

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
    await postSurveyData(survey);
    await fetchAndUpdateDashboard();
    await getTodayAdvice();

    navigate("/user/home");
  };
  const color = (value: number) => {
    if (value === 0) {
      return "#222a3d";
    }
    if (value < 30) {
      return "#7a002e";
    } else if (value >= 30 && value <= 70) {
      return "#d27600";
    } else {
      return "#08423c";
    }
  };

  return (
    <div className="fixed z-10  flex flex-column inset-0  items-center  justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-700 lg:w-1/3 w-[85%] h-[90%] bg-opacity-80 p-3 rounded-lg">
        <div className="text-white h-[100%] py-5">
          <div className={"text-white text-xl"}> How are you today?</div>

          {sliderName.map((slider, index) => (
            <div
              key={index}
              className="w-100% px-[0.8rem] h-[4.5rem]  mt-[0.5rem] py-[0.5rem] rounded-lg  bg-gradient-to-r from-teal-600  to-cyan-800 bg-opacity-90 align-start"
            >
              <div className={"relative z-100 "}>
                <Slider
                  size="small"
                  className={"absolute top-[0.625rem]"}
                  sx={{
                    width: "100%",
                    color: color(survey[slider.surveyKey]),
                    "& .MuiSlider-valueLabel": {
                      height: 20,
                      width: 30,
                      zIndex: 1000,
                      border: "20px",
                      backgroundColor: color(survey[slider.surveyKey]),
                    },
                  }}
                  valueLabelDisplay="auto"
                  onChange={(e, value) =>
                    updateValue(slider.surveyKey, value as number)
                  }
                  value={survey[slider.surveyKey]}
                />
                <p
                  className={
                    "text-[0.85rem] z-0 font-medium text-white absolute top-0 left-1/2 transform -translate-x-1/2"
                  }
                >
                  {slider.name}
                </p>
                <p
                  className={
                    "text-white text-[0.625rem] absolute top-[2.5rem] left-0"
                  }
                >
                  {slider.min.toLowerCase()}
                </p>
                <p
                  className={
                    "text-white text-[0.625rem] absolute top-[2.5rem] right-0"
                  }
                >
                  {slider.max.toLowerCase()}
                </p>
              </div>
            </div>
          ))}
          <div className={"pt-5"}>
            <Button
              onClick={handleSubmit}
              name={"ADD TODAY"}
              color={"bg-main-button"}
              className={"text-white cursor-pointer "}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
