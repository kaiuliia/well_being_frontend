import React, { FormEventHandler } from "react";
import TextField from "@mui/material/TextField";
interface InputProps {
  onChange?: any;

  required?: boolean;

  name?: string;
  label?: string;
  type?: string;
  id?: string;
  autoComplete?: string;
  className?: string;
  value?: string;
}
export const Input = (props: InputProps) => {
  return (
    <input
      onChange={props.onChange}
      className={props.className}
      required={props.required}
      name={props.name}
      type={props.type}
      id={props.id}
      // label={props.label}
      autoComplete={props.autoComplete}
      value={props.name}
    ></input>
  );
};
