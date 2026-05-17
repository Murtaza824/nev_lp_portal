/**
 * Supabase Database type wrapper.
 * Row types are the source of truth — lib/types.ts re-exports aliases from here.
 */

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          role: 'lp' | 'admin'
          commitment_amount: number | null
          committed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          role?: 'lp' | 'admin'
          commitment_amount?: number | null
          committed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          role?: 'lp' | 'admin'
          commitment_amount?: number | null
          committed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      fund: {
        Row: {
          id: string
          name: string
          vintage: number | null
          total_committed: number | null
          total_called: number | null
          total_deployed: number | null
          total_current_value: number | null
          as_of_date: string | null
          last_updated: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string
          vintage?: number | null
          total_committed?: number | null
          total_called?: number | null
          total_deployed?: number | null
          total_current_value?: number | null
          as_of_date?: string | null
          last_updated?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          vintage?: number | null
          total_committed?: number | null
          total_called?: number | null
          total_deployed?: number | null
          total_current_value?: number | null
          as_of_date?: string | null
          last_updated?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      portfolio_companies: {
        Row: {
          id: string
          slug: string
          name: string
          logo_url: string | null
          one_liner: string | null
          sector: string | null
          website: string | null
          stage: 'Pre-Seed' | 'First Check' | 'Seed' | 'Series A' | null
          status: 'active' | 'exited' | 'written_off'
          thesis: string | null
          invested_date: string | null
          check_size: number | null
          entry_valuation: number | null
          ownership_pct: number | null
          pro_rata_rights: boolean
          current_valuation: number | null
          current_multiple: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          logo_url?: string | null
          one_liner?: string | null
          sector?: string | null
          website?: string | null
          stage?: 'Pre-Seed' | 'First Check' | 'Seed' | 'Series A' | null
          status?: 'active' | 'exited' | 'written_off'
          thesis?: string | null
          invested_date?: string | null
          check_size?: number | null
          entry_valuation?: number | null
          ownership_pct?: number | null
          pro_rata_rights?: boolean
          current_valuation?: number | null
          current_multiple?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          logo_url?: string | null
          one_liner?: string | null
          sector?: string | null
          website?: string | null
          stage?: 'Pre-Seed' | 'First Check' | 'Seed' | 'Series A' | null
          status?: 'active' | 'exited' | 'written_off'
          thesis?: string | null
          invested_date?: string | null
          check_size?: number | null
          entry_valuation?: number | null
          ownership_pct?: number | null
          pro_rata_rights?: boolean
          current_valuation?: number | null
          current_multiple?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      valuation_events: {
        Row: {
          id: string
          company_id: string
          event_date: string
          event_type: 'markup' | 'markdown' | 'exit' | 'writedown' | 'initial' | null
          new_company_valuation: number | null
          new_position_value: number | null
          multiple: number | null
          note: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          event_date: string
          event_type?: 'markup' | 'markdown' | 'exit' | 'writedown' | 'initial' | null
          new_company_valuation?: number | null
          new_position_value?: number | null
          multiple?: number | null
          note?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          event_date?: string
          event_type?: 'markup' | 'markdown' | 'exit' | 'writedown' | 'initial' | null
          new_company_valuation?: number | null
          new_position_value?: number | null
          multiple?: number | null
          note?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      co_investors: {
        Row: {
          id: string
          company_id: string
          name: string
          order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          order?: number
          created_at?: string
          updated_at?: string
        }
      }
      updates: {
        Row: {
          id: string
          slug: string
          title: string
          subtitle: string | null
          body_md: string | null
          excerpt: string | null
          author_id: string | null
          related_company_id: string | null
          pdf_url: string | null
          status: 'draft' | 'published'
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          subtitle?: string | null
          body_md?: string | null
          excerpt?: string | null
          author_id?: string | null
          related_company_id?: string | null
          pdf_url?: string | null
          status?: 'draft' | 'published'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          subtitle?: string | null
          body_md?: string | null
          excerpt?: string | null
          author_id?: string | null
          related_company_id?: string | null
          pdf_url?: string | null
          status?: 'draft' | 'published'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: {
      is_admin: {
        Args: Record<string, never>
        Returns: boolean
      }
    }
    Enums: Record<string, never>
  }
}
