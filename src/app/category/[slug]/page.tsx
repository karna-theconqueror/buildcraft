"use client";

import { useParams } from "next/navigation";
import { categories } from "@/data/categories";
import { getTutorialsByCategory } from "@/data/tutorials";
import TutorialCard from "@/components/TutorialCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const category = categories.find((c) => c.slug === slug);
  const allTutorials = getTutorialsByCategory(slug);
  const [difficulty, setDifficulty] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("stars");

  const filtered = allTutorials
    .filter((t) => difficulty === "all" || t.difficulty === difficulty)
    .sort((a, b) => {
      if (sortBy === "stars") return b.stars - a.stars;
      if (sortBy === "time") return parseInt(a.estimatedTime) - parseInt(b.estimatedTime);
      return a.title.localeCompare(b.title);
    });

  if (!category) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Category not found</h1>
          <Link href="/" className="text-orange-400 hover:text-orange-300">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">
          {category.name}
        </h1>
        <p className="max-w-2xl text-lg text-gray-400">
          {category.description}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          {allTutorials.length} tutorial{allTutorials.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Difficulty:</span>
          {["all", "beginner", "intermediate", "advanced"].map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                difficulty === d
                  ? "bg-orange-500 text-white"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {d === "all" ? "All" : d}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Sort:</span>
          {[
            { value: "stars", label: "Popular" },
            { value: "time", label: "Quick" },
            { value: "name", label: "A-Z" },
          ].map((s) => (
            <button
              key={s.value}
              onClick={() => setSortBy(s.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                sortBy === s.value
                  ? "bg-orange-500 text-white"
                  : "bg-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tutorial) => (
            <TutorialCard key={tutorial.slug} tutorial={tutorial} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-gray-400">
            No tutorials in this category yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
