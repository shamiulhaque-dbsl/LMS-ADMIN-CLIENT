import { COURSE_FORM_TABS } from "../lib/constant";
import { useCourseFormStore } from "@/features/course/stores/useCourseFormStore";

export const useTabNavigation = () => {
  const activeTab = useCourseFormStore((state) => state.activeTab);
  const setActiveTab = useCourseFormStore((state) => state.setActiveTab);
  const markTabCompleted = useCourseFormStore((state) => state.markTabCompleted);
  const formData = useCourseFormStore((state) => state.formData);
  const setValidationErrors = useCourseFormStore((state) => state.setValidationErrors);

  const currentIndex = COURSE_FORM_TABS.findIndex((tab) => tab.id === activeTab);
  const canGoNext = currentIndex < COURSE_FORM_TABS.length - 1;
  const canGoPrev = currentIndex > 0;

  // Inline validation function
  const validateCurrentTab = () => {
    const tabId = activeTab;

    // Skip validation for finish tab
    if (tabId === "finish") {
      return { success: true, errors: {} };
    }

    const errors: Record<string, string> = {};

    // switch (tabId) {
    //   case "basic":
    //     if (!formData.title || formData.title.length < 5) {
    //       errors.title = "Title must be at least 5 characters";
    //     }
    //     break;

    //   case "info":
    //     if (!formData.category) {
    //       errors.category = "Category is required";
    //     }
    //     if (!formData.level) {
    //       errors.level = "Level is required";
    //     }
    //     if (!formData.duration) {
    //       errors.duration = "Duration is required";
    //     }
    //     break;

    //   case "media":
    //     if (!formData.thumbnail) {
    //       errors.thumbnail = "Thumbnail is required";
    //     }
    //     if (!formData.images || formData.images.length === 0) {
    //       errors.images = "At least one image is required";
    //     }
    //     break;

    //   case "pricing":
    //     if (!formData.price || parseFloat(formData.price) <= 0) {
    //       errors.price = "Valid price is required";
    //     }
    //     if (!formData.currency) {
    //       errors.currency = "Currency is required";
    //     }
    //     if (
    //       formData.discountPrice &&
    //       parseFloat(formData.discountPrice) >= parseFloat(formData.price)
    //     ) {
    //       errors.discountPrice = "Discount price must be less than regular price";
    //     }
    //     break;

    //   case "seo":
    //     if (!formData.metaTitle || formData.metaTitle.length < 10) {
    //       errors.metaTitle = "Meta title must be at least 10 characters";
    //     }
    //     if (!formData.metaDescription || formData.metaDescription.length < 50) {
    //       errors.metaDescription = "Meta description must be at least 50 characters";
    //     }
    //     if (!formData.metaKeywords || formData.metaKeywords.length < 3) {
    //       errors.metaKeywords = "At least 3 keywords are required";
    //     }
    //     if (!formData.ogImage) {
    //       errors.ogImage = "OG image is required";
    //     }
    //     break;
    // }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return { success: false, errors };
    }

    setValidationErrors({});
    return { success: true, errors: {} };
  };

  const goToNext = () => {
    // Skip validation for finish tab
    if (activeTab !== "finish") {
      const validation = validateCurrentTab();

      if (!validation.success) {
        return false; // Block navigation
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
