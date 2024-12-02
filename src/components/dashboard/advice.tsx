import React from "react";

import { AdviceButton } from "./adviceButton";
import { useLocalStore } from "../../store/useStore";

export function Advice() {
  const { advicesArray } = useLocalStore();

  return (
    <>
      <div className={"flex flex-row py-7 gap-5"}>
        {advicesArray.map((element, index) => (
          <AdviceButton key={index} moodType={element} />
        ))}
      </div>
    </>
  );
}
