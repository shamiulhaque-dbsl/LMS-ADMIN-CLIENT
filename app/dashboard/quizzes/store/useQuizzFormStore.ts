import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface CourseFormData {
  // Basic Info
  title: string;
  description: string;
  shortDescription: string;

  // Info
  category: string;
  level: "beginner" | "intermediate" | "advanced" | "";
  language: string;
  duration: string;

  // Media
  thumbnail: string;
  previewVideo: string;
  images: string[];

  // Pricing
  price: string;
  discountPrice: string;
  currency: string;

  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

export interface ValidationErrors {
  [key: string]: string;
}

interface CompletedTabs {
  [key: string]: boolean;
}

interface CourseFormState {
  // Form Data
  formData: CourseFormData;

  // UI State
  activeTab: string;
  validationErrors: ValidationErrors;
  completedTabs: CompletedTabs;
  isSubmitting: boolean;
  isDirty: boolean;

  // Actions
  setFormData: (data: Partial<CourseFormData>) => void;
  updateField: <K extends keyof CourseFormData>(field: K, value: CourseFormData[K]) => void;
  setActiveTab: (tab: string) => void;
  setValidationErrors: (errors: ValidationErrors) => void;
  clearValidationErrors: () => void;
  markTabCompleted: (tabId: string) => void;
  setIsSubmitting: (value: boolean) => void;
  //   validateCurrentTab: () => { success: boolean; errors: ValidationErrors };
  //   submitForm: () => Promise<{ success: boolean; data?: CourseFormData; errors?: ValidationErrors }>;
  resetForm: () => void;
}

const initialFormData: CourseFormData = {
  // Basic
  title: "",
  description: "",
  shortDescription: "",

  // Info
  category: "",
  level: "",
  language: "",
  duration: "",

  // Media
  thumbnail: "",
  previewVideo: "",
  images: [],

  // Pricing
  price: "",
  discountPrice: "",
  currency: "USD",

  // SEO
  metaTitle: "",
  metaDescription: "",
  metaKeywords: [],
};

export const useCourseFormStore = create<CourseFormState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        formData: initialFormData,
        activeTab: "basic",
        validationErrors: {},
        completedTabs: {},
        isSubmitting: false,
        isDirty: false,

        // Actions
        setFormData: (data) =>
          set((state) => ({
            formData: { ...state.formData, ...data },
            isDirty: true,
          })),

        updateField: <K extends keyof CourseFormData>(field: K, value: CourseFormData[K]) =>
          set((state) => {
            // Copy current validation errors
            const newErrors: ValidationErrors = { ...state.validationErrors };

            // Remove the field error if it exists
            if (newErrors[field as string]) {
              delete newErrors[field as string];
            }

            return {
              formData: { ...state.formData, [field]: value },
              isDirty: true,
              validationErrors: newErrors,
            };
          }),

        setActiveTab: (tab) => set({ activeTab: tab }),

        setValidationErrors: (errors) => set({ validationErrors: errors }),

        clearValidationErrors: () => set({ validationErrors: {} }),

        markTabCompleted: (tabId) =>
          set((state) => ({
            completedTabs: { ...state.completedTabs, [tabId]: true },
          })),

        setIsSubmitting: (value) => set({ isSubmitting: value }),

        resetForm: () =>
          set({
            formData: initialFormData,
            activeTab: "basic",
            validationErrors: {},
            completedTabs: {},
            isSubmitting: false,
            isDirty: false,
          }),
      }),
      {
        name: "course-form-storage", // localStorage key
        partialize: (state) => ({
          formData: state.formData,
          activeTab: state.activeTab,
          completedTabs: state.completedTabs,
        }),
      }
    ),
    { name: "CourseFormStore" }
  )
);

// Selectors
export const useFormData = () => useCourseFormStore((state) => state.formData);
export const useActiveTab = () => useCourseFormStore((state) => state.activeTab);
export const useValidationErrors = () => useCourseFormStore((state) => state.validationErrors);
export const useIsSubmitting = () => useCourseFormStore((state) => state.isSubmitting);
export const useIsDirty = () => useCourseFormStore((state) => state.isDirty);
export const useCompletedTabs = () => useCourseFormStore((state) => state.completedTabs);
