"use client";

import { useFormStatus } from "react-dom";
import React from "react";

const CustomSubmit = () => {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} className="btn btn-primary">
      {pending ? "Saving..." : "Save"}
    </button>
  );
};

export default CustomSubmit;
