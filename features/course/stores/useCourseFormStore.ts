import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { CourseFormData } from "@/features/course/types";

export interface ValidationErrors {
  [key: string]: string;
}

interface CourseFormState {
  formData: CourseFormData;
  activeTab: string;
  completedTabs: Record<string, boolean>;
  isSubmitting: boolean;
  isDirty: boolean;
  validationErrors: ValidationErrors;

  setFormData: (data: Partial<CourseFormData>) => void;
  updateField: <K extends keyof CourseFormData>(field: K, value: CourseFormData[K]) => void;
  setActiveTab: (tab: string) => void;
  markTabCompleted: (tabId: string) => void;
  setIsSubmitting: (value: boolean) => void;
  setValidationErrors: (errors: ValidationErrors) => void;
  clearValidationErrors: () => void;
  resetForm: () => void;
}

const initialFormData: CourseFormData = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  courseType: "",
  status: "",
  category: "",
  level: "",
  language: "",
  duration: "",
  thumbnail: "",
  previewVideo: "",
  previewUrl: "",
  images: [],
  price: "",
  discountPrice: "",
  currency: "USD",
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
  ogImage: "",
  courseForum: false,
  downloadableContent: false,
  certificateAvailable: false,
};

export const useCourseFormStore = create<CourseFormState>()(
  devtools(
    persist(
      (set) => ({
        formData: initialFormData,
        activeTab: "basic",
        completedTabs: {},
        isSubmitting: false,
        isDirty: false,
        validationErrors: {},

        setFormData: (data) =>
          set((state) => ({
            formData: { ...state.formData, ...data },
            isDirty: true,
          })),

        updateField: <K extends keyof CourseFormData>(field: K, value: CourseFormData[K]) =>
          set((state) => {
            const newErrors = { ...state.validationErrors };
            delete newErrors[field as string];
            return {
              formData: { ...state.formData, [field]: value },
              isDirty: true,
              validationErrors: newErrors,
            };
          }),

        setActiveTab: (tab) => set({ activeTab: tab }),
        markTabCompleted: (tabId) =>
          set((state) => ({
            completedTabs: { ...state.completedTabs, [tabId]: true },
          })),
        setIsSubmitting: (value) => set({ isSubmitting: value }),
        setValidationErrors: (errors) => set({ validationErrors: errors }),
        clearValidationErrors: () => set({ validationErrors: {} }),
        resetForm: () =>
          set({
            formData: initialFormData,
            activeTab: "basic",
            completedTabs: {},
            isSubmitting: false,
            isDirty: false,
            validationErrors: {},
          }),
      }),
      {
        name: "course-form-storage",
        partialize: (state) => ({
          formData: state.formData,
          activeTab: state.activeTab,
          completedTabs: state.completedTabs,
        }),
      }
    )
  )
);

// Selectors
export const useFormData = () => useCourseFormStore((state) => state.formData);
export const useActiveTab = () => useCourseFormStore((state) => state.activeTab);
export const useValidationErrors = () => useCourseFormStore((state) => state.validationErrors);
export const useIsSubmitting = () => useCourseFormStore((state) => state.isSubmitting);
export const useIsDirty = () => useCourseFormStore((state) => state.isDirty);
export const useCompletedTabs = () => useCourseFormStore((state) => state.completedTabs);
