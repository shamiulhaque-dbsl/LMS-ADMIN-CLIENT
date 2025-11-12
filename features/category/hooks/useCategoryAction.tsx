"use client";

import { createCategory, updateCategory, deleteCategory } from "@/api/category";
import { useState } from "react";
import { FormData } from "@/features/category/types";

/*
  #TODO:
  1. Make reuseable error response handler
*/
export const useCategoryAction = () => {
  const [loading, setLoading] = useState(false);

  const create = async (formData: FormData) => {
    setLoading(true);
    try {
      const res = await createCategory(formData);
      return { success: true, data: res };
    } catch (err: any) {
      return {
        success: false,
        message: err.message ?? "Failed to create category",
        errors: err.errors ?? {},
      };
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: number | string, formData: FormData) => {
    setLoading(true);
    try {
      const res = await updateCategory(id, formData);
      return { success: true, data: res };
    } catch (err: any) {
      return {
        success: false,
        message: err.message ?? "Failed to update category",
        errors: err.errors ?? {},
      };
    } finally {
      setLoading(false);
    }
  };

  const removeCategory = async (id: number | string) => {
    setLoading(true);
    try {
      const res = await deleteCategory(id);
      return { success: true, data: res };
    } catch (err: any) {
      return {
        success: false,
        message: err.message ?? "Failed to delete category",
        errors: err.errors ?? {},
      };
    } finally {
      setLoading(false);
    }
  };

  return { create, update, removeCategory, loading };
};
