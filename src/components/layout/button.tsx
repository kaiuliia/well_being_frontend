import React, { FormEventHandler } from "react";
interface ButtonProps {
  onSubmit?: any;
  name?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      onSubmit={props.onSubmit}
      type="submit"
      className={
        "bg-main-light-green border-0 rounded-md  w-full mt-3 mb-2 h-[3rem]"
      }
    >
      {props.name}
    </button>
  );
};
