"use client";

import React from "react";
import { savePassword } from "./actions";
import { Algorithms } from "../types";
import SubmitState from "../components/SubmitState";

const SaveForm = () => {
  return (
    <form className="max-w-[840px]" action={savePassword}>
      <h1 className="mb-2">General Information</h1>
      <p className="text-lg">Give a name to identify this password</p>
      <input
        type="text"
        required
        placeholder="Eg - Instagram account"
        className="input input-bordered w-full mb-2"
        name="name"
      />

      {/* validation error */}

      <p className="text-lg">Type in your password</p>
      <input
        type="password"
        required
        placeholder="Eg - Test@123"
        className="input input-bordered w-full mb-2"
        name="password"
      />

      {/* validation error */}

      <p className="text-lg">Choose an encryption algorithm</p>
      <select
        name="algorithm"
        className="select select-secondary w-full max-w-[840px] mb-4"
      >
        {Algorithms.map((algorithm) => (
          <option key={algorithm}>{algorithm}</option>
        ))}
      </select>

      <div className="flex justify-center md:justify-start">
        <SubmitState />
      </div>
    </form>
  );
};

export default SaveForm;
