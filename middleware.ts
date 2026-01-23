import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SECRET = process.env.ADMIN_SESSION_SECRET;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // อนุญาต /admin/login โดยไม่ต้องมี session
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  if (!SECRET) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const token = request.cookies.get("admin_session")?.value;
  if (token !== SECRET) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
