import React from "react";
import type { ModalFooterProps } from "./types";

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex items-center justify-end gap-2 px-6 py-4 ${className}`}>{children}</div>
  );
};
