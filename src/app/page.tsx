"use client";

import { useSearchParams } from "next/navigation";
import { categories } from "@/data/categories";
import { tutorials, searchTutorials } from "@/data/tutorials";
import { learningPaths } from "@/data/paths";
import CategoryCard from "@/components/CategoryCard";
import TutorialCard from "@/components/TutorialCard";
import ProgressBar from "@/components/ProgressBar";
import SearchResults from "@/components/SearchResults";
import Link from "next/link";
import { Suspense } from "react";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  Zap,
  BookOpen,
} from "lucide-react";

function HomePage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  if (searchQuery) {
    const results = searchTutorials(searchQuery);
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SearchResults tutorials={results} query={searchQuery} />
      </div>
    );
  }

  const trendingTutorials = [...tutorials]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
          <Sparkles className="h-4 w-4" />
          Interactive coding tutorials
        </div>
        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Build Your Own{" "}
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            X
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
          Master programming by recreating your favorite technologies from
          scratch. Interactive tutorials with live code editors, auto-grading,
          and progress tracking.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/paths"
            className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600 transition-colors"
          >
            <BookOpen className="h-5 w-5" />
            Start Learning
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-medium text-white hover:bg-white/10 transition-colors"
          >
            Star on GitHub
          </a>
        </div>
      </section>

      {/* Progress Section */}
      <section className="mb-16">
        <ProgressBar />
      </section>

      {/* Stats Section */}
      <section className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
          <Zap className="mx-auto mb-2 h-8 w-8 text-orange-500" />
          <div className="text-3xl font-bold">{tutorials.length}+</div>
          <div className="text-sm text-gray-400">Tutorials</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
          <BookOpen className="mx-auto mb-2 h-8 w-8 text-blue-500" />
          <div className="text-3xl font-bold">{categories.length}</div>
          <div className="text-sm text-gray-400">Categories</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
          <TrendingUp className="mx-auto mb-2 h-8 w-8 text-green-500" />
          <div className="text-3xl font-bold">{learningPaths.length}</div>
          <div className="text-sm text-gray-400">Learning Paths</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
          <Sparkles className="mx-auto mb-2 h-8 w-8 text-purple-500" />
          <div className="text-3xl font-bold">10+</div>
          <div className="text-sm text-gray-400">Languages</div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Learning Paths</h2>
            <p className="text-gray-400">
              Structured curriculum from beginner to advanced
            </p>
          </div>
          <Link
            href="/paths"
            className="flex items-center gap-1 text-sm text-orange-400 hover:text-orange-300 transition-colors"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {learningPaths.slice(0, 3).map((path) => (
            <Link
              key={path.slug}
              href={`/paths#${path.slug}`}
              className="group rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 transition-all hover:border-white/20 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                {path.name}
              </h3>
              <p className="text-sm text-gray-400">{path.description}</p>
              <div className="mt-4 text-xs text-orange-400">
                {path.tutorials.length} tutorials
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Categories</h2>
          <p className="text-gray-400">
            Explore tutorials by technology domain
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      {/* Trending Tutorials */}
      <section className="mb-16">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Trending Tutorials</h2>
            <p className="text-gray-400">Most popular tutorials this week</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trendingTutorials.map((tutorial) => (
            <TutorialCard key={tutorial.slug} tutorial={tutorial} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-orange-500/10 to-pink-500/10 p-8 text-center sm:p-12">
        <h2 className="mb-4 text-3xl font-bold">Ready to Build?</h2>
        <p className="mx-auto mb-6 max-w-xl text-gray-400">
          Join thousands of developers mastering programming by building real
          projects from scratch.
        </p>
        <Link
          href="/paths"
          className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600 transition-colors"
        >
          Start Your Journey
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-gray-400">Loading...</div>}>
      <HomePage />
    </Suspense>
  );
}
