import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Survey } from "../survey";

interface MoodData {
  dateRange: string;
  mood: number | number[];
  activities: number | number[];
  sleep: number | number[];
  calmness: number | number[];
  yourself_time: number | number[];
}

interface MoodProps {
  name: string;
  key: keyof MoodData;
}

interface MoodState {
  [day: string]: MoodData;
}

export function DashboardTable() {
  const daysOfWeek = ["M", "T", "W", "THU", "F", "S", "SU"];

  const moodProps: MoodProps[] = [
    {
      name: "Mood",
      key: "mood",
    },
    {
      name: "Activities",
      key: "activities",
    },
    {
      name: "Sleep",
      key: "sleep",
    },
    {
      name: "Calmness",
      key: "calmness",
    },
    {
      name: "Time for me",
      key: "yourself_time",
    },
  ];

  // const color = moodProps.map((color) => color.color);
  const [moods, setMoods] = useState<MoodState>({
    M: {
      dateRange: "",
      mood: 5,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    T: {
      dateRange: "",
      mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    W: {
      dateRange: "",
      mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    TH: {
      dateRange: "",
      mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    F: {
      dateRange: "",
      mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    S: {
      dateRange: "",
      mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    SU: {
      dateRange: "",
      mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
  });
  const getColorFromNumber = (number: number | number[] | string) => {
    if (number < 30) {
      return "yellow";
    }
    if (number >= 30) {
      return "purple";
    }
  };
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
  console.log(getColorFromNumber(moods[M]));
  return (
    <Box>
      <Table
        sx={{
          width: "auto",
          padding: "0",
          tableLayout: "fixed",
          "& .MuiTableCell-root": {
            padding: "0.15rem",
            borderBottom: "none",
            textAlign: "center",
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {daysOfWeek.map((day) => (
              <TableCell
                key={day}
                sx={{
                  padding: "0",
                }}
              >
                {day}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {moodProps.map((mood) => (
            <TableRow key={mood.name} sx={{ padding: "0" }}>
              <TableCell sx={{ padding: "0" }}>{mood.name}</TableCell>
              {daysOfWeek.map((day) => (
                <TableCell sx={{ padding: "0" }} key={day}>
                  <Box
                    sx={{
                      width: "1rem",
                      height: "1rem",
                      padding: "0",
                      backgroundColor: getColorFromNumber(moods[day][mood.key]),

                      // getColorFromNumber(moods[day][moodProps.key]),
                    }}
                  ></Box>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

// export default MoodTable;
{
  /*<Select*/
}
{
  /*  value={"h"}*/
}
{
  /*  onChange={(e) =>*/
}
{
  /*    handleMoodChange(*/
}
{
  /*      mood,*/
}
{
  /*      day as keyof MoodData,*/
}
{
  /*      e.target.value,*/
}
{
  /*    )*/
}
{
  /*  }*/
}
{
  /*>*/
}
{
  /*  <MenuItem value="">Select</MenuItem>*/
}
{
  /*  <MenuItem value="good">Good</MenuItem>*/
}
{
  /*  <MenuItem value="bad">Bad</MenuItem>*/
}
{
  /*</Select>*/
}
