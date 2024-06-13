"use client";
import React from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  return (
    <section className="min-h-svh flex justify-center items-center">
      <div className="container w-[90%] max-w-[1400px] mx-auto">
        <h1 className="text-2xl text-center md:text-start text-error mb-2">
          Whoops! This is awkward
        </h1>
        <p className="mb-2">Message: {error.message}</p>
        {error.digest && (
          <p className="mb-2">
            Provide this code to help debug the issue.{" "}
            <span className="bg-error text-error-content rounded-lg px-2">
              {error.digest}
            </span>
          </p>
        )}

        <p className="mb-2">
          You can optionally try again by clicking the button below
        </p>

        <div className="flex justify-center">
          <button className="btn btn-primary" onClick={() => reset()}>
            Try Again
          </button>
        </div>
      </div>
    </section>
  );
};

export default Error;
