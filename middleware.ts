import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/features/auth/lib/verifyAccessToken";
import { ROUTES } from "@/lib/constants/routes";

const TOKEN_NAME = {
  ACCESS: "accessToken",
  REFRESH: "refreshToken",
} as const;

/*
  TODO (Auth Hardening Roadmap):

  1. Token Refresh Flow
     - If accessToken is expired but refreshToken exists:
       → Redirect to /api/auth/refresh
       → Issue new accessToken
       → Redirect back to original route

  2. Role-Based Access Control (RBAC)
     - Enforce coarse-grained role checks at middleware level
       Example:
       - /dashboard/admin/*  → ADMIN only
       - /dashboard/instructor/* → INSTRUCTOR, ADMIN
     - Keep fine-grained permissions in server components / APIs

  3. Security Enhancements
     - Delete refreshToken on hard logout or invalid auth state
     - Ensure cookie flags (httpOnly, secure, sameSite) are aligned

  4. Edge Runtime Safety
     - Keep verifyAccessToken Edge-compatible (no Node APIs, no DB calls)
*/

export async function middleware(req: NextRequest) {
  const token = req.cookies.get(TOKEN_NAME.ACCESS)?.value;
  const pathname = req.nextUrl.pathname;

  const payload = await verifyAccessToken(token);

  // Not logged in → protect dashboard routes (for admin or instructor)
  if (!payload && pathname.startsWith(ROUTES.DASHBOARD)) {
    const res = NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, req.url));
    res.cookies.delete(TOKEN_NAME.ACCESS);
    return res;
  }

  // Already logged in → block /login
  if (payload && pathname === ROUTES.AUTH.LOGIN) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/login"],
};
