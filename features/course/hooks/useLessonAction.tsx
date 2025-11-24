"use client";

import { useState } from "react";
import { createLesson, updateLesson, deleteLesson } from "@/api/course/lesson";
import type { LessonFormData, ID } from "@/features/course/types";

/*
  #TODO:
  1. Make reuseable error response handler
*/
export const useLessonAction = () => {
  const [loading, setLoading] = useState(false);

  const create = async (formData: LessonFormData) => {
    console.log("Creating lesson with data:", formData);
    setLoading(true);
    try {
      const formatData = {
        ...formData,
        module_id: formData.moduleId,
        content_type: formData.contentType,
        content_url: formData.contentUrl,
        duration: formData.duration,
        is_preview: formData.isPreview,
      };
      const res = await createLesson(formatData);
      return { success: true, data: res };
    } catch (err: any) {
      return {
        success: false,
        message: err.message ?? "Failed to create lesson",
        errors: err.errors ?? {},
      };
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: ID, formData: LessonFormData) => {
    setLoading(true);
    try {
      const formatData = {
        ...formData,
        module_id: formData.moduleId,
        content_type: formData.contentType,
        content_url: formData.contentUrl,
        duration: formData.duration,
        is_preview: formData.isPreview,
      };
      const res = await updateLesson(id, formatData);
      return { success: true, data: res };
    } catch (err: any) {
      return {
        success: false,
        message: err.message ?? "Failed to update lesson",
        errors: err.errors ?? {},
      };
    } finally {
      setLoading(false);
    }
  };
  const remove = async (id: ID) => {
    setLoading(true);
    try {
      const res = await deleteLesson(id);
      return { success: true, data: res };
    } catch (err: any) {
      return {
        success: false,
        message: err.message ?? "Failed to delete lesson",
        errors: err.errors ?? {},
      };
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading };
};
