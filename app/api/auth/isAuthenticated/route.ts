import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export const GET = async () => {
  const payload = {
    isAuthenticated: false,
  };

  const token = cookies().get("token")?.value;
  if (token) {
    try {
      verify(token, process.env.JWT_SECRET as string) as { id: string };
      payload.isAuthenticated = true;
    } catch (err) {
      // do nothing
    }
  }

  return Response.json(payload);
};
