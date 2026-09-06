"use client";

import { Tutorial } from "@/types";
import TutorialCard from "./TutorialCard";
import { Search, X } from "lucide-react";
import Link from "next/link";

export default function SearchResults({
  tutorials,
  query,
}: {
  tutorials: Tutorial[];
  query: string;
}) {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-orange-500" />
          <h2 className="text-xl font-semibold">
            Search results for &ldquo;{query}&rdquo;
          </h2>
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-400">
            {tutorials.length} found
          </span>
        </div>
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
          Clear
        </Link>
      </div>
      {tutorials.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tutorials.map((tutorial) => (
            <TutorialCard key={tutorial.slug} tutorial={tutorial} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <Search className="mx-auto mb-4 h-12 w-12 text-gray-600" />
          <p className="text-gray-400">
            No tutorials found. Try a different search term.
          </p>
        </div>
      )}
    </div>
  );
}
