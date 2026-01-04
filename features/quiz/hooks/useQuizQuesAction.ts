"use client";

import { useState } from "react";
import type { QuestionFormData } from "../types";
import { createQuestion, updateQuestion, deleteQuestion } from "@/api/quiz/question";

export const useQuizQuestionAction = () => {
  const [loading, setLoading] = useState(false);

  const create = async (quizId: number, formData: QuestionFormData) => {
    setLoading(true);
    try {
      return await createQuestion(quizId, formData);
    } finally {
      setLoading(false);
    }
  };

  const update = async (quizId: number, id: number | string, formData: QuestionFormData) => {
    setLoading(true);
    try {
      return await updateQuestion(quizId, id, formData);
    } finally {
      setLoading(false);
    }
  };

  const removeQuestion = async (quizId: number, id: number | string) => {
    setLoading(true);
    try {
      return await deleteQuestion(quizId, id);
    } finally {
      setLoading(false);
    }
  };

  return { create, update, removeQuestion, loading };
};
