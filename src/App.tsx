import React, { useState } from "react";

import "./App.css";
import { Register } from "./pages/registerform";
import { Login } from "./pages/loginform";
import { Route, Routes, NavLink } from "react-router-dom";

import { Survey } from "./components/survey";
import { Dashboard } from "./pages/dashboard";
import { Advices } from "./components/advices";

function App() {
  return (
    <div className={"container"}>
      <Routes>
        <Route path="/register" element={<Register title="register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/login/user/advises" element={<Advices />} />
        <Route path="/login/user/survey" element={<Survey />} />
      </Routes>
    </div>
  );
}

export default App;
