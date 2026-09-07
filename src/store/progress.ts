import { create } from "zustand";
import { persist } from "zustand/middleware";
import { tutorials } from "@/data/tutorials";

interface ProgressStore {
  completedTutorials: string[];
  startedTutorials: string[];
  currentTutorial: string | null;
  completedSteps: Record<string, number[]>;
  bookmarkedTutorials: string[];
  startTutorial: (slug: string) => void;
  completeTutorial: (slug: string) => void;
  completeStep: (tutorialSlug: string, stepIndex: number) => void;
  toggleBookmark: (slug: string) => void;
  resetProgress: () => void;
  getProgress: () => { completed: number; total: number; percentage: number };
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedTutorials: [],
      startedTutorials: [],
      currentTutorial: null,
      completedSteps: {},
      bookmarkedTutorials: [],

      startTutorial: (slug) =>
        set((state) => ({
          startedTutorials: state.startedTutorials.includes(slug)
            ? state.startedTutorials
            : [...state.startedTutorials, slug],
          currentTutorial: slug,
        })),

      completeTutorial: (slug) =>
        set((state) => ({
          completedTutorials: state.completedTutorials.includes(slug)
            ? state.completedTutorials
            : [...state.completedTutorials, slug],
        })),

      completeStep: (tutorialSlug, stepIndex) =>
        set((state) => {
          const current = state.completedSteps[tutorialSlug] || [];
          if (current.includes(stepIndex)) return state;
          return {
            completedSteps: {
              ...state.completedSteps,
              [tutorialSlug]: [...current, stepIndex],
            },
          };
        }),

      toggleBookmark: (slug) =>
        set((state) => ({
          bookmarkedTutorials: state.bookmarkedTutorials.includes(slug)
            ? state.bookmarkedTutorials.filter((s) => s !== slug)
            : [...state.bookmarkedTutorials, slug],
        })),

      resetProgress: () =>
        set({
          completedTutorials: [],
          startedTutorials: [],
          currentTutorial: null,
          completedSteps: {},
        }),

      getProgress: () => {
        const state = get();
        const total = tutorials.length;
        return {
          completed: state.completedTutorials.length,
          total,
          percentage: total > 0 ? Math.round((state.completedTutorials.length / total) * 100) : 0,
        };
      },
    }),
    {
      name: "buildcraft-progress",
    }
  )
);
