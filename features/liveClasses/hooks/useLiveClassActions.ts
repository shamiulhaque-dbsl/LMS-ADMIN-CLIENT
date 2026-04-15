"use client";
import { LiveClassFormData } from "../types";
import { createLiveSession, updateLiveSession } from "@/api/live-session";
import { useState } from "react";
import { toast } from "sonner";
import { ApiError } from "@/api";

export const useLiveClassActions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const create = async (payload: LiveClassFormData) => {
    setIsLoading(true);
    try {
      const response = await createLiveSession(payload);
      toast.success("Live class created successfully!");
      return { success: true, data: response };
    } catch (err) {
      console.error("Error caught:", err);

      let message = "Failed to create live class";
      let errors: Record<string, string[] | string> = {};

      // Handle ApiError from the API request
      if (err instanceof ApiError) {
        message = err.message;
        errors = err.errors || {};

        // Show the error message to user
        toast.error(message);

        // If there are field-level errors, log them too
        if (Object.keys(errors).length > 0) {
          console.error("Validation errors:", errors);
        }
      } else {
        // Handle other types of errors
        const errorMessage = err instanceof Error ? err.message : String(err);
        toast.error(errorMessage);
      }

      return {
        success: false,
        message,
        errors,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (id: string, payload: LiveClassFormData) => {
    setIsLoading(true);
    try {
      const response = await updateLiveSession(id, payload);
      console.log("response", response);
      toast.success("Live class updated successfully!");
      return { success: true, data: response };
    } catch (err) {
      console.error("Error caught:", err);

      let message = "Failed to update live class";
      let errors: Record<string, string[] | string> = {};

      // Handle ApiError from the API request
      if (err instanceof ApiError) {
        message = err.message;
        errors = err.errors || {};

        // Show the error message to user
        toast.error(message);

        // If there are field-level errors, log them too
        if (Object.keys(errors).length > 0) {
          console.error("Validation errors:", errors);
        }
      } else {
        // Handle other types of errors
        const errorMessage = err instanceof Error ? err.message : String(err);
        toast.error(errorMessage);
      }

      return {
        success: false,
        message,
        errors,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return { create, update, loading: isLoading };
};
