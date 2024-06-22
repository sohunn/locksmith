"use server";

import crypto from "crypto";
import { AlgorithmsType } from "../types";
import { encrypt3DES, encryptAES } from "../utils/encryptors";
import { getSession } from "../utils/actions";
import userModel from "../database/models/User";
import { RedirectType, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import verifyDBConnection from "../database/init";

export const savePassword = async (formData: FormData) => {
  const session = await getSession();
  if (!session.isLoggedIn) return redirect("/login", RedirectType.replace);
  await verifyDBConnection();

  const formFields = {
    name: formData.get("name") as string,
    password: formData.get("password") as string,
    algorithm: formData.get("algorithm") as AlgorithmsType,
  };

  switch (formFields.algorithm) {
    case "Advanced Encryption Standard": {
      // allow userInput for randomBytes for key
      const key = crypto.randomBytes(32).toString("hex");
      const encrypted = encryptAES(formFields.password, key);

      const passwordInfo = {
        algo: formFields.algorithm,
        for: formFields.name,
        value: encrypted,
        key,
      };

      session.passwords?.push(passwordInfo);
      await Promise.all([
        userModel.findByIdAndUpdate(
          session.userID,
          {
            $push: { passwords: passwordInfo },
          },
          { upsert: true }
        ),
        session.save(),
      ]);

      revalidatePath("/");
      redirect("/");
    }
    case "Triple DES": {
      // allow userInput for randomBytes for key
      const key = crypto.randomBytes(24).toString("hex");
      const encrypted = encrypt3DES(formFields.password, key);

      const passwordInfo = {
        algo: formFields.algorithm,
        for: formFields.name,
        value: encrypted,
        key,
      };

      session.passwords?.push(passwordInfo);
      await Promise.all([
        userModel.findByIdAndUpdate(
          session.userID,
          {
            $push: { passwords: passwordInfo },
          },
          { upsert: true }
        ),
        session.save(),
      ]);

      revalidatePath("/");
      redirect("/");
    }

    case "Blowfish": {
    }
  }
};
