-- ============================================================
-- NEV LP Portal — Seed Data
-- Fund I data and 11 portfolio companies with valuation events
-- ============================================================

-- ──────────────────────────────────────────────────────────
-- FUND
-- ──────────────────────────────────────────────────────────

insert into public.fund (name, vintage, total_committed, total_called, total_deployed, total_current_value, as_of_date)
values ('NEV Fund I', 2025, 2107500.00, 1369875.00, 1311798.17, 1563400.00, '2026-04-29');

-- ──────────────────────────────────────────────────────────
-- PORTFOLIO COMPANIES
-- ──────────────────────────────────────────────────────────

insert into public.portfolio_companies
  (slug, name, stage, status, invested_date, check_size, entry_valuation, ownership_pct, pro_rata_rights, current_valuation, current_multiple)
values
  ('engram',        'Engram',         'Pre-Seed',   'active', '2026-04-29', 200000, 45000000, 0.44, false, 75000000, 1.67),
  ('olive',         'Olive',          'First Check', 'active', '2026-04-27', 110000, 13000000, 0.85, true,  20000000, 1.54),
  ('apollo-atomics','Apollo Atomics',  'Pre-Seed',   'active', '2026-02-11', 175000, 20000000, 0.88, true,  20000000, 1.00),
  ('subhub',        'SubHub',         'First Check', 'active', '2026-01-25', 150000, 22500000, 0.67, true,  22500000, 1.00),
  ('goblins',       'Goblins',        'Seed',       'active', '2025-11-20',  70000, 18000000, 0.39, false, 18000000, 1.00),
  ('terac',         'Terac',          'Seed',       'active', '2025-11-17', 100000, 30000000, 0.33, false, 30000000, 1.00),
  ('crabi-robotics','CRABI Robotics',  'Seed',       'active', '2025-09-26', 100000, 20000000, 0.50, false, 20000000, 1.00),
  ('chatarv',       'ChatARV',        'First Check', 'active', '2025-09-20',  20000,  2000000, 1.00, true,   3000000, 1.50),
  ('silares',       'Silares',        'Seed',       'active', '2025-07-21', 175000, 25000000, 0.70, true,  30000000, 1.20),
  ('sylvan-labs',   'Sylvan Labs',    'First Check', 'active', '2025-06-06', 100000, 15000000, 0.67, false, 15000000, 1.00),
  ('applied37',     'applied37',      'First Check', 'active', '2025-04-07', 100000, 40000000, 0.25, false, 50000000, 1.25);

-- ──────────────────────────────────────────────────────────
-- VALUATION EVENTS
-- Initial entry event for every company.
-- Markup event for companies where current_multiple != 1.00.
-- Uses a DO block to resolve company IDs by slug.
-- ──────────────────────────────────────────────────────────

do $$
declare
  v_id uuid;
begin

  -- Engram (mult 1.67 — markup)
  select id into v_id from public.portfolio_companies where slug = 'engram';
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2026-04-29', 'initial', 45000000, 200000, 1.00, 'Initial investment');
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2026-04-29', 'markup',  75000000, 334000, 1.67, 'Marked to current valuation');

  -- Olive (mult 1.54 — markup)
  select id into v_id from public.portfolio_companies where slug = 'olive';
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2026-04-27', 'initial', 13000000, 110000, 1.00, 'Initial investment');
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2026-04-27', 'markup',  20000000, 169400, 1.54, 'Marked to current valuation');

  -- Apollo Atomics (mult 1.00 — no markup)
  select id into v_id from public.portfolio_companies where slug = 'apollo-atomics';
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2026-02-11', 'initial', 20000000, 175000, 1.00, 'Initial investment');

  -- SubHub (mult 1.00 — no markup)
  select id into v_id from public.portfolio_companies where slug = 'subhub';
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2026-01-25', 'initial', 22500000, 150000, 1.00, 'Initial investment');

  -- Goblins (mult 1.00 — no markup)
  select id into v_id from public.portfolio_companies where slug = 'goblins';
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2025-11-20', 'initial', 18000000, 70000, 1.00, 'Initial investment');

  -- Terac (mult 1.00 — no markup)
  select id into v_id from public.portfolio_companies where slug = 'terac';
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2025-11-17', 'initial', 30000000, 100000, 1.00, 'Initial investment');

  -- CRABI Robotics (mult 1.00 — no markup)
  select id into v_id from public.portfolio_companies where slug = 'crabi-robotics';
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2025-09-26', 'initial', 20000000, 100000, 1.00, 'Initial investment');

  -- ChatARV (mult 1.50 — markup)
  select id into v_id from public.portfolio_companies where slug = 'chatarv';
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2025-09-20', 'initial', 2000000, 20000, 1.00, 'Initial investment');
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2025-09-20', 'markup',  3000000, 30000, 1.50, 'Marked to current valuation');

  -- Silares (mult 1.20 — markup)
  select id into v_id from public.portfolio_companies where slug = 'silares';
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2025-07-21', 'initial', 25000000, 175000, 1.00, 'Initial investment');
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2025-07-21', 'markup',  30000000, 210000, 1.20, 'Marked to current valuation');

  -- Sylvan Labs (mult 1.00 — no markup)
  select id into v_id from public.portfolio_companies where slug = 'sylvan-labs';
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2025-06-06', 'initial', 15000000, 100000, 1.00, 'Initial investment');

  -- applied37 (mult 1.25 — markup)
  select id into v_id from public.portfolio_companies where slug = 'applied37';
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2025-04-07', 'initial', 40000000, 100000, 1.00, 'Initial investment');
  insert into public.valuation_events (company_id, event_date, event_type, new_company_valuation, new_position_value, multiple, note)
    values (v_id, '2025-04-07', 'markup',  50000000, 125000, 1.25, 'Marked to current valuation');

end $$;
