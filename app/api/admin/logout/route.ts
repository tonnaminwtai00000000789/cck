import { NextResponse } from "next/server";

const clearCookie = [
  "admin_session=",
  "Path=/admin",
  "HttpOnly",
  "SameSite=Lax",
  "Max-Age=0",
].join("; ");

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", clearCookie);
  return res;
}
