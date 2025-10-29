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

    if (message && !errors) {
      setError("root", { type: "server", message });
    }

    if (errors) {
      Object.entries(errors).forEach(([field, value]) => {
        const messageText = Array.isArray(value) ? value[0] : value;
        setError(field as Path<T>, { type: "server", message: messageText });
      });
    }
  };

  return { handleApiErrors };
};
