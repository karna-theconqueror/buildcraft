import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressStore {
  completedTutorials: string[];
  startedTutorials: string[];
  currentTutorial: string | null;
  completedSteps: Record<string, number[]>;
  startTutorial: (slug: string) => void;
  completeTutorial: (slug: string) => void;
  completeStep: (tutorialSlug: string, stepIndex: number) => void;
  getProgress: () => { completed: number; total: number; percentage: number };
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      completedTutorials: [],
      startedTutorials: [],
      currentTutorial: null,
      completedSteps: {},

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

      getProgress: () => {
        const state = get();
        return {
          completed: state.completedTutorials.length,
          total: 50,
          percentage: Math.round((state.completedTutorials.length / 50) * 100),
        };
      },
    }),
    {
      name: "buildcraft-progress",
    }
  )
);
