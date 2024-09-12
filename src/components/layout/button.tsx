import React, { FormEventHandler } from "react";
interface ButtonProps {
  onSubmit?: any;
  name?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: string;
  color?: string;
}
export const Button = ({
  onSubmit,
  name,
  className,
  onClick,
  variant,
  color,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      onSubmit={onSubmit}
      type="submit"
      className={`className ${color} border-0 rounded-md text-white  w-full  h-[3rem]`}
    >
      {name}
    </button>
  );
};
