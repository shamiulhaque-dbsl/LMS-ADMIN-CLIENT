import { create } from "zustand";

interface ModalStore {
  modals: Record<string, boolean>;
  payloads: Record<string, any>;
  openModal: (id: string, payload?: any) => void;
  closeModal: (id: string) => void;
  toggleModal: (id: string) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: {},
  payloads: {},
  openModal: (id, payload) =>
    set((state) => ({
      modals: { ...state.modals, [id]: true },
      payloads: { ...state.payloads, [id]: payload },
    })),
  closeModal: (id) =>
    set((state) => {
      const nextPayloads = { ...state.payloads };
      delete nextPayloads[id];
      return {
        modals: { ...state.modals, [id]: false },
        payloads: nextPayloads,
      };
    }),
  toggleModal: (id) =>
    set((state) => ({
      modals: { ...state.modals, [id]: !state.modals[id] },
    })),
}));
