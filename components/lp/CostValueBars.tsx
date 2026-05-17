import type { PortfolioCompany } from '@/lib/types'
import { formatMult } from '@/lib/format'

interface CostValueBarsProps {
  companies: PortfolioCompany[]
}

export function CostValueBars({ companies }: CostValueBarsProps) {
  // Sort by multiple descending
  const sorted = [...companies].sort(
    (a, b) => (b.current_multiple ?? 1) - (a.current_multiple ?? 1)
  )

  const maxCurrentValue = Math.max(
    ...sorted.map((c) => (c.check_size ?? 0) * (c.current_multiple ?? 1)),
    1 // prevent divide by zero
  )

  return (
    <section className="mt-16 md:mt-[64px]">
      <h2 className="font-fraunces text-[22px] leading-tight text-ink-primary mb-1 md:text-[22px]">
        Cost vs. current value
      </h2>
      <p className="font-inter text-caption text-ink-secondary mb-6">
        Each row: capital invested, then current carrying value. Markups extend past the cost line.
      </p>

      <div className="flex flex-col gap-2">
        {sorted.map((company) => {
          const checkSize = company.check_size ?? 0
          const multiple = company.current_multiple ?? 1
          const currentValue = checkSize * multiple
          const costPct = (checkSize / maxCurrentValue) * 100
          const deltaPct = Math.max(0, ((currentValue - checkSize) / maxCurrentValue) * 100)

          return (
            <div key={company.id} className="flex items-center gap-3">
              {/* Company name */}
              <span className="w-[100px] shrink-0 font-inter text-body text-ink-primary truncate">
                {company.name}
              </span>

              {/* Bar */}
              <div className="flex flex-1 h-5 items-stretch rounded-sm overflow-hidden">
                {/* Cost segment */}
                <div
                  className="bg-ink-secondary/40 h-full"
                  style={{ width: `${costPct}%` }}
                  aria-hidden="true"
                />
                {/* Markup delta */}
                {deltaPct > 0 && (
                  <div
                    className="bg-accent-positive h-full"
                    style={{ width: `${deltaPct}%` }}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Multiple readout */}
              <span
                className={`w-[60px] shrink-0 text-right font-mono text-mono-sm ${multiple > 1.0 ? 'text-accent-positive' : 'text-ink-secondary'}`}
              >
                {formatMult(multiple)}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
