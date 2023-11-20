import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Survey } from "./survey";

interface Props {}

interface User {
  email: string;
  password: string;
}
export function Dashboard(props: Props) {
  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleRegisterClick = () => {
    window.location.href = "/register";
  };
  return (
    <div>
      <p>Main Page</p>
      <Survey />
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
    </div>
  );
}

// export default Login;
