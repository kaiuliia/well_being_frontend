import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { SliderBar } from "./slide_bar";
import { FormEvent, MouseEvent } from "../types";
import Button from "@mui/material/Button";

interface Props {}

interface User {
  email: string;
  password: string;
}

interface Surway {
  general_mood: number | number[];
  appetite: number | number[];
  sleep: number | number[];
  anxiety: number | number[];
  yourself_time: number | number[];
  screen_time: number | number[];
}
export function UserBoard(props: Props) {
  const [sliderValue, setSliderValue] = useState<number | number[]>();
  const [surway, setSurway] = useState({
    general_mood: 0,
    appetite: 0,
    sleep: 0,
    anxiety: 0,
    yourself_time: 0,
    screen_time: 0,
  });
  const [statusMessage, setStatusMessage] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const name = localStorage.getItem("name");

  const sendData = async (surway: Surway) => {
    const response = await fetch("http://localhost:9090/survey", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(surway),
    });
    if (response.status > 299) {
      const error = await response.json();
      setStatusMessage(error.error);
    } else {
      const message = await response.json();
      setStatusMessage(`Survey ${message} saved to database`);
    }
  };

  const handleSliderChange = (value: number, sliderName: string) => {
    setSurway((prevSurway) => ({
      ...prevSurway,
      [sliderName]: value,
    }));
    setSliderValue(value);
  };
  console.log(sliderValue);
  console.log(surway);

  const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault();

    await sendData({
      general_mood: surway.general_mood,
      appetite: surway.appetite,
      sleep: surway.sleep,
      anxiety: surway.anxiety,
      yourself_time: surway.yourself_time,
      screen_time: surway.screen_time,
    });

    setSubmitted(true);
    setError(false);
    console.log("SUBMITTED!!!!", surway);
  };

  return (
    <div>
      <p>Hello, {name}</p>
      <SliderBar
        surway={"general mood"}
        onChange={(value: number | number[]) =>
          handleSliderChange(value, "general_mood")
        }
      />
      <SliderBar
        surway={"appetite"}
        onChange={(value: number | number[]) =>
          handleSliderChange(value, "appetite")
        }
      />
      <SliderBar
        surway={"sleep"}
        onChange={(value: number | number[]) =>
          handleSliderChange(value, "sleep")
        }
      />
      <SliderBar
        surway={"anxiety"}
        onChange={(value: number | number[]) =>
          handleSliderChange(value, "anxiety")
        }
      />
      <SliderBar
        surway={"Time just for you"}
        onChange={(value: number | number[]) =>
          handleSliderChange(value, "yourself_time")
        }
      />
      <SliderBar
        surway={"Screen time"}
        onChange={(value: number | number[]) =>
          handleSliderChange(value, "screen_time")
        }
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
