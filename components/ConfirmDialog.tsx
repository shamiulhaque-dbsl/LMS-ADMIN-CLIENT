"use client";

import { useConfirmDialog } from "@/stores/confirmDialog";
import { useState } from "react";

export const ConfirmDialog = () => {
  const { isOpen, title, message, confirmText, cancelText, onConfirm, closeDialog } =
    useConfirmDialog();

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm?.();
    } finally {
      setLoading(false);
      closeDialog();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-80 rounded bg-white p-6 text-center shadow-md">
        {title && <h2 className="mb-2 text-lg font-semibold">{title}</h2>}
        {message && <p className="mb-4 text-sm text-gray-600">{message}</p>}

        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            {loading ? "Deleting..." : confirmText}
          </button>
          <button onClick={closeDialog} className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300">
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
