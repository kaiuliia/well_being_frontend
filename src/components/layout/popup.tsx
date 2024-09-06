import React from "react";
import { Button } from "./button";

interface PopupProps {
  description: string;
  title: string;

  close: () => void;
  // onClose: onClose;
}
export const Popup = ({ description, title, close }: PopupProps) => {
  return (
    <div
      // id="overlay"
      className="fixed z-10 flex flex-column inset-0  items-center  justify-center bg-black bg-opacity-50 backdrop-blur-md"
    >
      <div className="bg-gray-700 w-[85%] h-[90%] bg-opacity-80 p-3 rounded-lg">
        <div className={"text-white font-medium py-2 text-lg"}>{title}</div>
        <div className="text-white h-[80%] py-5 overflow-y-scroll text-sm">
          {description}
          {description}
        </div>
        <Button
          onClick={close}
          name={"GOT IT"}
          className={"text-white cursor-pointer"}
        />
      </div>
    </div>
  );
};
