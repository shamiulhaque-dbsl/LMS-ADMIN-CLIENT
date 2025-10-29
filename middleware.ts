import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/features/auth/lib/verifyAccessToken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const pathname = req.nextUrl.pathname;

  const payload = await verifyAccessToken(token);

  // Not logged in → protect admin routes
  if (!payload && pathname.startsWith("/admin")) {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("accessToken");
    return res;
  }

  // Already logged in → block /login
  if (payload && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
