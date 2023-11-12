import React, { useState } from "react";

import "./App.css";
import { Register } from "./components/registerform";
import { Login } from "./components/loginform";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  NavLink,
} from "react-router-dom";
import { MainPage } from "./components/mainpage";

function App() {
  const [loginVisible, setLoginVisible] = useState(true);
  const [registerVisible, setRegisterVisible] = useState(false);

  // const handleLoginClick = () => {
  //   setLoginVisible(true);
  //   setRegisterVisible(false);
  // };
  //
  // const handleRegisterClick = () => {
  //   setLoginVisible(false);
  //   setRegisterVisible(true);
  // };

  return (
    <div className="App">
      {/*<button onClick={handleLoginClick}>Login</button>*/}
      {/*<button onClick={handleRegisterClick}>Register</button>*/}
      {/*<Router>*/}
      <NavLink to="/">Main</NavLink>
      <NavLink to="/register">Reg</NavLink>
      <NavLink to="/login"> Log</NavLink>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register title="hrhr" />} />
        <Route path="/login" element={<Login title="hrhr" />} />
      </Routes>
    </div>
  );
}

export default App;
