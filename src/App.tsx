import React, { useState } from "react";

import "./App.css";
import { Register } from "./components/registerform";
import { Login } from "./components/loginform";
import { Route, Routes, NavLink } from "react-router-dom";
import { MainPage } from "./components/mainpage";

function App() {
  return (
    <div className="App">
      <NavLink to="/">Main</NavLink>
      <NavLink to="/register">Reg</NavLink>
      <NavLink to="/login"> Log</NavLink>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register title="hrhr" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
