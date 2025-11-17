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

//   // Define which fields belong to each tab for validation
//   const tabFields: Record<string, string[]> = {
//     basic: [
//       "title",
//       "shortDescription",
//       "description",
//       "category",
//       "level",
//       "courseType",
//       "status",
//     ],
//     info: [],
//     media: ["thumbnail", "previewVideo", "previewUrl"],
//     pricing: ["price"],
//     seo: [],
//     finish: [],
//   };

//   const goToNext = async () => {
//     // Skip validation for finish tab
//     if (activeTab === "finish") {
//       return false;
//     }

//     // If trigger is provided, validate only current tab fields
//     if (trigger) {
//       const fieldsToValidate = tabFields[activeTab] || [];
//       console.log(`🔍 Validating ${activeTab} tab fields:`, fieldsToValidate);

//       const isValid = await trigger(fieldsToValidate as any);
//       console.log(`✅ Validation result for ${activeTab}:`, isValid);

//       if (!isValid) {
//         console.log(`❌ Validation failed for ${activeTab} tab`);
//         return false;
//       }
//     }

//     if (canGoNext) {
//       markTabCompleted(activeTab);
//       const nextTab = COURSE_FORM_TABS[currentIndex + 1];
//       console.log(`➡️ Moving from ${activeTab} to ${nextTab.id}`);
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
//     // If trying to go to finish tab, validate all fields
//     if (tabId === "finish" && trigger) {
//       const isValid = await trigger();
//       if (!isValid) {
//         return false;
//       }
//     } else if (trigger) {
//       // For other tabs, validate only current tab fields
//       const fieldsToValidate = tabFields[activeTab] || [];
//       const isValid = await trigger(fieldsToValidate as any);
//       if (!isValid) {
//         return false;
//       }
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

import { COURSE_FORM_TABS } from "@/features/course/lib/constant";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import type { UseFormTrigger, FieldValues } from "react-hook-form";

export const useTabNavigation = <T extends FieldValues = FieldValues>(
  trigger?: UseFormTrigger<T>
) => {
  const activeTab = useCourseFormStore((state) => state.activeTab);
  const markTabCompleted = useCourseFormStore((state) => state.markTabCompleted);

  const currentIndex = COURSE_FORM_TABS.findIndex((tab) => tab.id === activeTab);
  const canGoNext = currentIndex < COURSE_FORM_TABS.length - 1;
  const canGoPrev = currentIndex > 0;

  const goToNext = async () => {
    if (trigger) {
      const isValid = await trigger();
      if (!isValid) return false;
    }

    if (canGoNext) {
      markTabCompleted(activeTab);
      const nextTab = COURSE_FORM_TABS[currentIndex + 1];
      useCourseFormStore.getState().setActiveTab(nextTab.id);
      return true;
    }
    return false;
  };

  const goToPrev = () => {
    if (canGoPrev) {
      const prevTab = COURSE_FORM_TABS[currentIndex - 1];
      useCourseFormStore.getState().setActiveTab(prevTab.id);
      return true;
    }
    return false;
  };

  const goToTab = async (tabId: string) => {
    if (trigger) {
      const isValid = await trigger();
      if (!isValid) return false;
    }

    useCourseFormStore.getState().setActiveTab(tabId);
    return true;
  };

  return {
    activeTab,
    currentIndex,
    canGoNext,
    canGoPrev,
    goToNext,
    goToPrev,
    goToTab,
  };
};
