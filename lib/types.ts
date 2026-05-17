/**
 * TypeScript types for the NEV LP Portal data model.
 * Mirrors the Postgres schema defined in PRD §7.
 * Use `type` not `interface`. Snake_case column names per convention.
 */

export type Profile = {
  id: string
  created_at: string
  updated_at: string
  full_name: string
  email: string
  role: 'lp' | 'admin'
  commitment_amount: number | null
  committed_at: string | null
}

export type Fund = {
  id: string
  created_at: string
  updated_at: string
  name: string
  vintage: number
  total_committed: number
  total_called: number
  total_deployed: number
  total_current_value: number
  as_of_date: string
  last_updated: string
}

export type PortfolioCompany = {
  id: string
  created_at: string
  updated_at: string
  slug: string
  name: string
  logo_url: string | null
  one_liner: string | null
  sector: string | null
  website: string | null
  stage: 'Pre-Seed' | 'First Check' | 'Seed' | 'Series A'
  status: 'active' | 'exited' | 'written_off'
  thesis: string | null
  invested_date: string
  check_size: number
  entry_valuation: number
  ownership_pct: number
  pro_rata_rights: boolean
  current_valuation: number
  current_multiple: number
}

export type ValuationEvent = {
  id: string
  created_at: string
  updated_at: string
  company_id: string
  event_date: string
  event_type: 'markup' | 'markdown' | 'exit' | 'writedown' | 'initial'
  new_company_valuation: number
  new_position_value: number
  multiple: number
  note: string | null
}

export type CoInvestor = {
  id: string
  created_at: string
  updated_at: string
  company_id: string
  name: string
  order: number
}

export type Update = {
  id: string
  created_at: string
  updated_at: string
  slug: string
  title: string
  subtitle: string | null
  body_md: string
  excerpt: string | null
  author_id: string
  related_company_id: string | null
  pdf_url: string | null
  status: 'draft' | 'published'
  published_at: string | null
}
