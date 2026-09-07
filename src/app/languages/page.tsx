"use client";

import { tutorials } from "@/data/tutorials";
import TutorialCard from "@/components/TutorialCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState, useMemo } from "react";

export default function LanguagesPage() {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  const languages = useMemo(() => {
    const langMap: Record<string, number> = {};
    tutorials.forEach((t) => {
      t.languages.forEach((l) => {
        langMap[l] = (langMap[l] || 0) + 1;
      });
    });
    return Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
  }, []);

  const filteredTutorials = selectedLang
    ? tutorials.filter((t) => t.languages.includes(selectedLang))
    : [];

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
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Browse by Language</h1>
        <p className="max-w-2xl text-lg text-gray-400">
          Explore tutorials organized by programming language
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {languages.map((lang) => (
          <button
            key={lang.name}
            onClick={() => setSelectedLang(selectedLang === lang.name ? null : lang.name)}
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
              selectedLang === lang.name
                ? "border-orange-500 bg-orange-500/10 text-orange-400"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:text-white"
            }`}
          >
            {lang.name}
            <span className="ml-2 text-xs text-gray-500">({lang.count})</span>
          </button>
        ))}
      </div>

      {selectedLang && (
        <div>
          <h2 className="mb-4 text-xl font-semibold">
            {selectedLang} Tutorials ({filteredTutorials.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTutorials.map((tutorial) => (
              <TutorialCard key={tutorial.slug} tutorial={tutorial} />
            ))}
          </div>
        </div>
      )}

      {!selectedLang && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-gray-400">Select a language to see its tutorials</p>
        </div>
      )}
    </div>
  );
}
