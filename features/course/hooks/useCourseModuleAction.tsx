"use client";

import { createCourseModule, updateCourseModule, deleteCourseModule } from "@/api/course/module";
import { useState } from "react";
import type { CourseModule, ID } from "@/features/course/types";

/*
  #TODO:
  1. Make reuseable error response handler
*/
export const useCourseModuleAction = () => {
  const [loading, setLoading] = useState(false);

  const create = async (formData: CourseModule) => {
    try {
      const res = await createCourseModule(formData);
      return { success: true, data: res };
    } catch (err: any) {
      return {
        success: false,
        message: err.message ?? "Failed to create section",
        errors: err.errors ?? {},
      };
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: ID, formData: CourseModule) => {
    setLoading(true);
    try {
      const res = await updateCourseModule(id, formData);
      return { success: true, data: res };
    } catch (err: any) {
      return {
        success: false,
        message: err.message ?? "Failed to update course",
        errors: err.errors ?? {},
      };
    } finally {
      setLoading(false);
    }
  };
  const remove = async (id: ID) => {
    setLoading(true);
    try {
      const res = await deleteCourseModule(id);
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

  return { create, update, remove, loading };
};
