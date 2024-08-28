import React, { useState } from "react";

import "./App.css";
import { Register } from "./pages/registerform";
import { Login } from "./pages/loginform";
import { Route, Routes, NavLink } from "react-router-dom";

import { Survey } from "./components/survey";
import { Home } from "./pages/home";
import { Advices } from "./components/advices";

function App() {
  return (
    <div className={"container"}>
      <Routes>
        <Route path="/register" element={<Register title="register" />} />
        <Route path="/" element={<Login />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/advises" element={<Advices />} />
        <Route path="/user/survey" element={<Survey />} />
      </Routes>
    </div>
  );
}

export default App;
