"use client";

import { FieldValues, UseFormSetError, Path } from "react-hook-form";

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[] | string>;
}

export const useHandleApiErrors = <T extends FieldValues>() => {
  const handleApiErrors = (
    response: ApiErrorResponse | undefined,
    setError: UseFormSetError<T>
  ) => {
    if (!response) return;

    const { message, errors } = response;

    // Handle field-level errors first
    if (errors && Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, value]) => {
        const messageText = Array.isArray(value) ? value[0] : value;
        setError(field as Path<T>, { type: "server", message: messageText });
      });
    }

    // Handle global / root message separately
    if (message && (!errors || Object.keys(errors).length === 0)) {
      setError("root", { type: "server", message });
    }
  };

  return { handleApiErrors };
};
