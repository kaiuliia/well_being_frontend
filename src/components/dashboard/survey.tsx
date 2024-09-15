import React, { useState } from "react";

import { Button } from "../layout/button";
import { useLocalStore } from "../../store/useStore";
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
  const {
    postSurveyData,
    fetchAndUpdateDashboard,
    getTodayAdvice,
    advicesArray,
  } = useLocalStore();

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
    console.log(1);
    await fetchAndUpdateDashboard();
    console.log(2);
    await getTodayAdvice();
    console.log(3);

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
    <div className="fixed z-10 flex flex-column inset-0  items-center  justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-700 w-[85%] h-[90%] bg-opacity-80 p-3 rounded-lg">
        <div className="text-white h-[100%] py-5">
          <div className={"text-white text-xl"}> How are you today?</div>

          {sliderName.map((slider) => (
            // <div className={"w-100% mx-auto h-[5rem] bg-white"}>
            <div className="w-100% px-[0.8rem] h-[4.5rem]  mt-[0.5rem] py-[0.5rem] rounded-lg  bg-gradient-to-r from-teal-600  to-cyan-800 bg-opacity-90 align-start">
              <div className={"relative "}>
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
                    "text-[0.85rem] z-50 font-medium text-white absolute top-0 left-1/2 transform -translate-x-1/2"
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
              {/*</div>*/}
            </div> //end card
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
    // <div className="w-100% py-[2rem] px-[1rem] mx-auto bg-back-gray">
    //   <p className={"title"}> How are you today?</p>
    //
    //   {sliderName.map((slider) => (
    //     <div className={"w-100% mx-auto"}>
    //       <div className="w-100% h-auto flex flex-column p-[0.8rem] align-start bg-white">
    //         <p className={"paragraph"}>{slider.surveyKey}</p>
    //
    //         <Slider
    //           sx={{
    //             width: "100%",
    //             margin: "0rem",
    //             padding: "0rem",
    //             color: color(survey[slider.surveyKey]),
    //             "& .MuiSlider-valueLabel": {
    //               backgroundColor: color(survey[slider.surveyKey]),
    //             },
    //           }}
    //           valueLabelDisplay="auto"
    //           color="primary"
    //           onChange={(e, value) =>
    //             updateValue(slider.surveyKey, value as number)
    //           }
    //           value={survey[slider.surveyKey]}
    //         />
    //
    //         <div className={"flex flex-row justify-between align-center"}>
    //           <p className={"paragraph"}>{slider.min}</p>
    //           <p className={"paragraph"}>{slider.max}</p>
    //         </div>
    //
    //         <br></br>
    //       </div>
    //     </div>
    //   ))}
    //   <div className="flex flex-center">
    //     <Button onClick={handleSubmit} />
    //   </div>
    // </div>
  );
}
