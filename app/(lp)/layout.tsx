import { NavDesktop } from '@/components/ui/NavDesktop'
import { NavMobile } from '@/components/ui/NavMobile'

export default function LPLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavDesktop />
      <NavMobile />
      <main className="flex-1">{children}</main>
      <footer className="bg-ink-primary mt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-inter text-caption uppercase tracking-[0.08em] text-white/40 mb-3">
                Reporting basis
              </p>
              <p className="font-inter text-[13px] leading-relaxed text-white/60">
                Carrying values reflect the last priced round, 409A valuation, or marked-up SAFE
                conversion price where applicable. Figures are unaudited and prepared by the General
                Partner for informational purposes only.
              </p>
            </div>
            <div>
              <p className="font-inter text-caption uppercase tracking-[0.08em] text-white/40 mb-3">
                Confidential
              </p>
              <p className="font-inter text-[13px] leading-relaxed text-white/60">
                For LP and fund administration use only. Do not distribute.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
