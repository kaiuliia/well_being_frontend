import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

interface Props {}

interface User {
  email: string;
  password: string;
}
export function MainPage(props: Props) {
  return (
    <nav>
      <NavLink to="/main" className="nav-link">
        Main
      </NavLink>
      <NavLink to="/register" className="nav-link">
        register
      </NavLink>
      <NavLink to="/register" className="nav-link">
        login
      </NavLink>
    </nav>
  );
}

// export default Login;
