import { CardSkeleton, CategorySkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <div className="mx-auto mb-6 h-8 w-48 animate-pulse rounded-full bg-white/10" />
        <div className="mx-auto mb-4 h-12 w-96 animate-pulse rounded bg-white/10" />
        <div className="mx-auto h-5 w-64 animate-pulse rounded bg-white/10" />
      </div>
      <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-white/5" />
        ))}
      </div>
      <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
