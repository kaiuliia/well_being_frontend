import React, { useState, useEffect } from "react";

interface Props {}

interface User {
  email: string;
  password: string;
}
export function MainPage(props: Props) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [statusMessage, setStatusMessage] = useState("");
  //
  // // States for checking the errors
  // const [submitted, setSubmitted] = useState(false);
  // const [error, setError] = useState(false);
  //
  // const sendData = async (user: User) => {
  //   const response = await fetch("http://localhost:9090/login", {
  //     method: "POST",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify(user),
  //   });
  //   if (response.status > 299) {
  //     const error = await response.json();
  //     setStatusMessage(error.error);
  //   } else {
  //     const message = await response.json();
  //     setStatusMessage(message.name);
  //   }
  // };
  //
  // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };
  //
  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  // };
  //
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //
  //   if (email && password) {
  //     await sendData({ email: email, password: password });
  //     setEmail("");
  //     setPassword("");
  //   }
  //
  //   if (email === "" || password === "") {
  //     setError(true);
  //   } else {
  //     setSubmitted(true);
  //     setError(false);
  //   }
  // };

  return (
    <div>
      <h1>MAIN PAGE</h1>
      {/*<form*/}
      {/*  onSubmit={handleSubmit}*/}
      {/*  style={{ display: props.visible ? "block" : "none" }}*/}
      {/*>*/}
      {/*  <h3>E-mail:</h3>*/}
      {/*  <input onChange={handleEmailChange} value={email} type="email" />*/}
      {/*  <br></br>*/}
      {/*  <h3>Password:</h3>*/}
      {/*  <input*/}
      {/*    onChange={handlePasswordChange}*/}
      {/*    value={password}*/}
      {/*    type="password"*/}
      {/*  />*/}
      {/*  <br></br>*/}
      {/*  <button className="btn" type="submit">*/}
      {/*    Log in*/}
      {/*  </button>*/}
      {/*  <p>{statusMessage}</p>*/}
      {/*</form>*/}
    </div>
  );
}

// export default Login;
