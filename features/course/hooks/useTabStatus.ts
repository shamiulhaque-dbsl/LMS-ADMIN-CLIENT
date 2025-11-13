import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";

export const useTabStatus = () => {
  const validationErrors = useCourseFormStore((state) => state.validationErrors);
  const completedTabs = useCourseFormStore((state) => state.completedTabs);

  const getTabStatus = (tabId: string) => {
    // Map of tab IDs to their fields
    const tabFieldsMap: Record<string, string[]> = {
      basic: ["title", "slug", "description", "shortDescription"],
      info: ["category", "level", "language", "duration"],
      media: ["thumbnail", "previewVideo", "images"],
      pricing: ["price", "discountPrice", "currency"],
      seo: ["metaTitle", "metaDescription", "metaKeywords", "ogImage"],
    };

    const tabFields = tabFieldsMap[tabId] || [];
    const hasErrors = tabFields.some((field) => validationErrors[field]);

    if (hasErrors) return "error";
    if (completedTabs[tabId]) return "completed";
    return "pending";
  };

  return { getTabStatus };
};
