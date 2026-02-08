"use client";

import { FieldValues, UseFormSetError, Path } from "react-hook-form";

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[] | string>;
}
const snakeToCamel = (str: string) => str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const useHandleApiErrors = <T extends FieldValues>() => {
  const handleApiErrors = (
    response: ApiErrorResponse | undefined,
    setError: UseFormSetError<T>
  ) => {
    if (!response) return;
    if (response instanceof ReferenceError) {
      setError("root", {
        type: "server",
        message: "Seomthing went wrong. Please try again later.",
      });
      return;
    }
    const { message, errors } = response;

    if (errors) {
      Object.entries(errors).forEach(([field, value]) => {
        const camelField = snakeToCamel(field) as Path<T>;
        const messageText = Array.isArray(value) ? value[0] : value;
        setError(camelField, { type: "server", message: messageText });
      });
    }

    // Handle global / root message separately
    if (message && (!errors || Object.keys(errors).length === 0)) {
      setError("root", { type: "server", message });
    }
  };

  return { handleApiErrors };
};
