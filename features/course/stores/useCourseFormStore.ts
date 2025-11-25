import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { CourseFormData, CourseMetadataFormatted } from "../types";
import type { Category } from "@/features/category/types";

export interface ValidationErrors {
  [key: string]: string;
}

interface CourseFormState {
  formData: CourseFormData;
  mode: "create" | "edit";

  activeTabCreate: string;
  activeTabEdit: string;
  activeTab: (s: CourseFormState) => string;

  completedTabs: Record<string, boolean>;
  validationErrors: ValidationErrors;
  isSubmitting: boolean;
  isDirty: boolean;
  courseId?: string | number;

  categories: Category[];
  courseMetadata: CourseMetadataFormatted | null;

  setCourseId(id: string | number): void;
  setFormData(data: Partial<CourseFormData>): void;

  setMode(mode: "create" | "edit"): void;
  setActiveTab(tab: string): void;

  markTabCompleted(tab: string): void;
  clearValidationErrors(): void;

  setIsSubmitting(v: boolean): void;
  setCategories(categories: Category[]): void;
  setCourseMetadata(metadata: CourseMetadataFormatted | null): void;

  resetForm(): void;
}

export const INITIAL: CourseFormData = {
  title: "",
  description: "",
  longDescription: "",
  category: null,
  level: "",
  courseType: "",
  status: "",

  thumbnail: "",
  videoDemoSource: "youtube",
  videoDemoUrl: "",

  durationHours: undefined,
  requirements: [],
  learningOutcomes: [],
  targetAudience: [],
  faqs: [],
  projects: [],
  moneyBackDays: undefined,

  price: 0,
  discountPrice: 0,
  isFree: false,
  numberOfMonths: 0,
  expiryPeriod: "lifetime",

  courseForum: false,
  downloadableContent: false,
  certificateAvailable: false,

  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
};

export const useCourseFormStore = create<CourseFormState>()(
  devtools(
    persist(
      (set, get) => ({
        formData: INITIAL,
        mode: "create",

        activeTabCreate: "basic",
        activeTabEdit: "basic",

        activeTab: (s) => (s.mode === "create" ? s.activeTabCreate : s.activeTabEdit),

        completedTabs: {},
        validationErrors: {},
        isSubmitting: false,
        isDirty: false,
        courseId: undefined,

        categories: [],
        courseMetadata: null,

        setCourseId: (id) => set({ courseId: id }),

        setMode: (mode) => set({ mode }),

        setFormData: (data) =>
          set((s) => ({
            formData: { ...s.formData, ...data },
            isDirty: true,
          })),

        setActiveTab: (tab) =>
          set((s) => (s.mode === "create" ? { activeTabCreate: tab } : { activeTabEdit: tab })),

        markTabCompleted: (tab) =>
          set((s) => ({
            completedTabs: { ...s.completedTabs, [tab]: true },
          })),

        clearValidationErrors: () => set({ validationErrors: {} }),
        setIsSubmitting: (v) => set({ isSubmitting: v }),
        setCategories: (categories) => set({ categories }),
        setCourseMetadata: (metadata) => set({ courseMetadata: metadata }),

        resetForm: () =>
          set((s) => ({
            formData: INITIAL,
            activeTabCreate: "basic",
            activeTabEdit: s.activeTabEdit === "finish" ? "basic" : s.activeTabEdit, // keep edit progress intact
            completedTabs: {},
            validationErrors: {},
            isSubmitting: false,
            isDirty: false,
          })),
      }),
      {
        name: "course-form-storage",
        partialize: (s) => ({
          formData: s.formData,
          mode: s.mode,
          activeTabCreate: s.activeTabCreate,
          activeTabEdit: s.activeTabEdit,
        }),
      }
    )
  )
);

// Selectors
export const useFormData = () => useCourseFormStore((s) => s.formData);
export const useActiveTab = () => useCourseFormStore((s) => s.activeTab(s));
export const useMode = () => useCourseFormStore((s) => s.mode);
