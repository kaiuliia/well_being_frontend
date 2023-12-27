import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Survey } from "../survey";

interface MoodData {
  dateRange: string;
  general_mood: number | number[];
  activities: number | number[];
  sleep: number | number[];
  calmness: number | number[];
  yourself_time: number | number[];
}

interface MoodProps {
  name: string;
  min: string;
  max: string;
}

interface MoodState {
  [day: string]: MoodData;
}

export function DashboardTable() {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const moodProps: MoodProps[] = [
    {
      name: "General mood",
      min: "Bad",
      max: "Very good",
    },
    {
      name: "Activities",
      min: "Not active",
      max: "Very active",
    },
    {
      name: "Sleep",
      min: "Feel shattered",
      max: "Well-rested",
    },
    {
      name: "Calmness",
      min: "Feel anxious",
      max: "Feel calm",
    },
    {
      name: "Time for me",
      min: "None",
      max: "A lot",
    },
  ];

  const [moods, setMoods] = useState<MoodState>({
    monday: {
      dateRange: "",
      general_mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    tuesday: {
      dateRange: "",
      general_mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    wednesday: {
      dateRange: "",
      general_mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    thursday: {
      dateRange: "",
      general_mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    friday: {
      dateRange: "",
      general_mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    saturday: {
      dateRange: "",
      general_mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    sunday: {
      dateRange: "",
      general_mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
  });

  const handleMoodChange = (
    mood: string,
    color: string,
    day: keyof MoodData,
    value: string,
  ) => {
    setMoods((prevMoods) => ({
      ...prevMoods,
      [mood]: {
        ...prevMoods[mood],
        [day]: value,
      },
    }));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {daysOfWeek.map((day) => (
            <TableCell key={day}>{day}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {moodProps.map((mood) => (
          <TableRow key={mood.name}>
            <TableCell>{mood.name}</TableCell>
            {daysOfWeek.map((day) => (
              <TableCell key={day}>
                <Box>" gjk"</Box>
                {/*<Select*/}
                {/*  value={"h"}*/}
                {/*  onChange={(e) =>*/}
                {/*    handleMoodChange(*/}
                {/*      mood,*/}
                {/*      day as keyof MoodData,*/}
                {/*      e.target.value,*/}
                {/*    )*/}
                {/*  }*/}
                {/*>*/}
                {/*  <MenuItem value="">Select</MenuItem>*/}
                {/*  <MenuItem value="good">Good</MenuItem>*/}
                {/*  <MenuItem value="bad">Bad</MenuItem>*/}
                {/*</Select>*/}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// export default MoodTable;
