export default function PortfolioLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      {/* Page header */}
      <div className="mb-10">
        <div className="h-8 w-48 rounded bg-surface-warm animate-pulse mb-2" />
        <div className="h-4 w-40 rounded bg-surface-warm animate-pulse" />
      </div>

      {/* Desktop table skeleton */}
      <div className="hidden md:block">
        {/* Header row */}
        <div className="flex gap-4 border-b border-border-hairline pb-3 mb-3">
          {[180, 100, 80, 90, 90, 80].map((w, i) => (
            <div
              key={i}
              className="h-3 rounded bg-surface-warm animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>
        {/* Data rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex gap-4 py-4 border-b border-border-hairline">
            {[180, 100, 80, 90, 90, 80].map((w, j) => (
              <div
                key={j}
                className="h-4 rounded bg-surface-warm animate-pulse"
                style={{ width: w }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile card skeleton */}
      <div className="block md:hidden flex flex-col gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-card border border-border-hairline p-4">
            <div className="h-5 w-32 rounded bg-surface-warm animate-pulse mb-2" />
            <div className="h-3 w-20 rounded bg-surface-warm animate-pulse mb-3" />
            <div className="flex justify-between">
              <div className="h-4 w-20 rounded bg-surface-warm animate-pulse" />
              <div className="h-4 w-16 rounded bg-surface-warm animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
