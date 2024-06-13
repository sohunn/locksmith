"use server";

import { z } from "zod";
import verifyDBConnection from "../database/init";
import userModel from "../database/models/User";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function registerUser(
  _prevState: any,
  formData: FormData
) {
  const formFields = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const specialCharRegex = /[!@#$%^&*]/g;
  if (!specialCharRegex.test(formFields.password)) {
    return "Password must contain at least one special character from [! @ # $ % ^ & *]";
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
  if (!result.success) {
    return result.error.errors[0].message;
  }

  try {
    await verifyDBConnection();
    const existingUser = await userModel
      .findOne({ email: formFields.email })
      .lean()
      .exec();

    if (existingUser) {
      return "A user with that email already exists";
    }

    const hashedPassword = await bcrypt.hash(formFields.password, 10);
    const user = await userModel.create({
      email: formFields.email,
      password: hashedPassword,
      username: formFields.username,
    });

    const payload = {
      id: user._id,
    };

    const token = sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    cookies().set("token", token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    revalidatePath("/register");
    return "success";
  } catch (err) {
    throw err;
  }
}
