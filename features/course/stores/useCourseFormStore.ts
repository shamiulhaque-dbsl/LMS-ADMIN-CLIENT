import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { CourseFormData, CourseMetadataFormatted } from "../types";
import type { Category } from "@/features/category/types";

export interface ValidationErrors {
  [key: string]: string;
}

interface CourseFormState {
  formData: CourseFormData;
  activeTab: string;
  completedTabs: Record<string, boolean>;
  validationErrors: ValidationErrors;
  isSubmitting: boolean;
  isDirty: boolean;
  courseId?: string | number;

  categories: Category[];
  courseMetadata: CourseMetadataFormatted | null;

  setCourseId: (id: string | number) => void;
  setFormData: (data: Partial<CourseFormData>) => void;
  setActiveTab: (tab: string) => void;
  markTabCompleted: (tab: string) => void;
  clearValidationErrors: () => void;
  setIsSubmitting: (v: boolean) => void;
  setCategories: (categories: Category[]) => void;
  setCourseMetadata: (metadata: CourseMetadataFormatted | null) => void;
  resetForm: () => void;
}

export const INITIAL: CourseFormData = {
  // Basic Info
  title: "",
  description: "",
  longDescription: "",
  category: null,
  level: "",
  courseType: "",
  status: "",

  // Media
  thumbnail: "",
  videoDemoSource: "youtube",
  videoDemoUrl: "",

  // Details
  durationHours: undefined,
  requirements: [],
  learningOutcomes: [],
  targetAudience: [],
  faqs: [],
  projects: [],
  moneyBackDays: undefined,

  // Pricing
  price: 0,
  discountPrice: 0,
  isFree: false,
  numberOfMonths: 0,
  expiryPeriod: "lifetime",

  // Features
  courseForum: false,
  downloadableContent: false,
  certificateAvailable: false,

  // SEO
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
};

export const useCourseFormStore = create<CourseFormState>()(
  devtools(
    persist(
      (set) => ({
        formData: INITIAL,
        activeTab: "basic",
        completedTabs: {},
        validationErrors: {},
        isSubmitting: false,
        isDirty: false,
        courseId: undefined,

        categories: [],
        courseMetadata: null,

        setCourseId: (id) => set({ courseId: id }),
        setFormData: (data) =>
          set((s) => ({ formData: { ...s.formData, ...data }, isDirty: true })),
        setActiveTab: (tab) => set({ activeTab: tab }),
        markTabCompleted: (tab) =>
          set((s) => ({ completedTabs: { ...s.completedTabs, [tab]: true } })),
        clearValidationErrors: () => set({ validationErrors: {} }),
        setIsSubmitting: (v) => set({ isSubmitting: v }),
        setCategories: (categories) => set({ categories }),
        setCourseMetadata: (metadata) => set({ courseMetadata: metadata }),

        resetForm: () =>
          set({
            formData: INITIAL,
            activeTab: "basic",
            completedTabs: {},
            validationErrors: {},
            isSubmitting: false,
            isDirty: false,
          }),
      }),
      {
        name: "course-form-storage",
        partialize: (s) => ({
          formData: s.formData,
          activeTab: s.activeTab,
          completedTabs: s.completedTabs,
        }),
      }
    )
  )
);

// selectors
export const useFormData = () => useCourseFormStore((s) => s.formData);
export const useActiveTab = () => useCourseFormStore((s) => s.activeTab);
export const useValidationErrors = () => useCourseFormStore((s) => s.validationErrors);
export const useIsSubmitting = () => useCourseFormStore((s) => s.isSubmitting);
export const useIsDirty = () => useCourseFormStore((s) => s.isDirty);
