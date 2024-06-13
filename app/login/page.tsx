"use client";

import React, { useContext, useEffect } from "react";
import { useFormState } from "react-dom";
import loginUser from "./actions";
import { GlobalContext } from "../contexts/global";
import { useRouter } from "next/navigation";

const Login = () => {
  const [statusMsg, formAction] = useFormState(loginUser, null);
  const context = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (statusMsg) {
      if (statusMsg !== "success") {
        context?.setAlert({ msg: statusMsg, type: "error" });
        return;
      }
      context?.setAuthenticated(true);
      router.push("/");
    }
  }, [statusMsg, context, router]);

  return (
    <section
      className="flex justify-center items-center bg-center bg-no-repeat bg-cover bg-scroll min-h-svh"
      style={{ backgroundImage: 'url("/auth.jpg")' }}
    >
      <div className="container w-[90%] max-w-[1400px] mx-auto">
        <h1 className="text-2xl text-center md:text-start mb-4 ">
          Welcome back to locksmith
        </h1>

        <form action={formAction} className="mb-4 max-w-[840px]">
          <label className="input input-bordered input-primary flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              required
              name="email"
              className="grow"
              placeholder="Email"
            />
          </label>

          <label className="input input-bordered input-primary flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              required
              name="password"
              className="grow"
              placeholder="Password"
            />
          </label>

          <div className="flex justify-center md:justify-start">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
