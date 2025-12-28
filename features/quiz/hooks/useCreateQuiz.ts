"use client";

import { useState } from "react";
import type { QuizCreateFormValues } from "../types";
import { createQuiz } from "@/api/quiz";

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

  // const { handleApiErrors } = useHandleApiErrors<QuizCreateFormValues>();

  // const submit = async (
  //   values: QuizCreateFormValues,
  //   setError: UseFormSetError<QuizCreateFormValues>
  // ) => {
  //   setLoading(true);
  //   setSuccess(false);

  //   try {
  //     await createQuiz({
  //       title: values.title,
  //       courseId: values.courseId,
  //       moduleId: values.moduleId,
  //       timeLimitMinutes: values.timeLimitMinutes,
  //       totalPoint: values.totalPoint,
  //       passingPoint: values.passingPoint,
  //       maxAttempts: values.maxAttempts,
  //       description: values.description,
  //       status: values.status,
  //       randomizeQuestions: values.randomizeQuestions,
  //       randomizeOptions: values.randomizeOptions,
  //     });

  //     setSuccess(true);
  //   } catch (err: any) {
  //     handleApiErrors(err, setError);
  //     setSuccess(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return { create, loading };
};
