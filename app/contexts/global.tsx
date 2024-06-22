"use client";

import React, { useState } from "react";
import { createContext } from "react";
import { AlertStruct } from "../types";

type ContextProps = {
  alert: AlertStruct | null;
  setAlert: (alert: AlertStruct) => void;
};

export const GlobalContext = createContext<ContextProps | null>(null);

export const GlobalProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [alert, _setAlert] = useState<AlertStruct | null>(null);
  const setAlert = (alert: AlertStruct) => {
    _setAlert(alert);
    setTimeout(() => {
      _setAlert(null);
    }, 3000);
  };

  return (
    <GlobalContext.Provider
      value={{
        alert,
        setAlert,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
