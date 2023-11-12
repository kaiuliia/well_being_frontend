import React, { useState } from "react";

import "./App.css";
import { Register } from "./components/registerform";
import { Login } from "./components/loginform";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
      <Link to="/">Main</Link>
      <Link to="/register">Reg</Link>
      <Link to="/login"> Log</Link>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route
          path="/register"
          element={<Register title="hrhr" visible={registerVisible} />}
        />
        <Route
          path="/login"
          element={<Login title="hrhr" visible={loginVisible} />}
        />
      </Routes>
    </div>
  );
}

export default App;
