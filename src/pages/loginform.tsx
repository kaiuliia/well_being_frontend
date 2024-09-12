import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/layout/button";
import { Input } from "../components/layout/input_field";

interface User {
  email: string;
  password: string;
  isChecked: boolean;
}
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();
  const sendData = async (user: User) => {
    const response = await fetch("http://localhost:9090/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.status > 299) {
      const error = await response.json();
      setErrorMessage(true);
      setPassword("");
      setStatusMessage(error.error);
    } else {
      const message = await response.json();
      setStatusMessage(message.name);
      localStorage.setItem("name", message.name);
      window.location.href = "/user/home";
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  // const handleCheck = () => {
  //   setIsChecked(!isChecked);
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendData({ email, password, isChecked });
      setPassword("");
    } catch (error) {
      setPassword("");
      console.error("Error:", error);
    }
  };

  return (
    <div className={" flex flex-col gap-5 px-2 py-5"}>
      <div className={"text-white text-[2rem]"}> Sign in</div>
      <div className={"text-main-orange"}>
        Don't have an account?{" "}
        <a
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </a>{" "}
      </div>
      <form
        onSubmit={handleSubmit}
        className={"flex items-start flex-col gap-5"}
      >
        <Input
          onChange={handleEmailChange}
          value={email}
          autoComplete="email"
          type="email"
          id="email"
          name="email"
          required={true}
          placeholder={"Email"}
        />
        <Input
          onChange={handlePasswordChange}
          value={password}
          autoComplete="current-password"
          type="password"
          id="password"
          name="password"
          required={true}
          placeholder={"Password"}
        />
        <div className={"flex flex-row gap-2 "}>
          {/*<input*/}
          {/*  type="checkbox"*/}
          {/*  id="checkbox"*/}
          {/*  defaultChecked={isChecked}*/}
          {/*  onClick={handleCheck}*/}
          {/*/>*/}
          {/*<p className={"text-white"}> Remember me</p>*/}
        </div>
        {errorMessage && (
          <p className={"text-main-orange"}> Password incorrect</p>
        )}

        <Button name={"Sign in"} className={"!my-0"} color={"bg-main-button"} />
      </form>
    </div>
  );
}
