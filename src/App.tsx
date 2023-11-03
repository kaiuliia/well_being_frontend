import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Register } from "./components/registerform";
import { Login } from "./components/loginform";

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
      <Login title="hrhr" visible={loginVisible} />
      <Register title="hrhr" visible={registerVisible} />
    </div>
  );
}

export default App;
