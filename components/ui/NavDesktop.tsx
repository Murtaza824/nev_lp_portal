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
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8">
        {/* Left — Logo */}
        <Link href="/dashboard" aria-label="New Era Ventures — home">
          <Logo className="h-9 w-auto text-ink-primary" />
        </Link>

        {/* Center — nav links */}
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-body font-inter text-ink-secondary hover:text-ink-primary transition-colors duration-200 ease-out"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right — avatar placeholder (auth wiring in Phase 2) */}
        <div
          className="h-8 w-8 rounded-full bg-surface-warm border border-border-hairline"
          aria-hidden="true"
        />
      </div>
    </header>
  )
}
