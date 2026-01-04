import { create } from "zustand";

interface ModalStore {
  modals: Record<string, boolean>;
  payloads: Record<string, any>;
  openModal: (id: string, payload?: any) => void;
  closeModal: (id: string) => void;
  toggleModal: (id: string) => void;
  isOpen: (modalId: string) => boolean;
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modals: {},
  payloads: {},
  openModal: (modalId, payload) => {
    set((state) => ({
      modals: { ...state.modals, [modalId]: true },
      payloads: { ...state.payloads, [modalId]: payload },
    }));
  },
  closeModal: (modalId) =>
    set((state) => {
      const nextPayloads = { ...state.payloads };
      delete nextPayloads[modalId];
      return {
        modals: { ...state.modals, [modalId]: false },
        payloads: nextPayloads,
      };
    }),
  toggleModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: !state.modals[modalId] },
    })),

  isOpen: (modalId) => !!get().modals[modalId],
}));
