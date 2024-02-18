import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Moment } from "moment";
import moment from "moment/moment";

interface HeaderDashboardProps {
  startDate: string;
  endDate: string;
}

export function HeaderDashboard({ startDate, endDate }: HeaderDashboardProps) {
  const plusWeek = () => {
    const plusWeekValue = moment().add(7, "days");
    startDate = moment(plusWeekValue).startOf("week").utc().format("D MMM");
  };
  // const startDate = new Date();
  return (
    <div className="flex justify-between">
      <FontAwesomeIcon icon={faCalendarDays} color="#BBC1CE" />
      <div>
        <FontAwesomeIcon
          icon={faChevronLeft}
          color="#A5BB5A"
          className="pr-2"
          onClick={plusWeek}
        />
        {`${startDate}- ${endDate}`}
        <FontAwesomeIcon
          icon={faChevronRight}
          color="#A5BB5A"
          className="pl-2"
          // onClick={minusWeek}
        />
      </div>
      <FontAwesomeIcon icon={faSliders} color="#BBC1CE" />
    </div>
  );
}
