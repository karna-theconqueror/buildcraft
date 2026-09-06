"use client";

import { useProgressStore } from "@/store/progress";

export default function ProgressBar() {
  const completedTutorials = useProgressStore((s) => s.completedTutorials);
  const completed = completedTutorials.length;
  const total = 50;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-300">Your Progress</h3>
        <span className="text-sm text-orange-500 font-semibold">
          {percentage}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-400">
        {completed} of {total} tutorials completed
      </p>
    </div>
  );
}
