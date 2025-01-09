import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "../components/layout/button";
import { useNavigate } from "react-router-dom";

export function Entry() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("name")) {
      navigate("user/home");
    }
  }, []);
  return (
    <div
      className={
        "w-[20rem] h-[100%] flex flex-col relative gap-5 justify-center"
      }
    >
      <img className={"w-[15rem] h-[15rem] self-center"} src={logo} alt={""} />
      <div className={"text-white self-center"}>Your mental health tracker</div>
      <Button
        onClick={() => {
          navigate("/login");
        }}
        name={"Login"}
        className={"!my-0"}
        color={"bg-main-button"}
      />
      <Button
        onClick={() => {
          navigate("/register");
        }}
        name={"Register"}
        className={"!my-0"}
        color={"bg-custom-dark-green"}
      />
    </div>
  );
}
