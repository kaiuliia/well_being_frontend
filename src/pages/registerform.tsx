import React, { useState } from "react";
import { Button } from "../components/layout/button";
import { Input } from "../components/layout/input_field";

interface Props {
  title: string;
  // theme: Theme;
}

interface User {
  name: string;
  email: string;
  password: string;
}

export function Register(props: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const sendData = async (user: User) => {
    const response = await fetch("http://localhost:9090/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    const message = await response.json();

    if (response.status > 299) {
      setStatusMessage("error");
    } else {
      setStatusMessage("Welcome!");
      localStorage.setItem("name", message.name);
      window.location.href = "/user/home";
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name && email && password) {
      await sendData({ name: name, email: email, password: password });
      setName(""); // Clear the input field
      setEmail("");
      setPassword("");
    }

    if (name === "" || email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
    setName("");
  };

  return (
    <div>
      <p>{statusMessage}</p>

      <p className={"title"}> Sign up</p>

      <form onSubmit={handleSubmit}>
        <Input
          autoComplete="given-name"
          required
          id="firstName"
          label="First Name"
          name={"name"}
          onChange={handleNameChange}
          value={name}
          placeholder={"name"}
        />

        <Input
          required
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={handleEmailChange}
          value={email}
          placeholder={"email"}
        />

        <Input
          required
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          onChange={handlePasswordChange}
          value={password}
          placeholder={"password"}
        />

        <Button name={"Sign up"} color={"bg-scale-dark"} />
      </form>
      <p
        className={"link cursor-pointer"}
        onClick={() => {
          window.location.href = "/login";
        }}
      >
        {" "}
        Already have an account? Sign in
      </p>
    </div>
  );
}
