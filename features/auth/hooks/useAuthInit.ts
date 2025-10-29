"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { getCurrentUser } from "@/api/auth";

export const useAuthInit = () => {
  const { user, setUser, isInitialized, setInitialized } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res?.data?.user || null);
      } catch {
        setUser(null);
      } finally {
        setInitialized(true);
      }
    };

    if (!user && !isInitialized) {
      fetchUser();
    }
  }, [user, isInitialized, setUser, setInitialized]);
};
