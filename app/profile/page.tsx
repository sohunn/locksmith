import React from "react";
import { getSession, saveSecurityPin } from "../utils/actions";
import SubmitState from "../components/SubmitState";
import UpdatePin from "../components/UpdatePin";

const Profile = async () => {
  const session = await getSession();

  return (
    <section className="py-4 bg-neutral text-neutral-content min-h-svh flex items-center justify-center">
      <div className="container w-[90%] max-w-[1400px] mx-auto">
        <h1 className="text-2xl text-center mb-2">Profile</h1>
        <p className="mb-2">
          You are logged in as <strong>{session.username}</strong>
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {session.email}
        </p>

        <p>
          <strong>Security Pin</strong>{" "}
        </p>

        {session.securityPin ? (
          <UpdatePin
            userID={session.userID!}
            securityPin={session.securityPin}
          />
        ) : (
          <form action={saveSecurityPin}>
            <input
              type="number"
              min={1000}
              max={9999}
              name="securityPin"
              placeholder="Enter your 4 digit security pin"
              className="input input-bordered w-full max-w-xs text-white mb-2"
            />

            <input
              type="text"
              name="userID"
              value={session.userID}
              hidden
              readOnly
            />

            <div>
              <SubmitState />
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default Profile;
