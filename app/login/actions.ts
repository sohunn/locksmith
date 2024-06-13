"use server";

import { z } from "zod";
import verifyDBConnection from "../database/init";
import userModel from "../database/models/User";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function loginUser(_prevState: any, formData: FormData) {
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

  if (!result.success) {
    return result.error.errors[0].message;
  }

  try {
    await verifyDBConnection();
    const user = await userModel
      .findOne({ email: formFields.email })
      .lean()
      .exec();

    if (!user) {
      return "Invalid credentials";
    }

    const match = await compare(formFields.password, user.password);
    if (!match) {
      return "Invalid credentials";
    }

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

    revalidatePath("/login");
    return "success";
  } catch (err) {
    throw err;
  }
}
