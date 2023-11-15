import React, { useState } from "react";

interface Props {
  surway: string;
}
export const SliderBar = (props: Props) => {
  const [sliderValue, setSliderValue] = useState<number>(10);

  const changeSlider = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setSliderValue(value);
    // You can also call any additional function here with the updated value
  };

  return (
    <div>
      <div className="slider-container">
        <div className="slider-left">
          <p>{props.surway}</p>
        </div>
        <div className="slider-right">
          <p className="passwordLength">{sliderValue}</p>
        </div>
      </div>
      <div className="slider-bar">
        <input
          type="range"
          min="0"
          max="10"
          value={sliderValue}
          className="slider"
          id="myRange"
          onChange={changeSlider}
        />
      </div>
    </div>
  );
};
