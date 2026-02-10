"use client";

import { useState } from "react";
import { createAssignment, updateAssignment } from "@/api/assignment";
import { AssignmentCreateFormValues } from "@/features/assignment/types/type-matric";

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

  return { create, update, loading };
};
