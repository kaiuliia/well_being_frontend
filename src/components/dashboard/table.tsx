import React from "react";
import ReactDOM from "react-dom";
import Calendar from "react-github-contribution-calendar";
import { Theme } from "@mui/material/styles";

interface Props {}

export function Table(props: Props) {
  const values = {
    "2016-06-23": 1,
    "2016-06-26": 2,
    "2016-06-27": 3,
    "2016-06-28": 4,
    "2016-06-29": 4,
  };
  const until = "2016-06-30";

  return (
    <Calendar
      values={values}
      until={until}
      weekNames={["none"]}
      monthNames={["none"]}
      panelColors={["none"]}
      dateFormat={"none"}
      weekLabelAttributes={"none"}
      monthLabelAttributes={"none"}
      panelAttributes={"none"}
    />
  );
}
