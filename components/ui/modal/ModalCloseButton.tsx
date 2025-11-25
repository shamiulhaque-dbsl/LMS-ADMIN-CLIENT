"use client";

import React from "react";
import { useModalStore } from "@/stores/modal-store";
import type { ModalCloseProps } from "./types";
import { Button } from "../Button";

export const ModalClose: React.FC<ModalCloseProps> = ({ id, className = "" }) => {
  const closeModal = useModalStore((state) => state.closeModal);

  return (
    <Button type="button" variant="outline" onClick={() => closeModal(id)} className={className}>
      Close
    </Button>
  );
};
