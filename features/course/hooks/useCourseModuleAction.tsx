"use client";

import { createCourseModule, updateCourseModule, deleteCourseModule } from "@/api/course/module";
import { useState } from "react";
import { CourseFormData } from "../types";
import { transformToApiFormat } from "../lib/utils";

/*
  #TODO:
  1. Make reuseable error response handler
*/
export const useCourseModuleAction = () => {
  const [loading, setLoading] = useState(false);

  const create = async (formData: CourseFormData) => {
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

  const update = async (id: number | string, formData: CourseFormData) => {
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
  const remove = async (id: number | string) => {
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
