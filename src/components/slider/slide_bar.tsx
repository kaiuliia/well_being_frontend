import React, { useState } from "react";
import { ChangeEvent } from "../../types";
import { Slider, Grid } from "@mui/material";
import { Box, Card } from "@mui/material";
import Typography from "@mui/material/Typography";

interface Props {
  // colors: string;
  survey: string;
  onChange: (value: number | number[]) => void;
  max: string;
  min: string;
}
export const SliderBar = (props: Props) => {
  const [sliderValue, setSliderValue] = useState<number | number[]>(0);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
    props.onChange(sliderValue);
  };
  const color = () => {
    // setSliderValue(newValue as number[]);
    if (sliderValue === 0) {
      return "secondary.main";
    }
    if (sliderValue < 30) {
      return "error.main";
    } else if (sliderValue >= 30 && sliderValue <= 70) {
      return "warning.main";
    } else {
      return "info.main";
    }
  };

  return (
    <div className="w-100% h-auto flex flex-column p-[0.8rem] align-start bg-white">
      <p className={"paragraph"}>{props.survey}</p>

      <Slider
        sx={{
          width: "100%",
          margin: "0rem",
          padding: "0rem",
          color: color,
          "& .MuiSlider-valueLabel": {
            backgroundColor: color,
          },
        }}
        value={sliderValue}
        valueLabelDisplay="auto"
        color="primary"
        onChange={handleChange}
      />

      <div className={"flex flex-row justify-between align-center"}>
        <p className={"paragraph"}>{props.min}</p>
        <p className={"paragraph"}>{props.max}</p>
      </div>
    </div>
  );
};
