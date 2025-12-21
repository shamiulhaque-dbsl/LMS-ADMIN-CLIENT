"use client";

import { useAuthStore } from "../store/useAuthStore";
import { useRouter } from "next/navigation";
import { loginUser, logoutUser } from "@/api/auth";
import { ROUTES } from "@/constants/routes";

export const useLoginActions = () => {
  const { setUser, setLoading, isLoading, clearAuth } = useAuthStore();
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await loginUser(email, password);
      setUser(res.data.user || null);
      router.push(ROUTES.DASHBOARD);
      return { success: true };
    } catch (err: any) {
      const apiResponse = err.response?.data || err.response || { message: "Login failed" };
      return {
        success: false,
        response: {
          message: apiResponse.message,
          errors: apiResponse.errors,
        },
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      router.push(ROUTES.AUTH.LOGIN);
    } catch (err: any) {
      console.error("Logout failed", err);
    } finally {
      setLoading(false);
      clearAuth();
    }
  };

  return { login, loading: isLoading, logout };
};
