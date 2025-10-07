"use client";

import React from "react";
import type { ModalOverlayProps } from "./types";

export const ModalOverlay: React.FC<ModalOverlayProps> = ({ id, className = "" }) => {
  return <div className={`fixed inset-0 z-50 bg-black/80 ${className}`} />;
};
