"use client";

import { deleteCourse } from "@/api/course";
import { useState } from "react";

/*
  #TODO:
  1. Make reuseable error response handler
*/
export const useCourseAction = () => {
  const [loading, setLoading] = useState(false);

  const remove = async (id: number | string) => {
    setLoading(true);
    try {
      const res = await deleteCourse(id);
      return { success: true, data: res };
    } catch (err: any) {
      return {
        success: false,
        message: err.message ?? "Failed to delete course",
        errors: err.errors ?? {},
      };
    } finally {
      setLoading(false);
    }
  };

  return { remove, loading };
};
