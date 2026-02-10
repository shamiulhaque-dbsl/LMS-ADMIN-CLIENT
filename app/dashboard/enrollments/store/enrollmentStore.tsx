import { create } from 'zustand';

interface EnrollmentFilters {
    dateFrom: string;
    dateTo: string;
    page: number;
    limit: number;
}

interface EnrollmentStore {
    filters: EnrollmentFilters;
    setFilters: (updates: Partial<EnrollmentFilters>) => void;
    resetFilters: () => void;
}

const defaultFilters: EnrollmentFilters = {
    dateFrom: '',
    dateTo: '',
    page: 1,
    limit: 10,
};

export const useEnrollmentStore = create<EnrollmentStore>((set) => ({
    filters: defaultFilters,
    setFilters: (updates) =>
        set((state) => ({
            filters: { ...state.filters, ...updates },
        })),
    resetFilters: () =>
        set({
            filters: defaultFilters,
        }),
}));