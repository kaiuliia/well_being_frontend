import React from "react";

import "./App.css";
import { Register } from "./pages/registerform";
import { Login } from "./pages/loginform";
import { Route, Routes } from "react-router-dom";

import { Survey } from "./components/dashboard/survey";
import { Home } from "./pages/home";

function App() {
  return (
    <div className={"container h-screen"}>
      <Routes>
        <Route path="/register" element={<Register title="register" />} />
        <Route path="/" element={<Login />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/survey" element={<Survey />} />
      </Routes>
    </div>
  );
}

export default App;
