"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";

export const useCleanupCourseDraft = () => {
  const pathname = usePathname();
  const resetDraft = useCourseFormStore((s) => s.resetDraft);

  useEffect(() => {
    return () => {
      // Cleanup when leaving create flow
      if (!pathname.includes("/courses/create")) {
        resetDraft();
      }
      resetDraft();
    };
  }, [pathname, resetDraft]);
};
