import { StateCreator } from "zustand";

export interface NavigationSlice {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const createNavigationSlice: StateCreator<NavigationSlice> = (set) => ({
  activePage: "Profile",
  setActivePage: (page: string) => set({ activePage: page }),
});
