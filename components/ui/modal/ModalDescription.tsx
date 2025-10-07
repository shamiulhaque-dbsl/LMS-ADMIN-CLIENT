import React from "react";
import type { ModalDescriptionProps } from "./types";

export const ModalDescription: React.FC<ModalDescriptionProps> = ({ children, className = "" }) => {
  return <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;
};
