import React from "react";
import { useLocalStore } from "../../store/useStore";

export function Advice() {
  const { dashboard } = useLocalStore();
  console.log("dash", dashboard);

  return <div className={"text-white"}>Here is your recomendations</div>;
}
