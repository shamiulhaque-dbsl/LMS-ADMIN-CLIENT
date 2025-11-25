import { COURSE_FORM_TABS } from "@/features/course/lib/constant";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";
import type { UseFormTrigger, FieldValues } from "react-hook-form";

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
  const mode = useCourseFormStore((s) => s.mode);
  const activeTab = useCourseFormStore((s) => s.activeTab(s));
  const markTabCompleted = useCourseFormStore((s) => s.markTabCompleted);

  const tabs = COURSE_FORM_TABS.filter((t) => (mode === "create" ? !t.showInEdit : true));

  const currentIndex = tabs.findIndex((t) => t.id === activeTab);
  const canGoNext = currentIndex < tabs.length - 1;
  const canGoPrev = currentIndex > 0;

  const validateCurrentTab = async () => {
    if (!trigger) return true;
    const fields = TAB_REQUIRED_FIELDS[activeTab] || [];
    if (fields.length === 0) return true;
    return trigger(fields as any);
  };

  const goToNext = async () => {
    const ok = await validateCurrentTab();
    if (!ok) return false;

    if (!canGoNext) return false;

    markTabCompleted(activeTab);

    const next = tabs[currentIndex + 1];
    useCourseFormStore.getState().setActiveTab(next.id);

    return true;
  };

  const goToPrev = () => {
    if (!canGoPrev) return false;

    const prev = tabs[currentIndex - 1];
    useCourseFormStore.getState().setActiveTab(prev.id);

    return true;
  };

  const goToTab = async (tabId: string) => {
    const targetIndex = tabs.findIndex((t) => t.id === tabId);
    if (targetIndex === -1) return false;

    if (targetIndex > currentIndex) {
      const ok = await validateCurrentTab();
      if (!ok) return false;
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
    tabs,
  };
};
