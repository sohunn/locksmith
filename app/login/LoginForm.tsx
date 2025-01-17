"use client";

import { useFormState } from "react-dom";
import loginUser from "./actions";
import SubmitState from "../components/SubmitState";

const LoginForm = () => {
  const [statusMsg, formAction] = useFormState(loginUser, null);
  return (
    <section
      className="flex justify-center items-center bg-center bg-no-repeat bg-cover bg-scroll min-h-svh"
      style={{ backgroundImage: 'url("/auth.jpg")' }}
    >
      <div className="container w-[90%] max-w-[1400px] mx-auto">
        <h1 className="text-2xl text-center text-white md:text-start mb-4 ">
          Welcome back to locksmith
        </h1>

        <form action={formAction} className="max-w-[840px]">
          <label className="input input-bordered input-primary flex items-center gap-2 mb-2">
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

          {statusMsg?.email && (
            <p className="text-red-500 mb-2 text-sm">{statusMsg.email}</p>
          )}

          <label className="input input-bordered input-primary flex items-center gap-2 mb-2">
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

          {statusMsg?.password && (
            <p className="text-red-500 text-sm mb-2">{statusMsg.password}</p>
          )}

          <div className="flex justify-center md:justify-start">
            <SubmitState action="Login" ongoingAction="Logging in..." />
          </div>
        </form>

        {statusMsg?.msg && (
          <div className="flex justify-center mt-2">
            <p className="text-red-500 ">{statusMsg.msg}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LoginForm;
