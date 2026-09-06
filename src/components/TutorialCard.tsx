"use client";

import Link from "next/link";
import { Tutorial } from "@/types";
import { Star, Clock, Code2, CheckCircle2 } from "lucide-react";
import { useProgressStore } from "@/store/progress";
import { getDifficultyColor } from "@/lib/utils";

export default function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  const completedTutorials = useProgressStore((s) => s.completedTutorials);
  const isCompleted = completedTutorials.includes(tutorial.slug);

  return (
    <Link
      href={`/tutorial/${tutorial.slug}`}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 transition-all hover:border-orange-500/50 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-orange-500/10"
    >
      {isCompleted && (
        <div className="absolute right-3 top-3">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        </div>
      )}

      <div className="mb-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium ${getDifficultyColor(
            tutorial.difficulty
          )}`}
        >
          {tutorial.difficulty}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="h-3 w-3" />
          {tutorial.estimatedTime}
        </span>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
        {tutorial.title}
      </h3>
      <p className="mb-4 text-sm text-gray-400 line-clamp-2">
        {tutorial.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-gray-500" />
          <span className="text-xs text-gray-400">
            {tutorial.languages.slice(0, 2).join(", ")}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Star className="h-3 w-3 text-yellow-500" />
          {tutorial.stars.toLocaleString()}
        </div>
      </div>
    </Link>
  );
}
