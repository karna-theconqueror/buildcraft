import { CardSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 h-4 w-32 animate-pulse rounded bg-white/10" />
      <div className="mb-8">
        <div className="mb-4 h-8 w-64 animate-pulse rounded bg-white/10" />
        <div className="h-5 w-96 animate-pulse rounded bg-white/10" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
