"use client";

import { useAuthStore } from "../store/useAuthStore";
import { forgetUser, resetUser } from "@/api/auth";

export const useForgetActions = () => {
  const { setLoading, isLoading } = useAuthStore();

  const forget = async (email: string) => {
    setLoading(true);
    try {
      await forgetUser(email);
      return { success: true };
    } catch (err: any) {
      const apiResponse = err.response || { message: "Failed to reset password", errors: [] };
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
  const reset = async (password: string, token: string) => {
    setLoading(true);
    try {
      await resetUser(password, token);
      return { success: true };
    } catch (err: any) {
      const apiResponse = err.response || { message: "Failed to reset password", errors: [] };
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

  return { forget, reset, loading: isLoading };
};
