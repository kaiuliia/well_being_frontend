import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hoc/useAuth";
import { Button } from "../components/layout/button";
import { Input } from "../components/layout/input_field";

interface Props {}

interface User {
  email: string;
  password: string;
}
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const signin = useAuth();
  const fromPage = location.state?.from?.pathname || "/";
  const sendData = async (user: User) => {
    const response = await fetch("http://localhost:9090/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    if (response.status > 299) {
      const error = await response.json();
      setStatusMessage(error.error);
    } else {
      const message = await response.json();
      setStatusMessage(message.name);
      localStorage.setItem("name", message.name);
      window.location.href = "/user/dashboard";
    }
  };

  const checkboxRef = useRef(null);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleCheck = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await sendData({ email, password });

      // Clear email and password fields after form submission
      setEmail("");
      setPassword("");
    } catch (error) {
      // Handle error if sendData fails
      console.error("Error:", error);
      // Optionally, set an error state or show an error message to the user
    }
  };

  console.log(errorMessage);
  return (
    <>
      <p className={"title"}> Sign in</p>
      <form onSubmit={handleSubmit}>
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
        <div>
          <input
            type="checkbox"
            id="checkbox"
            defaultChecked={false}
            onClick={handleCheck}
          />
          <p className={"paragraph"}> Remember me</p>
        </div>
        {errorMessage && <p className={"paragraph"}> ERROR!!!!</p>}
        <Button name={"Sign in"} />
      </form>
      <div>
        <p className={"link"}>Forgot password?</p>
        <p className={"link"}> Don't have an account? Sign Up</p>
      </div>
    </>
  );
}
