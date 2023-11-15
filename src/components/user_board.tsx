import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SliderBar } from "./slide_bar";

interface Props {}

interface User {
  email: string;
  password: string;
}

interface Surway {
  general_mood: number;
  appetite: number;
  sleep: number;
  anxiety: number;
  yourself_time: number;
  screen_time: number;
}
export function UserBoard(props: Props) {
  const [sliderValue, setSliderValue] = useState<number>();
  const [surway, setSurway] = useState({
    general_mood: 0,
    appetite: 0,
    sleep: 0,
    anxiety: 0,
    yourself_time: 0,
    screen_time: 0,
  });
  const name = localStorage.getItem("name");
  const handleSliderChange = (value: number, sliderName: string) => {
    setSurway((prevSurway) => ({
      ...prevSurway,
      [sliderName]: value,
    }));

    // console.log("Slider value changed:", value);
    setSliderValue(value);
  };
  console.log(sliderValue);
  console.log(surway);

  return (
    <div>
      <p>Hello, {name}</p>
      <SliderBar
        surway={"general mood"}
        onChange={(value) => handleSliderChange(value, "general_mood")}
      />
      <SliderBar
        surway={"appetite"}
        onChange={(value) => handleSliderChange(value, "appetite")}
      />
      <SliderBar
        surway={"sleep"}
        onChange={(value) => handleSliderChange(value, "sleep")}
      />
      <SliderBar
        surway={"anxiety"}
        onChange={(value) => handleSliderChange(value, "anxiety")}
      />
      <SliderBar
        surway={"Time just for you"}
        onChange={(value) => handleSliderChange(value, "yourself_time")}
      />
      <SliderBar
        surway={"Screen time"}
        onChange={(value) => handleSliderChange(value, "screen_time")}
      />
      <button>Submit</button>
    </div>
  );

  // const handleLoginClick = () => {
  //   window.location.href = "/login";
  // };
  //
  // const handleRegisterClick = () => {
  //   window.location.href = "/register";
  // };
  // return (
  //   <div>
  //     <p>Main Page</p>
  //
  //     <button onClick={handleLoginClick}>Login</button>
  //     <button onClick={handleRegisterClick}>Register</button>
  //   </div>
  // );
}

// export default Login;
