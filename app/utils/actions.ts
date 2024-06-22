"use server";

import { getIronSession } from "iron-session";
import { SessionDetails } from "../types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { sessionOptions } from ".";
import userModel from "../database/models/User";
import { redirect } from "next/navigation";
import verifyDBConnection from "../database/init";

export const getSession = async () => {
  const session = await getIronSession<SessionDetails>(
    cookies(),
    sessionOptions
  );

  return session;
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  revalidatePath("/");
};

export const deletePassword = async (formData: FormData) => {
  const formFields = {
    userID: formData.get("userID") as string,
    value: formData.get("value") as string,
  };

  const session = await getSession();
  if (!session.isLoggedIn) return redirect("/");

  session.passwords = session.passwords?.filter(
    (pwd) => pwd.value !== formFields.value
  );

  await verifyDBConnection();
  await Promise.all([
    userModel.findByIdAndUpdate(
      formFields.userID,
      {
        $pull: { passwords: { value: formFields.value } },
      },
      { upsert: true }
    ),
    session.save(),
  ]);

  revalidatePath("/");
};
