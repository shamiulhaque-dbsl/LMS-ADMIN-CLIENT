"use client";

import React, { useEffect } from "react";
import { useModalStore } from "@/stores/modal-store";
import type { ModalProps } from "./types";

export const Modal: React.FC<ModalProps> = ({ id, children }) => {
  const isOpen = useModalStore((state) => state.modals[id] || false);
  const closeModal = useModalStore((state) => state.closeModal);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal(id);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, id, closeModal]);

  if (!isOpen) return null;

  return <>{children}</>;
};
