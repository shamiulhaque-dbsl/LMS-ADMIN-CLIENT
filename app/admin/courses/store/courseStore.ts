"use client";

import { create } from "zustand";

interface CourseFilters {
  dateFrom: string;
  dateTo: string;
  category: string;
  instructor: string;
  status: string;
  page: number;
}

interface CourseStore {
  filters: CourseFilters;
  setFilters: (filters: Partial<CourseFilters>) => void;
  resetFilters: () => void;
}

const initialFilters: CourseFilters = {
  dateFrom: "",
  dateTo: "",
  category: "",
  instructor: "",
  status: "",
  page: 1,
};

export const useCourseStore = create<CourseStore>((set) => ({
  filters: initialFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));
