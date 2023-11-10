import React, { useState } from "react";

import "./App.css";
import { Register } from "./components/registerform";
import { Login } from "./components/loginform";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
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

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login title="hrhr" visible={loginVisible} />} />
      <Route
        path="/register/*"
        element={<Register title="hrhr" visible={registerVisible} />}
      />
      <Route path="/main/*" element={<MainPage />} />
    </Routes>
  </BrowserRouter>;

  return (
    <div className="App">
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
      <Link to="main">main</Link>
      <Login title="hrhr" visible={loginVisible} />
      <Register title="hrhr" visible={registerVisible} />

      <MainPage />
    </div>
  );
}

export default App;
