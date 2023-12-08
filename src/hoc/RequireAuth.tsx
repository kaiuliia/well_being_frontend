import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";

export const RequireAuth = ({ pages }) => {
  const location = useLocation();
  const auth = false;
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return pages;
};
