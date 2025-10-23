"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
  ModalOverlay,
} from "@/components/ui/modal";

export type ConfirmationType = "delete" | "warning" | "info" | "success";

export interface ConfirmationModalProps {
  id: string;
  type?: ConfirmationType;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
}

const typeConfig = {
  delete: {
    title: "Are you sure?",
    description: "This action cannot be undone. This will permanently delete the item.",
    confirmText: "Delete",
    confirmClass: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    icon: (
      <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
  },
  warning: {
    title: "Warning",
    description: "Please confirm you want to proceed with this action.",
    confirmText: "Confirm",
    confirmClass: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
    icon: (
      <svg
        className="h-6 w-6 text-yellow-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
  },
  info: {
    title: "Confirmation",
    description: "Do you want to proceed?",
    confirmText: "Confirm",
    confirmClass: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    icon: (
      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  success: {
    title: "Confirm Action",
    description: "Are you sure you want to proceed?",
    confirmText: "Confirm",
    confirmClass: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
    icon: (
      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  id,
  type = "delete",
  title,
  description,
  confirmText,
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  const config = typeConfig[type];
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;
  const finalConfirmText = confirmText || config.confirmText;

  const handleConfirm = async () => {
    await onConfirm();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <Modal id={id}>
      <ModalOverlay id={id} />
      <ModalContent id={id} size="sm">
        <ModalClose id={id} />
        <ModalHeader>
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">{config.icon}</div>
            <div>
              <ModalTitle>{finalTitle}</ModalTitle>
            </div>
          </div>
          <ModalDescription className="mt-2">{finalDescription}</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${config.confirmClass}`}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              finalConfirmText
            )}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
