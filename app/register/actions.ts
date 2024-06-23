"use server";

import { z } from "zod";
import verifyDBConnection from "../database/init";
import userModel from "../database/models/User";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { getSession } from "../utils/actions";
import { redirect } from "next/navigation";

export default async function registerUser(
  _prevState: any,
  formData: FormData
): Promise<{
  username?: string[] | undefined;
  email?: string[] | undefined;
  password?: string[] | undefined;
  msg?: string;
}> {
  const formFields = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const specialCharRegex = /[!@#$%^&*]/g;
  if (!specialCharRegex.test(formFields.password)) {
    return {
      msg: "Password must contain at least one special character from [! @ # $ % ^ & *]",
    };
  }

  const schema = z.object({
    email: z.string().email("Invalid email provided"),
    username: z
      .string()
      .min(4, "Username must be at least 4 characters long")
      .max(16, "Username must be at most 16 characters long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(32, "Password must be at most 32 characters long"),
  });

  const result = schema.safeParse(formFields);
  if (!result.success) return result.error.flatten().fieldErrors;

  try {
    await verifyDBConnection();
    const existingUser = await userModel
      .findOne({ email: formFields.email })
      .lean()
      .exec();

    if (existingUser) {
      return {
        msg: "A user with that email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(formFields.password, 10);
    const user = await userModel.create({
      email: formFields.email,
      password: hashedPassword,
      username: formFields.username,
    });

    const session = await getSession();
    session.isLoggedIn = true;
    session.username = user.username;
    session.passwords = user.passwords;
    session.userID = user._id.toString();
    session.email = user.email;
    session.securityPin = user.securityPin;

    await session.save();
    revalidatePath("/");
    redirect("/");
  } catch (err) {
    throw err;
  }
}
