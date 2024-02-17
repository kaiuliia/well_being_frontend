import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
export function HeaderDashboard() {
  return (
    <div className="flex justify-between">
      <FontAwesomeIcon icon={faCalendarDays} color="#BBC1CE" />
      <FontAwesomeIcon icon={faChevronLeft} color="#A5BB5A" />
      RANGE SETTINGS
      <FontAwesomeIcon icon={faChevronRight} color="#A5BB5A" />
      <FontAwesomeIcon icon={faSliders} color="#BBC1CE" />
    </div>
  );
}
