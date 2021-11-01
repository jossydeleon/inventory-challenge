import React from "react";
import useAuthentication, { IAuthentication } from "../hooks/useAuthentication";

const authContext = React.createContext<IAuthentication | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const values = useAuthentication();

  return <authContext.Provider value={values}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within the AuthContext.Provider");
  }
  return context;
};
