"use client";

import { create } from "zustand";

interface QuizzFilters {
  dateFrom: string;
  dateTo: string;
  course: string;
  instructor: string;
  status: string;
  page: number;
}

interface QuizzStore {
  filters: QuizzFilters;
  setFilters: (filters: Partial<QuizzFilters>) => void;
  resetFilters: () => void;
}

const initialFilters: QuizzFilters = {
  dateFrom: "",
  dateTo: "",
  course: "",
  instructor: "",
  status: "",
  page: 1,
};

export const useQuizzStore = create<QuizzStore>((set) => ({
  filters: initialFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));
