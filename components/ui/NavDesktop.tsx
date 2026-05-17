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
      <div className="flex items-center h-full max-w-7xl mx-auto px-8">
        {/* Logo, far left */}
        <Link href="/dashboard" aria-label="New Era Ventures — home" className="shrink-0">
          <Logo className="h-9 w-auto text-ink-primary" />
        </Link>

        {/* Nav links, centered in remaining space */}
        <nav aria-label="Main navigation" className="flex-1 flex items-center justify-center gap-8">
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

        {/* Avatar, far right */}
        <div
          className="h-8 w-8 rounded-full bg-surface-warm border border-border-hairline shrink-0"
          aria-hidden="true"
        />
      </div>
    </header>
  )
}
