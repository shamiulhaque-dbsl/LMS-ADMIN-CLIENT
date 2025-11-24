import { COURSE_FORM_TABS } from "../lib/constant";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";

export const useTabNavigation = () => {
  const activeTab = useCourseFormStore((state) => state.activeTab);
  const setActiveTab = useCourseFormStore((state) => state.setActiveTab);
  const markTabCompleted = useCourseFormStore((state) => state.markTabCompleted);

  const currentIndex = COURSE_FORM_TABS.findIndex((tab) => tab.id === activeTab);
  const canGoNext = currentIndex < COURSE_FORM_TABS.length - 1;
  const canGoPrev = currentIndex > 0;

  const validateCurrentTab = () => {
    const tabId = activeTab;

    if (tabId === "finish") {
      return { success: true, errors: {} };
    }

    const errors: Record<string, string> = {};

    if (Object.keys(errors).length > 0) {
      return { success: false, errors };
    }

    return { success: true, errors: {} };
  };

  const goToNext = () => {
    if (activeTab !== "finish") {
      const validation = validateCurrentTab();

      if (!validation.success) {
        return false;
      }

      markTabCompleted(activeTab);
    }

    if (canGoNext) {
      const nextTab = COURSE_FORM_TABS[currentIndex + 1];
      setActiveTab(nextTab.id);
      return true;
    }

    return false;
  };

  const goToPrev = () => {
    if (canGoPrev) {
      const prevTab = COURSE_FORM_TABS[currentIndex - 1];
      setActiveTab(prevTab.id);
      return true;
    }
    return false;
  };

  const goToTab = (tabId: string) => {
    setActiveTab(tabId);
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
