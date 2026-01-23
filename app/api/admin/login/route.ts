import { NextRequest, NextResponse } from "next/server";

const ADMIN_USER = process.env.ADMIN_USERNAME;
const ADMIN_PASS = process.env.ADMIN_PASSWORD;
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET;

export async function POST(request: NextRequest) {
  if (!ADMIN_USER || !ADMIN_PASS || !SESSION_SECRET) {
    return NextResponse.json(
      { error: "Server admin not configured" },
      { status: 500 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "กรุณากรอก username และ password" },
      { status: 400 }
    );
  }

  const { username, password } = body;
  if (!username || !password) {
    return NextResponse.json(
      { error: "กรุณากรอก username และ password" },
      { status: 400 }
    );
  }

  if (username !== ADMIN_USER || password !== ADMIN_PASS) {
    return NextResponse.json(
      { error: "username หรือ password ไม่ถูกต้อง" },
      { status: 401 }
    );
  }

  const isProd = process.env.NODE_ENV === "production";
  const cookie = [
    `admin_session=${SESSION_SECRET}`,
    "Path=/admin",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=86400", // 24 ชม.
    ...(isProd ? ["Secure"] : []),
  ].join("; ");

  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", cookie);
  return res;
}
