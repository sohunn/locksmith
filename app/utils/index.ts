import { SessionOptions } from "iron-session";

export const sessionOptions: SessionOptions = {
  cookieName: "ls.sid",
  password: process.env.COOKIE_SECRET as string,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
  ttl: 7 * 24 * 60 * 60, // 1 week
};
