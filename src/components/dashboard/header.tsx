import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

export function HeaderDashboard() {
  const element = <FontAwesomeIcon icon={faEnvelope} />;
  return (
    <div className="flex justify-between">
      {element}
      ICON RANGE SETTINGS
    </div>
  );
}
