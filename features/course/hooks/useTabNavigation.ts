import { COURSE_FORM_TABS } from "@/features/course/lib/constant";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import type { UseFormTrigger, FieldValues } from "react-hook-form";

/**
 * Tab-wise validation:
 * - The TAB_REQUIRED_FIELDS map lists only the required fields for each tab.
 * - When moving forward (next or clicking another tab forward), we trigger validation only for current tab's fields.
 * - When clicking backward, navigation is free.
 */
const TAB_REQUIRED_FIELDS: Record<string, string[]
> = {
  basic: ["title", "courseType", "category", "status"],
  info: [], // optional
  media: [], // example
  pricing: ["price"],
  seo: [],
  finish: ["title", "courseType", "category", "status", "price"], // validate all critical fields before submit
};

export const useTabNavigation = <T extends FieldValues = FieldValues>(
  trigger?: UseFormTrigger<T>
) => {
  const activeTab = useCourseFormStore((s) => s.activeTab);
  const markTabCompleted = useCourseFormStore((s) => s.markTabCompleted);

  const currentIndex = COURSE_FORM_TABS.findIndex((t) => t.id === activeTab);
  const canGoNext = currentIndex < COURSE_FORM_TABS.length - 1;
  const canGoPrev = currentIndex > 0;

  const validateCurrentTab = async () => {
    if (!trigger) return true;
    const fields = TAB_REQUIRED_FIELDS[activeTab] || [];
    if (fields.length === 0) return true; // nothing required
    const ok = await trigger(fields as any);
    return ok;
  };

  const goToNext = async () => {
    const ok = await validateCurrentTab();
    if (!ok) return false;
    if (!canGoNext) return false;
    markTabCompleted(activeTab);
    const next = COURSE_FORM_TABS[currentIndex + 1];
    useCourseFormStore.getState().setActiveTab(next.id);
    return true;
  };

  const goToPrev = () => {
    if (!canGoPrev) return false;
    const prev = COURSE_FORM_TABS[currentIndex - 1];
    useCourseFormStore.getState().setActiveTab(prev.id);
    return true;
  };

  const goToTab = async (tabId: string) => {
    const targetIndex = COURSE_FORM_TABS.findIndex((t) => t.id === tabId);
    if (targetIndex === -1) return false;

    // If navigating forward from current tab, validate current tab
    if (targetIndex > currentIndex) {
      const ok = await validateCurrentTab();
      if (!ok) return false;
    }

    useCourseFormStore.getState().setActiveTab(tabId);
    return true;
  };

  return { activeTab, currentIndex, canGoNext, canGoPrev, goToNext, goToPrev, goToTab };
};

// import { COURSE_FORM_TABS } from "@/features/course/lib/constant";
// import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
// import type { UseFormTrigger, FieldValues } from "react-hook-form";

// export const useTabNavigation = <T extends FieldValues = FieldValues>(
//   trigger?: UseFormTrigger<T>
// ) => {
//   const activeTab = useCourseFormStore((state) => state.activeTab);
//   const markTabCompleted = useCourseFormStore((state) => state.markTabCompleted);

//   const currentIndex = COURSE_FORM_TABS.findIndex((tab) => tab.id === activeTab);
//   const canGoNext = currentIndex < COURSE_FORM_TABS.length - 1;
//   const canGoPrev = currentIndex > 0;

//   const goToNext = async () => {
//     if (trigger) {
//       const isValid = await trigger();
//       if (!isValid) return false;
//     }

//     if (canGoNext) {
//       markTabCompleted(activeTab);
//       const nextTab = COURSE_FORM_TABS[currentIndex + 1];
//       useCourseFormStore.getState().setActiveTab(nextTab.id);
//       return true;
//     }
//     return false;
//   };

//   const goToPrev = () => {
//     if (canGoPrev) {
//       const prevTab = COURSE_FORM_TABS[currentIndex - 1];
//       useCourseFormStore.getState().setActiveTab(prevTab.id);
//       return true;
//     }
//     return false;
//   };

//   const goToTab = async (tabId: string) => {
//     if (trigger) {
//       const isValid = await trigger();
//       if (!isValid) return false;
//     }

//     useCourseFormStore.getState().setActiveTab(tabId);
//     return true;
//   };

//   return {
//     activeTab,
//     currentIndex,
//     canGoNext,
//     canGoPrev,
//     goToNext,
//     goToPrev,
//     goToTab,
//   };
// };
