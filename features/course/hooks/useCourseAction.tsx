"use client";

import { createCourse, updateCourse, deleteCourse } from "@/api/course";
import { useState } from "react";
import { CourseFormData } from "../types";
import { transformToApiFormat } from "../lib/utils";

/*
  #TODO:
  1. Make reuseable error response handler
*/
export const useCourseAction = () => {
  const [loading, setLoading] = useState(false);

  const create = async (formData: CourseFormData) => {
    try {
      const cleanedData: CourseFormData = {
        ...formData,
        requirements: formData.requirements?.filter(Boolean),
        learningOutcomes: formData.learningOutcomes?.filter(Boolean),
        targetAudience: formData.targetAudience?.filter(Boolean),
        faqs: formData.faqs?.filter((f) => f.question?.trim() || f.answer?.trim()),
        projects: formData.projects?.filter(
          (p) => p.title?.trim() || p.description?.trim() || p.image?.trim()
        ),
      };

      const formattedData = transformToApiFormat(cleanedData);

      console.log("Creating course with formattedData data:", formattedData);
      const res = await createCourse(formattedData);
      return { success: true, data: res };
    } catch (err: any) {
      return {
        success: false,
        message: err.message ?? "Failed to create course",
        errors: err.errors ?? {},
      };
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number | string, formData: CourseFormData) => {
    setLoading(true);
    try {
      const cleanedData: CourseFormData = {
        ...formData,
        expiryPeriod: formData.expiryPeriod === "lifetime" ? 1 : 0,
        requirements: formData.requirements?.filter(Boolean),
        learningOutcomes: formData.learningOutcomes?.filter(Boolean),
        targetAudience: formData.targetAudience?.filter(Boolean),
        faqs: formData.faqs?.filter((f) => f.question?.trim() || f.answer?.trim()),
        projects: formData.projects?.filter(
          (p) => p.title?.trim() || p.description?.trim() || p.image?.trim()
        ),
      };
      const formattedData = transformToApiFormat(cleanedData);
      const res = await updateCourse(id, formattedData);
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

  return { create, update, remove, loading };
};
