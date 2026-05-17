import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { PortfolioTable } from '@/components/lp/PortfolioTable'
import { PortfolioMobileList } from '@/components/lp/PortfolioMobileList'
import { CostValueBars } from '@/components/lp/CostValueBars'
import type { PortfolioCompany, CoInvestor } from '@/lib/types'

export default async function PortfolioPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [companiesResult, coInvestorsResult] = await Promise.all([
    supabase
      .from('portfolio_companies')
      .select('*')
      .eq('status', 'active')
      .order('invested_date', { ascending: false }),
    supabase.from('co_investors').select('*').order('order'),
  ])

  const companies = (companiesResult.data ?? []) as PortfolioCompany[]
  const allCoInvestors = (coInvestorsResult.data ?? []) as CoInvestor[]

  // Group co-investors by company_id
  const coInvestorMap: Record<string, CoInvestor[]> = {}
  for (const ci of allCoInvestors) {
    if (!coInvestorMap[ci.company_id]) {
      coInvestorMap[ci.company_id] = []
    }
    coInvestorMap[ci.company_id].push(ci)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 animate-fade-up">
      {/* Desktop table — shown md and above */}
      <div className="hidden md:block">
        <PortfolioTable companies={companies} coInvestors={coInvestorMap} />
      </div>

      {/* Mobile card list — shown below md */}
      <div className="block md:hidden">
        <PortfolioMobileList companies={companies} />
      </div>

      {/* Cost vs. value bars — both viewports */}
      <CostValueBars companies={companies} />
    </div>
  )
}
