// Loading skeleton components for better UX

export function ArticleCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="h-48 skeleton"></div>
      <div className="p-6 space-y-4">
        <div className="h-4 skeleton w-20 rounded"></div>
        <div className="h-6 skeleton w-full rounded"></div>
        <div className="h-4 skeleton w-3/4 rounded"></div>
        <div className="flex items-center justify-between pt-4">
          <div className="h-4 skeleton w-24 rounded"></div>
          <div className="h-4 skeleton w-16 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ArticleCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ArticleDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <div className="h-8 skeleton w-2/3 rounded"></div>
      <div className="h-6 skeleton w-1/2 rounded"></div>
      <div className="h-64 skeleton rounded-xl"></div>
      <div className="space-y-4">
        <div className="h-4 skeleton w-full rounded"></div>
        <div className="h-4 skeleton w-full rounded"></div>
        <div className="h-4 skeleton w-3/4 rounded"></div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 skeleton rounded-full"></div>
        <div className="h-6 skeleton w-32 rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 skeleton w-full rounded"></div>
        <div className="h-4 skeleton w-2/3 rounded"></div>
      </div>
    </div>
  );
}
