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
  sleep: number;
  appetite: number;
  anxiety: number;
  yourself_time: number;
  screen_time: number;
}
export function UserBoard(props: Props) {
  //
  // const value = useSelector((state) => state.passw.length);
  // const dispatch = useDispatch();
  // const changeSlider = (event) => {
  //     dispatch(sliderChange(event.target.value));
  // };
  const name = localStorage.getItem("name");

  return (
    <div>
      <p>Hello, {name}</p>
      <SliderBar surway={"general mood"} />

      <SliderBar surway={"appetite"} />
      <SliderBar surway={"sleep"} />

      <SliderBar surway={"anxiety"} />
      <SliderBar surway={"Time just for you"} />
      <SliderBar surway={"Screen time"} />
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
