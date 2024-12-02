import React, { HTMLInputTypeAttribute } from "react";

interface InputProps {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  id?: string;
  autoComplete?: string;
  className?: string;
  value?: string;
  placeholder?: string;
}
export const Input = (props: InputProps) => {
  return (
    <input
      className={
        "border-main-secondary-gray border-[1px] h-[3.5rem] pl-5 rounded-md w-full  bg-back-gray "
      }
      onChange={props.onChange}
      required={props.required}
      name={props.name}
      type={props.type}
      id={props.id}
      // label={props.label}
      autoComplete={props.autoComplete}
      value={props.value}
      placeholder={props.placeholder}
    ></input>
  );
};
