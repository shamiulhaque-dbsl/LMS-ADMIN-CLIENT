"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "@/stores/modal-store";
import type { ModalContentProps } from "./types";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
  full: "max-w-full mx-4",
};

export const ModalContent: React.FC<ModalContentProps> = ({
  id,
  children,
  className = "",
  size = "lg",
}) => {
  const [mounted, setMounted] = React.useState(false);
  const closeModal = useModalStore((state) => state.closeModal);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={() => closeModal(id)}>
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full ${sizeClasses[size]} my-8 rounded-lg bg-white shadow-lg ${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
