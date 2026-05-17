import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/updates', label: 'Updates' },
]

export function NavDesktop() {
  return (
    <header className="sticky top-0 z-50 hidden h-16 bg-canvas border-b border-border-hairline md:flex">
      <div className="grid grid-cols-3 items-center h-full max-w-7xl mx-auto px-8">
        {/* Column 1: logo, left-aligned */}
        <div className="flex items-center">
          <Link href="/dashboard" aria-label="New Era Ventures — home">
            <Logo className="h-9 w-auto text-ink-primary" />
          </Link>
        </div>

        {/* Column 2: nav links, centered */}
        <nav aria-label="Main navigation" className="flex items-center justify-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body font-inter text-ink-secondary hover:text-ink-primary transition-colors duration-200 ease-out"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Column 3: avatar placeholder (auth wiring in Phase 2), right-aligned */}
        <div className="flex items-center justify-end">
          <div
            className="h-8 w-8 rounded-full bg-surface-warm border border-border-hairline"
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  )
}
