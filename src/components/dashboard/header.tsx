import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Moment } from "moment";
import moment from "moment/moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
interface HeaderDashboardProps {
  startDate?: Date;
  endDate?: Date;
}

export function HeaderDashboard({ startDate, endDate }: HeaderDashboardProps) {
  const handleDateChange = () => {};

  const handleDateSelect = () => {};
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
          selected={startDate}
          onSelect={handleDateSelect} //when day is clicked
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
