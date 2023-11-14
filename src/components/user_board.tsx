import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

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
      <div className="slider-container">
        <div className="slider-left">
          <p>Character length</p>
        </div>
        <div className="slider-right">
          <p className="passwordLength">10</p>
        </div>
      </div>
      <div className="slider-bar">
        <input
          type="range"
          min="10"
          max="50"
          // value
          className="slider"
          id="myRange"
          // onChange={changeSlider}
        />
      </div>
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
