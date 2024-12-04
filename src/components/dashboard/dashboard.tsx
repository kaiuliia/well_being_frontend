import React, { useEffect } from "react";
import { capitalizeFirstLetter } from "./types";
import DatePicker from "react-datepicker";
import { DashboardTable } from "./table";
import { Advice } from "./advice";
import { Button } from "../layout/button";
import { useLocalStore, ApiSurvey } from "../../store/useStore";
interface DashboardProps {
  wholeWeek: ApiSurvey[];
  weekDates: Date[];
  boardYear: number | number[];
  boardStartMonth: number;
  boardEndMonth?: number;
  handleDateChange: (date: Date) => void;
  selectedDate: Date;
  handleChangeRangeWeek: (weekDates: Date[], action: string) => void;
}
export function Dashboard({
  wholeWeek,
  weekDates,
  boardYear,
  boardStartMonth,
  boardEndMonth,
  selectedDate,
  handleDateChange,
  handleChangeRangeWeek,
}: DashboardProps) {
  const name = localStorage.getItem("name");
  const { advicesArray, getTodayAdvice } = useLocalStore();
  useEffect(() => {
    const fetchAdvice = async () => {
      await getTodayAdvice();
    };

    fetchAdvice();
  }, []);

  return (
    <>
      <div className="">
        <div className="">
          <div>
            <div className={"hidden"}>
              <DatePicker
                selected={selectedDate}
                calendarStartDay={1}
                onChange={handleDateChange} //only when value has changed
              />
            </div>
          </div>
        </div>

        <div className={"gap-2"}>
          <p className="text-3xl font-normal text-left text-white pt-[1rem]">
            {`Welcome, ${capitalizeFirstLetter(name)}!`}
          </p>
          {advicesArray?.length > 0 ? (
            <p className="text-md font-normal text-left text-white pt-[1.5rem]">
              Time for self care. See advices
            </p>
          ) : (
            <p className="text-md font-normal text-left text-white pt-[1rem]">
              How are you today?
            </p>
          )}
        </div>
        {advicesArray?.length > 0 && <Advice />}

        <br />
        <div className={"lg:flex lg:flex-col lg:gap-5"}>
          <div className={"before::bg-gray-700"}>
            <DashboardTable
              handleChangeRangeWeek={handleChangeRangeWeek}
              dashboardData={wholeWeek}
              weekDates={weekDates}
              boardYear={boardYear}
              boardStartMonth={boardStartMonth}
              boardEndMonth={
                boardStartMonth !== boardEndMonth ? boardEndMonth : undefined
              }
            ></DashboardTable>
          </div>

          <Button
            color={"bg-main-button"}
            name={advicesArray?.length > 0 ? "EDIT TODAY" : "ADD TODAY"}
            className={"text-white cursor-pointer"}
            onClick={() => {
              window.location.href = "/user/survey";
            }}
          />
        </div>
      </div>
    </>
  );
}
