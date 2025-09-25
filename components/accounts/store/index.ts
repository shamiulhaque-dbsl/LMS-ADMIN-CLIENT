"use cleint";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { NavigationSlice, createNavigationSlice } from "./slices/navigationSlice";

export type StoreState = NavigationSlice;

export const useStore = create<StoreState>()(
  devtools((...a) => ({
    ...createNavigationSlice(...a),
  }))
);

// Selectors for better performance
// export const useActivePage = () => useStore((state) => state.activePage);
// export const useSetActivePage = () => useStore((state) => state.setActivePage);

// export const useNavigation = () =>
//   useStore((state) => ({
//     activePage: state.activePage,
//     setActivePage: state.setActivePage,
//   }));
