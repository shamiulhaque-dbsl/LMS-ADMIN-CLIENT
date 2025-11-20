import { create } from "zustand";

export interface CurriculumLesson {
  id: string | number;
  title: string;
  description?: string;
}

export interface CurriculumSection {
  id: string | number;
  title: string;
  description?: string;
  lessons: CurriculumLesson[];
  sort_order: number;
}

interface CurriculumState {
  sections: CurriculumSection[];

  setSections: (modules: CurriculumSection[]) => void;
  addSection: (title: string) => void;
  updateSection: (id: string | number, data: Partial<CurriculumSection>) => void;
  deleteSection: (id: string | number) => void;

  addLesson: (sectionId: string | number, lesson: CurriculumLesson) => void;
  deleteLesson: (sectionId: string | number, lessonId: string | number) => void;
}

export const useCurriculumStore = create<CurriculumState>((set) => ({
  sections: [],

  setSections: (modules) => set({ sections: modules }),

  addSection: (title) =>
    set((state) => ({
      sections: [
        ...state.sections,
        {
          id: crypto.randomUUID(),
          title,
          description: "",
          lessons: [],
          sort_order: state.sections.length + 1,
        },
      ],
    })),

  updateSection: (id, data) =>
    set((state) => ({
      sections: state.sections.map((s) => (s.id === id ? { ...s, ...data } : s)),
    })),

  deleteSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((s) => s.id !== id),
    })),

  addLesson: (sectionId, lesson) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId ? { ...s, lessons: [...s.lessons, lesson] } : s
      ),
    })),

  deleteLesson: (sectionId, lessonId) =>
    set((state) => ({
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              lessons: s.lessons.filter((l) => l.id !== lessonId),
            }
          : s
      ),
    })),
}));
