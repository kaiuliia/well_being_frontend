import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const RequireAuth = ({ pages }: any) => {
  const location = useLocation();
  const user = useAuth();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return pages;
};
