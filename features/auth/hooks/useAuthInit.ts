"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { getCurrentUser } from "@/api/auth";

export const useAuthInit = () => {
  const { setUser, isInitialized, setInitialized } = useAuthStore();

  useEffect(() => {
    if (isInitialized) return;
    const initAuth = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res?.data ?? null);
      } catch {
        setUser(null);
      } finally {
        setInitialized(true);
      }
    };

    initAuth();
  }, [isInitialized, setUser, setInitialized]);
};
