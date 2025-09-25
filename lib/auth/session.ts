import "server-only";

import { authConfig } from "@/config/auth.config";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
  verifyRefreshToken,
  refreshToken,
} from "./JWT";
import { setCookie, getCookie } from "./cookie";

interface SessionPayload {
  id: string | number;
  name: string;
  email: string;
  user_type?: string;
  iat?: number;
  exp?: number;
  jti?: string;
  [key: string]: unknown;
}
export async function createSession(payload: SessionPayload) {
  try {
    if (!payload) {
      throw new Error("Missing payload");
    }

    if (!authConfig.jwt.secret || !authConfig.jwt.refreshSecret) {
      throw new Error("JWT secrets must be defined in environment variables");
    }

    const token = await createAccessToken(payload);
    const refreshToken = await createRefreshToken(payload);
    if (!token || !refreshToken) {
      throw new Error(
        "Failed to create session: Token or refresh token missing"
      );
    }

    const isVerifiedToken = await verifyToken(token);
    const isVerifiedRefreshToken = await verifyRefreshToken(refreshToken);
    if (!isVerifiedToken || !isVerifiedRefreshToken) {
      throw new Error(
        "Failed to create session: Token or refresh token verification failed"
      );
    }

    setCookie(authConfig.jwt.cookieName, token, authConfig.session);
    setCookie(authConfig.jwt.refreshCookieName, refreshToken, {
      ...authConfig.session,
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return true;
  } catch (error) {
    console.error("Failed to create session:", error);
    return false;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  try {
    const accessToken = getCookie(authConfig.jwt.cookieName);
    if (!accessToken) return null;

    const payload = await verifyToken(accessToken);
    if (!payload) {
      console.log(
        "Token is expired or invalid. Attempting to refresh the session..."
      );

      const refreshedPayload = await refreshToken();
      if (!refreshedPayload) {
        console.log("Session refresh failed. Please log in again.");
        return null;
      }

      // If the session is refreshed, return the new payload
      return refreshedPayload;
    }

    return payload;
  } catch (error) {
    console.error("Session retrieval error:", error);
    return null;
  }
}
