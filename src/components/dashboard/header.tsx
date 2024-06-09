import React, { SetStateAction, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import { Moment } from "moment";
import moment from "moment/moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
interface HeaderDashboardProps {
  startDate?: Date;
  endDate?: Date;
}

export function HeaderDashboard({ startDate, endDate }: HeaderDashboardProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    console.log(selectedDate);
  };

  const [weekDates, setWeekDates] = useState([]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);

    const start = startOfWeek(date, { weekStartsOn: 1 }); // Week starts on Monday
    const end = endOfWeek(date, { weekStartsOn: 1 });

    const dates: any[] = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
      dates.push(day);
    }
    // @ts-ignore
    setWeekDates(dates);
    console.log("weedat", weekDates);
  };
  console.log(selectedDate);
  return (
    <div className="flex justify-between">
      <FontAwesomeIcon icon={faCalendarDays} color="#BBC1CE" size={"xl"} />
      <div>
        <FontAwesomeIcon
          icon={faChevronLeft}
          color="#A5BB5A"
          className="pr-2"
          size={"xl"}
        />
        <DatePicker
          selected={selectedDate}
          // onSelect={handleDateChange} //when day is clicked
          onChange={handleDateChange} //only when value has changed
        />
        <FontAwesomeIcon
          icon={faChevronRight}
          color="#A5BB5A"
          className="pl-2"
          size={"xl"}
          // onClick={minusWeek}
        />
      </div>
      <FontAwesomeIcon icon={faSliders} color="#BBC1CE" size={"xl"} />
    </div>
  );
}
