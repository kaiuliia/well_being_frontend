import React from "react";
import { addDays, endOfWeek, startOfWeek } from "date-fns/index";
import moment from "moment/moment";
import { Survey } from "./survey";

export type FormEvent = React.FormEvent<HTMLFormElement>;
export type MouseEvent = React.MouseEvent<HTMLButtonElement>;
export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface Survey {
  mood: number | number[];
  activities: number | number[];
  sleep: number | number[];
  calmness: number | number[];
  yourself_time: number | number[];
}
export interface SliderName {
  name: string;
  min: string;
  max: string;
  surveyKey: keyof Survey;
}
export const sliderName: SliderName[] = [
  {
    name: "Mood",
    min: "Bad",
    max: "Very good",
    surveyKey: "mood",
  },
  {
    name: "Activities",
    min: "Not active",
    max: "Very active",
    surveyKey: "activities",
  },
  {
    name: "Sleep",
    min: "Feel shattered",
    max: "Well-rested",
    surveyKey: "sleep",
  },
  {
    name: "Calmness",
    min: "Feel anxious",
    max: "Feel calm",
    surveyKey: "calmness",
  },
  {
    name: "Time for me",
    min: "None",
    max: "A lot",
    surveyKey: "yourself_time",
  },
];
