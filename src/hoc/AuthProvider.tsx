import React, { useState, createContext } from "react";

interface User {
  email: string;
  password: string;
}
export const AuthContext = createContext(null);
export const AuthProvider = ({ pages }: any) => {
  const [user, setUser] = useState(null);
  const sighin = (newUser: User, callback: any) => {
    // @ts-ignore
    setUser(newUser);
    callback();
  };
  const sighout = (callback: any) => {
    setUser(null);
    callback();
  };
  const value = { user, sighin, sighout };
  // @ts-ignore
  return <AuthContext.Provider value={value}>{pages}</AuthContext.Provider>;
};
