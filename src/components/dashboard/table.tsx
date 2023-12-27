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

interface MoodData {
  dateRange: string;
  general_mood: number | number[];
  activities: number | number[];
  sleep: number | number[];
  calmness: number | number[];
  yourself_time: number | number[];
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

  const [moods, setMoods] = useState<MoodState>({
    good: { dateRange: "", sleep: "", calmness: "", appetite: "" },
    bad: { dateRange: "", sleep: "", calmness: "", appetite: "" },
    // ... add other moods
  });

  const handleMoodChange = (
    mood: string,
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
        {Object.keys(moods).map((mood) => (
          <TableRow key={mood}>
            <TableCell>{mood}</TableCell>
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
