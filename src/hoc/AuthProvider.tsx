import React, { useState, createContext } from "react";

interface User {
  email: string;
  password: string;
}

interface Context {
  user?: User;
  signIn: (newUser: User) => void;
  signOut: () => void;
}

export const AuthContext = createContext<Context>({} as Context);
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();

  const signIn = (newUser: User) => {
    setUser(newUser);
  };
  const signOut = () => {
    setUser(undefined);
  };
  const value = { user, signIn, signOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
