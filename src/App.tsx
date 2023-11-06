import React, { useState } from "react";

import "./App.css";
import { Register } from "./components/registerform";
import { Login } from "./components/loginform";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainPage } from "./components/mainpage";

function App() {
  const [loginVisible, setLoginVisible] = useState(true);
  const [registerVisible, setRegisterVisible] = useState(false);

  const handleLoginClick = () => {
    setLoginVisible(true);
    setRegisterVisible(false);
  };

  const handleRegisterClick = () => {
    setLoginVisible(false);
    setRegisterVisible(true);
  };

  return (
    <div className="App">
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
      <Router>
        <Login title="hrhr" visible={loginVisible} />
        <Register title="hrhr" visible={registerVisible} />

        <MainPage />
      </Router>
    </div>
  );
}

export default App;
