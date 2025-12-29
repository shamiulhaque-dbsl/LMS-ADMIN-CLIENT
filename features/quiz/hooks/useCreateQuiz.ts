"use client";

import { useState } from "react";
import type { QuizCreateFormValues } from "../types";
import { createQuiz, updateQuiz } from "@/api/quiz";

export const useCreateQuiz = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const create = async (formData: QuizCreateFormValues) => {
    setLoading(true);
    try {
      const res = await createQuiz(formData);
      return { success: true, data: res };
    } catch (err: any) {
      return {
        success: false,
        message: err.message ?? "Failed to create quiz",
        errors: err.errors ?? {},
      };
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number | string, formData: QuizCreateFormValues) => {
    setLoading(true);
    try {
      const res = await updateQuiz(id, formData);
      return { success: true, data: res };
    } catch (err: any) {
      return {
        success: false,
        message: err.message ?? "Failed to update quiz",
        errors: err.errors ?? {},
      };
    } finally {
      setLoading(false);
    }
  };

  return { create, update, loading };
};
