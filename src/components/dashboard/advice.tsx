import React, { useState, useRef } from "react";

import { AdviceButton } from "./adviceButton";
import { useLocalStore } from "../../store/useStore";

export function Advice() {
  const { dashboard } = useLocalStore();
  const lastDashBoardData = [...dashboard]
    .reverse()
    .find((element) => element.id !== "");

  const filteredData = {
    general_mood: lastDashBoardData?.general_mood,
    activities: lastDashBoardData?.activities,
    sleep: lastDashBoardData?.sleep,
    calmness: lastDashBoardData?.calmness,
    yourself_time: lastDashBoardData?.yourself_time,
  };

  const map = new Map(Object.entries(filteredData));
  const entriesArray = Array.from(map.entries());

  // Find keys where values are less than 50
  const keysWithValuesLessThan50 = entriesArray
    .filter(([key, value]) => Number(value) < 50) // Filter entries where value < 50
    .map(([key]) => key); // Extract keys

  return (
    <>
      <div className={"flex flex-row py-7 gap-5"}>
        {keysWithValuesLessThan50.map((element) => (
          <AdviceButton moodType={element} />
        ))}
      </div>
    </>
  );
}
