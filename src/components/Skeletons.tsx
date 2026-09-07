export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="mb-3 flex gap-2">
        <div className="h-5 w-16 rounded bg-white/10" />
        <div className="h-5 w-12 rounded bg-white/10" />
      </div>
      <div className="mb-2 h-5 w-3/4 rounded bg-white/10" />
      <div className="mb-4 h-4 w-full rounded bg-white/10" />
      <div className="flex justify-between">
        <div className="h-4 w-20 rounded bg-white/10" />
        <div className="h-4 w-12 rounded bg-white/10" />
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-4 h-12 w-12 rounded-xl bg-white/10" />
      <div className="mb-2 h-5 w-32 rounded bg-white/10" />
      <div className="h-4 w-full rounded bg-white/10" />
    </div>
  );
}

export function TutorialPageSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 h-4 w-32 rounded bg-white/10" />
      <div className="mb-8">
        <div className="mb-4 h-8 w-64 rounded bg-white/10" />
        <div className="h-5 w-96 rounded bg-white/10" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="space-y-4">
          <div className="h-48 rounded-xl bg-white/5" />
          <div className="h-24 rounded-xl bg-white/5" />
        </div>
        <div className="space-y-6">
          <div className="h-48 rounded-xl bg-white/5" />
          <div className="h-[400px] rounded-xl bg-white/5" />
        </div>
      </div>
    </div>
  );
}
