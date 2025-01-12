import React from "react";

import { AdviceButton } from "./adviceButton";
import { useLocalStore } from "../../store/useStore";

export function Advice() {
  const { advicesArray } = useLocalStore();
  console.log(advicesArray[0].title);
  return (
    <>
      <div className={"flex flex-row py-7 gap-5"}>
        {advicesArray.map((element, index) => (
          <AdviceButton
            key={index}
            title={element.title}
            description={element.advices}
          />
        ))}
      </div>
    </>
  );
}
