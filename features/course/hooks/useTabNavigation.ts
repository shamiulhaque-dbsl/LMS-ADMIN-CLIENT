import { COURSE_FORM_TABS } from "@/features/course/lib/constant";
import { useActiveTab, useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import type { FieldValues, UseFormTrigger } from "react-hook-form";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const TAB_REQUIRED_FIELDS: Record<string, string[]> = {
  basic: ["title", "courseType", "category", "status"],
  info: [],
  media: [],
  pricing: ["price"],
  seo: [],
  finish: ["title", "courseType", "category", "status", "price"],
};

export const useTabNavigation = <T extends FieldValues = FieldValues>(
  trigger?: UseFormTrigger<T>
) => {
  const pathname = usePathname();

  const mode = useCourseFormStore((s) => s.mode);
  const activeTab = useActiveTab();

  const setActiveTab = useCourseFormStore((s) => s.setActiveTab);
  const markTabCompleted = useCourseFormStore((s) => s.markTabCompleted);
  const resetTabs = useCourseFormStore((s) => s.resetTabs);

  const tabs = COURSE_FORM_TABS.filter((t) => (mode === "create" ? !t.showInEdit : true));

  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
  const canGoNext = currentIndex < tabs.length - 1;
  const canGoPrev = currentIndex > 0;

  useEffect(() => {
    resetTabs();
  }, [pathname, resetTabs]);

  // Validate fields for current tab
  const validateCurrentTab = async () => {
    if (!trigger) return true;
    const fields = TAB_REQUIRED_FIELDS[activeTab] ?? [];
    if (fields.length === 0) return true;

    return trigger(fields as any);
  };

  const goToNext = async () => {
    if (!canGoNext) return false;

    const isValid = await validateCurrentTab();
    if (!isValid) return false;

    markTabCompleted(activeTab);
    setActiveTab(tabs[currentIndex + 1].id);

    return true;
  };

  const goToPrev = () => {
    if (!canGoPrev) return false;

    setActiveTab(tabs[currentIndex - 1].id);
    return true;
  };

  const goToTab = async (tabId: string) => {
    const targetIndex = tabs.findIndex((t) => t.id === tabId);
    if (targetIndex === -1) return false;

    // Only validate when moving forward
    if (targetIndex > currentIndex) {
      const isValid = await validateCurrentTab();
      if (!isValid) return false;
    }

    setActiveTab(tabId);
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
    tabs,
  };
};
