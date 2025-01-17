"use client";

import React, { useContext } from "react";
import { AlgorithmsType, Password } from "../types";
import { deletePassword } from "../utils/actions";
import Link from "next/link";
import { GlobalContext } from "../contexts/global";

export const Passwords = ({
  passwords,
  userID,
  securityPin,
}: {
  passwords: Password[];
  userID: string;
  securityPin?: number;
}) => {
  const context = useContext(GlobalContext);
  const copyPassword = async (
    encrypted: string,
    key: string,
    algo: AlgorithmsType
  ) => {
    if (securityPin) {
      const userPin = prompt(
        "For added security, enter your security pin to copy this password."
      );

      if (!userPin) return;
      if (Number(userPin) !== securityPin)
        return alert("You entered a wrong security pin. Try again");
    }

    const response = await fetch("/api/getPassword", {
      method: "POST",
      body: JSON.stringify({
        value: encrypted,
        key,
        algo,
      }),
    });

    const data = await response.json();
    navigator.clipboard.writeText(data.password);
    context?.setAlert({
      type: "success",
      msg: "Password decrypted & copied to clipboard",
    });
  };

  return (
    <div className="flex flex-wrap gap-4">
      {passwords?.map((pwd) => {
        return (
          <div
            key={pwd.value}
            className="card w-96 bg-secondary text-primary-content "
          >
            <div className="card-body">
              <h2 className="card-title">{pwd.for}</h2>
              <p>Secured using {pwd.algo}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => copyPassword(pwd.value, pwd.key!, pwd.algo)}
                  className="btn btn-info"
                >
                  Copy
                </button>
                <form action={deletePassword}>
                  <input
                    type="text"
                    hidden
                    name="userID"
                    value={userID}
                    readOnly
                  />
                  <input
                    type="text"
                    hidden
                    name="value"
                    value={pwd.value}
                    readOnly
                  />
                  <button type="submit" className="btn btn-error">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      })}
      <Link className="btn btn-primary self-center" href={"/save"}>
        Add new
      </Link>
    </div>
  );
};
