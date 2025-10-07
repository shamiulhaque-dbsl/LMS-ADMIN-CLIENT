import React from "react";
import type { ModalTitleProps } from "./types";

export const ModalTitle: React.FC<ModalTitleProps> = ({ children, className = "" }) => {
  return (
    <h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h2>
  );
};
