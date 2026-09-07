"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <div className="mb-6 text-8xl font-bold text-orange-500/20">404</div>
        <h1 className="mb-4 text-3xl font-bold">Page Not Found</h1>
        <p className="mb-8 max-w-md text-gray-400">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600 transition-colors"
          >
            <Home className="h-5 w-5" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 font-medium text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
