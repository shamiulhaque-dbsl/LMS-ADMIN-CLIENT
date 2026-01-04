"use client";

import { useState } from "react";
import type { QuizCreateFormValues } from "../types";
import { createQuizz, updateQuizz, deleteQuizz } from "@/api/quiz";

export const useCreateQuiz = () => {
  const [loading, setLoading] = useState(false);

  const create = async (formData: QuizCreateFormValues) => {
    setLoading(true);
    try {
      return await createQuizz(formData);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number | string, formData: QuizCreateFormValues) => {
    setLoading(true);
    try {
      return await updateQuizz(id, formData);
    } finally {
      setLoading(false);
    }
  };

  const removeQuizz = async (id: number | string) => {
    setLoading(true);
    try {
      return await deleteQuizz(id);
    } finally {
      setLoading(false);
    }
  };

  return { create, update, removeQuizz, loading };
};
