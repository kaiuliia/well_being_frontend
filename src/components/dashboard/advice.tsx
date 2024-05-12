import React, { useState } from "react";

// interface MoodData {
//   weekDay: string;
//   dateRange: string;
//   mood: number | number[];
//   activities: number | number[];
//   sleep: number | number[];
//   calmness: number | number[];
//   yourself_time: number | number[];
// }

interface RecProps {
  name: string;
  icon: string;
  description: string;
}

// interface RecState {
//   [day: string | number]: RecData;
// }

export function Advice() {
  // const recProps: RecProps[] = [
  //   {
  //     name: "Meditation 1",
  //     icon: "icon",
  //     description: "mood"
  //   }
  // ];

  const [recomendations, setRecomendations] = useState({
    name: "Meditation 1",
    icon: "icon",
    description: "mood",
  });

  return <div>Here is your recomendations</div>;
}
