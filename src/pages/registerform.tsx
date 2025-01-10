import React, { useEffect, useState } from "react";
import { Button } from "../components/layout/button";
import { Input } from "../components/layout/input_field";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../env";

interface User {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setStatusMessage] = useState("");

  const [, setSubmitted] = useState(false);
  const [, setError] = useState(false);

  const navigate = useNavigate();
  const sendData = async (user: User) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    const message = await response.json();

    if (response.status > 299) {
      setStatusMessage("error");
    } else if (response.status === 401) {
      localStorage.removeItem("name");
      navigate("/login");
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
  useEffect(() => {
    if (localStorage.getItem("name")) {
      navigate("../user/home");
    }
  }, []);
  return (
    <div className={"flex flex-col pt-10 px-2 gap-5 lg:w-1/3  w-full"}>
      <div className={"text-white text-[2rem]"}>Register</div>
      <div className={"text-white"}>
        Already have an account?{" "}
        <a
          className={"text-main-orange font-medium underline"}
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </a>{" "}
      </div>
      <form
        onSubmit={handleSubmit}
        className={"flex items-start flex-col gap-5"}
      >
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
        <Button
          name={"Register"}
          className={"!my-0"}
          color={"bg-main-orange"}
        />
      </form>
    </div>
  );
}
