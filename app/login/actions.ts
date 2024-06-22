"use server";

import { z } from "zod";
import verifyDBConnection from "../database/init";
import userModel from "../database/models/User";
import { compare } from "bcrypt";
import { revalidatePath } from "next/cache";
import { getSession } from "../utils/actions";
import { redirect } from "next/navigation";

export default async function loginUser(
  _prevState: any,
  formData: FormData
): Promise<{
  email?: string[] | undefined;
  password?: string[] | undefined;
  msg?: string;
}> {
  const formFields = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const schema = z.object({
    email: z.string().email("Invalid email provided"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must be at most 32 characters long"),
  });

  const result = schema.safeParse(formFields);

  if (!result.success) return result.error.flatten().fieldErrors;

  try {
    await verifyDBConnection();
    const user = await userModel
      .findOne({ email: formFields.email })
      .lean()
      .exec();

    if (!user) {
      return {
        msg: "Invalid credentials",
      };
    }

    const match = await compare(formFields.password, user.password);
    if (!match) {
      return {
        msg: "Invalid credentials",
      };
    }

    const session = await getSession();
    session.isLoggedIn = true;
    session.username = user.username;
    session.passwords = user.passwords;
    session.userID = user._id.toString();

    await session.save();
    revalidatePath("/");
    redirect("/");
  } catch (err) {
    throw err;
  }
}
