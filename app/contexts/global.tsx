"use client";

import React, { useState } from "react";
import { createContext } from "react";
import { AlertStruct, User } from "../types";

type ContextProps = {
  user: User | null;
  alert: AlertStruct | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAlert: (alert: AlertStruct) => void;
};

export const GlobalContext = createContext<ContextProps | null>(null);

export const GlobalProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<User | null>(null);
  const [alert, _setAlert] = useState<AlertStruct | null>(null);

  const setAlert = (alert: AlertStruct) => {
    _setAlert(alert);
    setTimeout(() => {
      _setAlert(null);
    }, 3000);
  };

  return (
    <GlobalContext.Provider value={{ user, setUser, alert, setAlert }}>
      {children}
    </GlobalContext.Provider>
  );
};
