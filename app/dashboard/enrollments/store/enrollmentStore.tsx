"use client";

import { create } from "zustand";

interface EnrollmentFilter {
    dateFrom: string;
    dateTo: string;
    page: number;
    limit: number;
}

interface EnrollmentStore {
    filters: EnrollmentFilter;
    setFilters: (filters: Partial<EnrollmentFilter>) => void;
    resetFilters: () => void;
}

const initialFilters: EnrollmentFilter = {
    dateFrom: "",
    dateTo: "",
    page: 1,
    limit: 10,
};

export const useEnrollmentStore = create<EnrollmentStore>((set) => ({
    filters: initialFilters,
    setFilters: (newFilters) =>
        set((state) => ({
            filters: { ...state.filters, ...newFilters },
        })),
    resetFilters: () => set({ filters: initialFilters }),
}));
