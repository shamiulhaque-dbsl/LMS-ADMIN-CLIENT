"use client";

import { create } from "zustand";

interface User {
  id: number;
  fullName?: string;
  avatarUrl?: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isInitialized: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (value: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isInitialized: false,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading }),
  setInitialized: (value) => set({ isInitialized: value }),
  clearAuth: () => set({ user: null, isLoading: false }),
}));
