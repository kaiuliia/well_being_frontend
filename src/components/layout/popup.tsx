import React from "react";
import { Button } from "./button";

interface PopupProps {
  description: { [key: string]: string }[];
  title: string;

  close: () => void;
  // onClose: onClose;
}
export const Popup = ({ description, title, close }: PopupProps) => {
  return (
    <div className="fixed z-10 flex flex-col inset-0 items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
      <div className="bg-gray-700 w-[85%] h-[90%] bg-opacity-80 px-4 py-10  rounded-lg">
        <div className={"text-white font-medium py-2 text-lg"}>{title}</div>
        <div className="text-white h-auto py-5 overflow-y-scroll text-sm">
          <div>
            {description.map((obj, index) => {
              const [key, value] = Object.entries(obj)[0];
              return (
                <div key={index} style={{ marginBottom: "10px" }}>
                  <div style={{ fontWeight: "bold" }}>{key}:</div>
                  <div>{value}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={" lg:w-[15rem]"}>
          <Button
            onClick={close}
            color="bg-main-button"
            name={"GOT IT"}
            className={"text-white cursor-pointer"}
          />
        </div>
      </div>
    </div>
  );
};
