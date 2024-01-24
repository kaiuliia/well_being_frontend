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
  weekDay: string;
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
  [day: string | number]: MoodData;
}

export function DashboardTable() {
  const daysOfWeek = [1, 2, 3, 4, 5, 6, 7];

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
  const [check, setCheck] = useState({
    1: { hey: "hey" },
    2: { buy: "buy" },
  });
  // const color = moodProps.map((color) => color.color);
  const [moods, setMoods] = useState<MoodState>({
    1: {
      weekDay: "M",
      dateRange: "",
      mood: 5,
      activities: 0,
      sleep: 14,
      calmness: 0,
      yourself_time: 0,
    },
    2: {
      weekDay: "T",
      dateRange: "",
      mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    3: {
      weekDay: "W",
      dateRange: "",
      mood: 0,
      activities: 90,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },

    4: {
      weekDay: "T",
      dateRange: "",
      mood: 0,
      activities: 0,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    5: {
      weekDay: "F",
      dateRange: "",
      mood: 0,
      activities: 65,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
    6: {
      weekDay: "S",
      dateRange: "",
      mood: 0,
      activities: 0,
      sleep: 90,
      calmness: 0,
      yourself_time: 0,
    },
    7: {
      weekDay: "S",
      dateRange: "",
      mood: 0,
      activities: 80,
      sleep: 0,
      calmness: 0,
      yourself_time: 0,
    },
  });
  const getColorFromNumber = (number: number | number[] | string) => {
    if (number === 0) {
      return "#FFFFFF";
    }
    if (number < 30) {
      return "bg-custom-red";
    } else if (number >= 30 && number <= 70) {
      return "bg-custom-orange";
    } else {
      return "bg-custom-green";
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

  console.log(getColorFromNumber(moods["1"].sleep));

  return (
    <div>
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
                {moods[day].weekDay}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {moodProps.map((moodType) => (
            <TableRow key={moodType.name} sx={{ padding: "0" }}>
              <TableCell sx={{ padding: "0" }}>{moodType.name}</TableCell>
              {daysOfWeek.map((day) => (
                <TableCell sx={{ padding: "0" }} key={day}>
                  <div
                    className={" rounded-md shadow-lg p-0 w-4 h-4 bg-amber-400"}
                    // sx={{
                    //   width: "1rem",
                    //   height: "1rem",
                    //   borderRadius: "8px",
                    //   padding: "0",
                    //   backgroundColor: getColorFromNumber(
                    //     moods[day][moodType.key],
                    //   ),
                    // }}
                  ></div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
