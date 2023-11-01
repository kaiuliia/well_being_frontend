import React, { useState, useEffect } from "react";

interface Props {
  title: string;
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
  const [users, setUsers] = useState<User[]>([
    { name: "anna", email: "anna@gmail.com", password: "fgehd7832-dsjb" },
    { name: "alex", email: "alex-dd@gmail.com", password: "fgce-wsg" },
  ]);

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  console.log(users);

  // HandleChange method to update the states

  const sendData = async (user: User) => {
    const data = await fetch("http://localhost:9090/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(user),
    });
    const result = await data.json();
    console.log(result.userId);
    // result.status(201).send("Ready!");
    // setSubmitted(result.message);
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

  useEffect(() => {
    const api = async () => {
      const data = await fetch("http://localhost:9090/api", {
        method: "GET",
      });
      const jsonData = await data.json();
      setSubmitted(jsonData.message);
    };

    api();
  }, []);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string): void => {
  //     switch (field) {
  //         case 'name':
  //             setName(e.target.value);
  //             break;
  //         case 'email':
  //             setEmail(e.target.value);
  //             break;
  //         case 'password':
  //             setPassword(e.target.value);
  //             break;
  //         // Add more cases for other fields if needed
  //         default:
  //             break;
  //     }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name && email && password) {
      setUsers([...users, { name: name, email: email, password: password }]);
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
      <form onSubmit={handleSubmit}>
        <h3>Name:</h3>
        <input name={"name"} onChange={handleNameChange} value={name} />
        <br></br>
        <h3>E-mail:</h3>
        <input onChange={handleEmailChange} value={email} />
        <br></br>
        <h3>Create a password:</h3>
        <input onChange={handlePasswordChange} value={password} />
        <br></br>
        <button className="btn" type="submit">
          Submit
        </button>
        <p>{submitted}</p>
      </form>
    </div>
  );
}

// export default Register;
