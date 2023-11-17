import React, { useState } from "react";
import { ChangeEvent } from "../types";
import { Slider } from "@mui/material";
import { Box } from "@mui/material";
interface Props {
  surway: string;
  onChange: (value: number | number[]) => void;
}
export const SliderBar = (props: Props) => {
  const [sliderValue, setSliderValue] = useState<number | number[]>(0);

  // const handleChange = (event: ChangeEvent) => {
  //   const value = parseInt(event.target.value, 10);
  //   setSliderValue(value);
  //   props.onChange(value);
  //   // You can also call any additional function here with the updated value
  // };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number[]);
    props.onChange(sliderValue);
  };

  // const handleChange = (event: Event, newValue: number) => {
  //   setSliderValue(newValue);
  // };
  return (
    // <div>
    //   <div className="slider-container">
    //     <div className="slider-left">
    //
    //     </div>
    //     <div className="slider-right">
    //       <p className="passwordLength">{sliderValue}</p>
    //     </div>
    <Box>
      <p>{props.surway}</p>
      <Slider
        value={sliderValue}
        valueLabelDisplay="auto"
        onChange={handleChange}
      />
    </Box>
  );

  // </div>

  {
    /*<div className="slider-bar">*/
  }
  {
    /*  <input*/
  }
  {
    /*    type="range"*/
  }
  {
    /*    min="0"*/
  }
  {
    /*    max="10"*/
  }
  {
    /*    value={sliderValue}*/
  }
  {
    /*    className="slider"*/
  }
  {
    /*    id="myRange"*/
  }
  {
    /*    onChange={changeSlider}*/
  }
  {
    /*  />*/
  }
  {
    /*</div>*/
  }
  // </div>
};
