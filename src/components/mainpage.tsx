import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface Props {}

interface User {
  email: string;
  password: string;
}
export function MainPage(props: Props) {
  const handleLoginClick = () => {
    window.location.href = "/login";
  };

  const handleRegisterClick = () => {
    window.location.href = "/register";
  };
  return (
    <div>
      {/*<p>Main Page</p>*/}
      Stay calm with WELLBE
      {/*<button onClick={handleLoginClick}>Login</button>*/}
      {/*<button onClick={handleRegisterClick}>Register</button>*/}
    </div>
  );
}
