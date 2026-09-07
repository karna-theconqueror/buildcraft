"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { searchTutorials } from "@/data/tutorials";

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  const results = query.length >= 2 ? searchTutorials(query).slice(0, 8) : [];

  const handleSelect = (slug: string) => {
    setOpen(false);
    routerRef.current.push(`/tutorial/${slug}`);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-gray-900 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tutorials..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-gray-400">
            ESC
          </kbd>
        </div>
        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((t) => (
              <button
                key={t.slug}
                onClick={() => handleSelect(t.slug)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-white/5 transition-colors"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{t.title}</div>
                  <div className="text-xs text-gray-400">{t.category} · {t.difficulty}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-500" />
              </button>
            ))}
          </div>
        )}
        {query.length >= 2 && results.length === 0 && (
          <div className="p-6 text-center text-sm text-gray-400">
            No tutorials found for &quot;{query}&quot;
          </div>
        )}
        {query.length < 2 && (
          <div className="p-6 text-center text-sm text-gray-400">
            Type at least 2 characters to search
          </div>
        )}
      </div>
    </div>
  );
}
