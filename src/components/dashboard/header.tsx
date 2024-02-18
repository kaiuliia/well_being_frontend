import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Moment } from "moment";

interface HeaderDashboardProps {
  startDate: string;
  endDate: string;
}

export function HeaderDashboard({ startDate, endDate }: HeaderDashboardProps) {
  // const startDate = new Date();
  return (
    <>
      <div className="flex justify-between">
        <FontAwesomeIcon icon={faCalendarDays} color="#BBC1CE" />
        <FontAwesomeIcon icon={faChevronLeft} color="#A5BB5A" />
        {`${startDate}- ${endDate}`}

        <FontAwesomeIcon icon={faChevronRight} color="#A5BB5A" />
        <FontAwesomeIcon icon={faSliders} color="#BBC1CE" />
      </div>
    </>
  );
}
