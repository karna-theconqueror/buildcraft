"use client";

import { learningPaths } from "@/data/paths";
import { getTutorialBySlug } from "@/data/tutorials";
import { useProgressStore } from "@/store/progress";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Server,
  Brain,
  Layers,
  Cpu,
  Gamepad2,
  Package,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Server: <Server className="h-6 w-6" />,
  Brain: <Brain className="h-6 w-6" />,
  Layers: <Layers className="h-6 w-6" />,
  Cpu: <Cpu className="h-6 w-6" />,
  Gamepad2: <Gamepad2 className="h-6 w-6" />,
  Package: <Package className="h-6 w-6" />,
};

export default function PathsPage() {
  const completedTutorials = useProgressStore((s) => s.completedTutorials);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold">Learning Paths</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-400">
          Structured curricula to take you from beginner to expert. Each path
          builds on the previous tutorial.
        </p>
      </div>

      <div className="space-y-8">
        {learningPaths.map((path) => {
          const completedCount = path.tutorials.filter((t) =>
            completedTutorials.includes(t)
          ).length;
          const percentage = Math.round(
            (completedCount / path.tutorials.length) * 100
          );

          return (
            <div
              key={path.slug}
              id={path.slug}
              className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
            >
              {/* Path Header */}
              <div className="border-b border-white/10 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`rounded-xl bg-gradient-to-br ${path.color} p-3 text-white`}
                    >
                      {iconMap[path.icon] || <Server className="h-6 w-6" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{path.name}</h2>
                      <p className="text-gray-400">{path.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-400">
                      {percentage}%
                    </div>
                    <div className="text-sm text-gray-400">
                      {completedCount}/{path.tutorials.length} completed
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${path.color} transition-all`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              {/* Tutorials List */}
              <div className="divide-y divide-white/5">
                {path.tutorials.map((tutorialSlug, index) => {
                  const tutorial = getTutorialBySlug(tutorialSlug);
                  const isCompleted = completedTutorials.includes(tutorialSlug);

                  return (
                    <div
                      key={tutorialSlug}
                      className="flex items-center gap-4 px-6 py-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-400">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        {tutorial ? (
                          <Link
                            href={`/tutorial/${tutorialSlug}`}
                            className="group flex items-center gap-2"
                          >
                            <span
                              className={`font-medium ${
                                isCompleted
                                  ? "text-green-400"
                                  : "text-white group-hover:text-orange-400"
                              } transition-colors`}
                            >
                              {tutorial.title}
                            </span>
                            <ArrowRight className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ) : (
                          <span className="text-gray-500">
                            {tutorialSlug.replace(/-/g, " ")}
                          </span>
                        )}
                        {tutorial && (
                          <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                            <span>{tutorial.estimatedTime}</span>
                            <span>•</span>
                            <span className="capitalize">
                              {tutorial.difficulty}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <Circle className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
