import { create } from "zustand";
import type { ID, CourseLesson, CourseModule } from "../types";

interface CurriculumState {
  sections: CourseModule[];

  setSections: (modules: CourseModule[]) => void;
  addLesson: (sectionId: ID, lesson: CourseLesson) => void;
  deleteLesson: (sectionId: ID, lessonId: string | number) => void;
}

export const useCurriculumStore = create<CurriculumState>((set) => ({
  sections: [],

  setSections: (modules) => set({ sections: modules }),

  addLesson: (sectionId, lesson) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId ? { ...s, lessons: [...s.lessons!, lesson] } : s
      ),
    })),

  deleteLesson: (sectionId, lessonId) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons?.filter((l) => l.id !== lessonId),
            }
          : s
      ),
    })),
}));
