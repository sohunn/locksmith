import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/utils/actions";

export async function middleware(request: NextRequest) {
  const session = await getSession();
  if (!session.isLoggedIn)
    return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/save", "/profile"],
};
