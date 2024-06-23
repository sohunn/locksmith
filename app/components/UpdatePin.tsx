"use client";

import React, { useContext, useEffect, useState } from "react";
import { updateSecurityPin } from "../utils/actions";
import SubmitState from "./SubmitState";
import { useFormState } from "react-dom";
import { GlobalContext } from "../contexts/global";

const UpdatePin = ({
  userID,
  securityPin,
}: {
  userID: string;
  securityPin: number;
}) => {
  const [pin, setpin] = useState(securityPin);
  const [status, formAction] = useFormState(updateSecurityPin, null);

  const context = useContext(GlobalContext);

  useEffect(() => {
    if (status) {
      context?.setAlert({ type: "success", msg: status.msg });
    }
  }, [status, context]);

  return (
    <form action={formAction}>
      <input
        type="number"
        min={1000}
        max={9999}
        name="securityPin"
        value={pin}
        onChange={(e) => setpin(Number(e.target.value))}
        className="input input-bordered w-full max-w-xs text-white mb-2"
      />

      <input type="text" name="userID" value={userID} hidden readOnly />

      <div>
        <SubmitState action="Update" ongoingAction="Updating..." />
      </div>
    </form>
  );
};

export default UpdatePin;
