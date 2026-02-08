"use client";

import { useState } from "react";
import { createQuizz, updateQuizz, deleteQuizz } from "@/api/quiz";
import { AssignmentCreateFormValues } from "../types/type-matric";
import { createAssignment, updateAssignment } from "@/api/assignment";

export const useHandleAssignment = () => {
  const [loading, setLoading] = useState(false);

  const create = async (formData: AssignmentCreateFormValues) => {
    setLoading(true);
    try {
      return await createAssignment(formData);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number | string, formData: AssignmentCreateFormValues) => {
    setLoading(true);
    try {
      return await updateAssignment(id, formData);
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
