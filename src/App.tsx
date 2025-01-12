import React from "react";

import "./App.css";
import { Register } from "./pages/registerform";
import { Login } from "./pages/loginform";
import { Route, Routes } from "react-router-dom";

import { Survey } from "./components/dashboard/survey";
import { Home } from "./pages/home";
import { Entry } from "./pages/entry";

function App() {
  return (
    <div className={"flex justify-center p-5 h-screen"}>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/survey" element={<Survey />} />
      </Routes>
    </div>
  );
}

export default App;
