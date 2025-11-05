"use client";

import { create } from "zustand";

interface AssignmentFilter {
  dateFrom: string;
  dateTo: string;
  course: string;
  status: string;
  page: number;
}

interface AssignmentStore {
  filters: AssignmentFilter;
  setFilters: (filters: Partial<AssignmentFilter>) => void;
  resetFilters: () => void;
}

const initialFilters: AssignmentFilter = {
  dateFrom: "",
  dateTo: "",
  course: "",
  status: "",
  page: 1,
};

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  filters: initialFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: initialFilters }),
}));
