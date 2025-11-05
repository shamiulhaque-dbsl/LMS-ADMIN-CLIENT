"use client";

import { createCategory } from "@/api/category";
import { useState } from "react";

export const useCategoryAction = () => {
  const [loading, setLoading] = useState(false);

  const create = async (formData: any) => {
    setLoading(true);
    try {
      const res = await createCategory({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("resr-es", res);
      return { success: true };
    } catch (err: any) {
      const apiResponse = err.response?.data || err.response || { message: "Create failed" };
      return {
        success: false,
        response: {
          message: apiResponse.message,
          errors: apiResponse.errors,
        },
      };
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
};
