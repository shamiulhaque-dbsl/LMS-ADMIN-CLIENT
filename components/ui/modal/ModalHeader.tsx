import React from "react";
import type { ModalHeaderProps } from "./types";

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className = "" }) => {
  return <div className={`flex flex-col space-y-1.5 px-6 py-4 ${className}`}>{children}</div>;
};
