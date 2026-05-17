import { NavDesktop } from '@/components/ui/NavDesktop'
import { NavMobile } from '@/components/ui/NavMobile'

export default function LPLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavDesktop />
      <NavMobile />
      <main className="animate-fade-up">{children}</main>
    </>
  )
}
