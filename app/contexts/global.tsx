"use client";

import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { AlertStruct } from "../types";

type ContextProps = {
  isAuthenticated: boolean;
  alert: AlertStruct | null;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setAlert: (alert: AlertStruct) => void;
};

export const GlobalContext = createContext<ContextProps | null>(null);

export const GlobalProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [alert, _setAlert] = useState<AlertStruct | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/isAuthenticated");
      if (response.ok) {
        const payload = (await response.json()) as { isAuthenticated: boolean };
        setAuthenticated(payload.isAuthenticated);
      }
    };

    checkAuth();
  }, []);

  const setAlert = (alert: AlertStruct) => {
    _setAlert(alert);
    setTimeout(() => {
      _setAlert(null);
    }, 3000);
  };

  return (
    <GlobalContext.Provider
      value={{ isAuthenticated, setAuthenticated, alert, setAlert }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
