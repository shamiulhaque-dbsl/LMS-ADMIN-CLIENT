import { create } from "zustand";

interface ConfirmDialogState {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => Promise<void> | void;
  openDialog: (options: {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => Promise<void> | void;
  }) => void;
  closeDialog: () => void;
}

export const useConfirmDialog = create<ConfirmDialogState>((set) => ({
  isOpen: false,
  title: "",
  message: "",
  confirmText: "Confirm",
  cancelText: "Cancel",
  onConfirm: undefined,

  openDialog: (options) => set({ ...options, isOpen: true }),
  closeDialog: () => set({ isOpen: false }),
}));
