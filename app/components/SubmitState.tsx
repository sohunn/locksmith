"use client";

import React from "react";
import { useFormStatus } from "react-dom";

const SubmitState = ({
  action,
  ongoingAction,
}: {
  action?: string;
  ongoingAction?: string;
}) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="btn btn-primary">
      {pending ? ongoingAction || "Saving..." : action || "Save"}
    </button>
  );
};

export default SubmitState;
