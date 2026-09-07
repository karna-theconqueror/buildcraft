"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { useProgressStore } from "@/store/progress";

const EMPTY: number[] = [];

interface StepProgressProps {
  tutorialSlug: string;
  steps: { title: string }[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export default function StepProgress({
  tutorialSlug,
  steps,
  currentStep,
  onStepClick,
}: StepProgressProps) {
  const completedSteps = useProgressStore((s) => s.completedSteps[tutorialSlug] ?? EMPTY);

  return (
    <div className="space-y-1">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(index);
        const isCurrent = index === currentStep;

        return (
          <button
            key={index}
            onClick={() => onStepClick(index)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              isCurrent
                ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {isCompleted ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
            ) : (
              <Circle
                className={`h-4 w-4 shrink-0 ${
                  isCurrent ? "text-orange-500" : "text-gray-600"
                }`}
              />
            )}
            <span className="truncate">{step.title}</span>
          </button>
        );
      })}
    </div>
  );
}
