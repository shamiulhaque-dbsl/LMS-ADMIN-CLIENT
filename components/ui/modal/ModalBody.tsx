import React from "react";
import type { ModalBodyProps } from "./types";

export const ModalBody: React.FC<ModalBodyProps> = ({ children, className = "" }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
};
