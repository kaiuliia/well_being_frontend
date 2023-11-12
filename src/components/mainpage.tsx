import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface Props {}

interface User {
  email: string;
  password: string;
}
export function MainPage(props: Props) {
  const [loginVisible, setLoginVisible] = useState(true);
  const [registerVisible, setRegisterVisible] = useState(false);

  const handleLoginClick = () => {
    // setLoginVisible(true);
    // setRegisterVisible(true);
    window.location.href = "/login";
  };

  const handleRegisterClick = () => {
    // setLoginVisible(true);
    // setRegisterVisible(true);
    window.location.href = "/register";
  };
  return (
    <div>
      <p>Main Page</p>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
    </div>
  );
}

// export default Login;
