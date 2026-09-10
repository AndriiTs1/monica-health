-- ============================================================================
-- review-admin.sql
--
-- Adds a review-moderation admin allowlist and the RLS policies that let
-- allow-listed admins moderate public.reviews (see pending/published/hidden
-- status column). This file is NOT executed automatically by the app.
-- Run it once, by hand, in the Supabase SQL editor — see "MANUAL SUPABASE
-- SETUP" in the accompanying report for the full manual procedure
-- (creating Monica's auth user and adding her to review_admins).
--
-- This file only ADDS new objects/policies. It does not modify or drop
-- any of the existing public.reviews policies or grants:
--   - anon/authenticated INSERT ... WITH CHECK (consent = true AND status = 'pending')
--   - anon/authenticated SELECT ... USING (status = 'published')
--   - grant select, insert on public.reviews to anon, authenticated
-- Those keep working exactly as before for every visitor and for the
-- public review form.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- 1. Admin allowlist table: public.review_admins
-- ----------------------------------------------------------------------------
-- One row per admin. There is no INSERT/UPDATE/DELETE policy or grant for
-- anon or authenticated at all, so no client (including a signed-in admin)
-- can ever add or remove a row from their own session — only a superuser
-- role (e.g. you, in the Supabase SQL editor) can populate this table.

create table if not exists public.review_admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.review_admins enable row level security;

-- Belt and suspenders: anon gets no grants on this table at all, so it
-- cannot even attempt a query against it (RLS would deny it anyway, but
-- there is no reason to let anon try).
revoke all on public.review_admins from anon;

-- authenticated gets SELECT only — no insert/update/delete grants, ever.
-- Even if a policy were misconfigured in the future, Postgres itself
-- would still refuse any write attempt from this role because the grant
-- doesn't exist.
revoke all on public.review_admins from authenticated;
grant select on public.review_admins to authenticated;

-- A signed-in user may only ever see THEIR OWN row (or nothing, if they
-- aren't an admin) — never the full admin list. This is required so the
-- app itself can answer "is the currently signed-in user an admin?"
-- without a service-role key. It is also what makes the admin policies
-- on public.reviews below actually work: their "exists (select 1 from
-- review_admins ...)" subquery is itself subject to this same RLS policy,
-- so without it that subquery would always see zero rows and no admin
-- check anywhere in this file would ever pass.
drop policy if exists "review_admins: self membership check only" on public.review_admins;
create policy "review_admins: self membership check only"
  on public.review_admins
  for select
  to authenticated
  using (user_id = (select auth.uid()));


-- ----------------------------------------------------------------------------
-- 2. Admin RLS policies on public.reviews
-- ----------------------------------------------------------------------------
-- Postgres RLS combines multiple permissive policies for the same
-- command+role with OR. So adding these does not replace the existing
-- public policies — it only adds an extra "...or you're an allow-listed
-- admin" clause on top of them:
--   * a regular authenticated visitor still only ever sees status='published'
--     rows (the admin exists-check below is simply false for them, so it
--     contributes nothing and the existing published-only policy is all
--     that applies);
--   * an allow-listed admin sees every status, because the admin policy's
--     exists-check is true for them regardless of status.

-- ADMIN SELECT: see pending + published + hidden.
drop policy if exists "reviews: admin can select all statuses" on public.reviews;
create policy "reviews: admin can select all statuses"
  on public.reviews
  for select
  to authenticated
  using (
    exists (
      select 1 from public.review_admins
      where review_admins.user_id = (select auth.uid())
    )
  );

-- ADMIN UPDATE: used for Publish / Hide. Both USING (which rows can be
-- targeted) and WITH CHECK (what the row is allowed to look like *after*
-- the update) repeat the same admin check, which is the standard,
-- recommended shape for an UPDATE policy.
drop policy if exists "reviews: admin can update" on public.reviews;
create policy "reviews: admin can update"
  on public.reviews
  for update
  to authenticated
  using (
    exists (
      select 1 from public.review_admins
      where review_admins.user_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.review_admins
      where review_admins.user_id = (select auth.uid())
    )
  );

-- ADMIN DELETE: permanent delete, used by the "Elimina" action.
drop policy if exists "reviews: admin can delete" on public.reviews;
create policy "reviews: admin can delete"
  on public.reviews
  for delete
  to authenticated
  using (
    exists (
      select 1 from public.review_admins
      where review_admins.user_id = (select auth.uid())
    )
  );


-- ----------------------------------------------------------------------------
-- 3. Grants for authenticated on public.reviews
-- ----------------------------------------------------------------------------
-- authenticated already has SELECT/INSERT from the existing setup (not
-- touched here). Moderation additionally needs UPDATE and DELETE at the
-- grant level — grants only control whether the role may attempt the
-- statement at all; the RLS policies above are what actually restrict
-- which ROWS it can affect (a non-admin authenticated user has the grant
-- but the USING clause matches zero rows for them, so their UPDATE/DELETE
-- silently affects nothing — no error, no data change, no leak).
--
-- The UPDATE grant is deliberately restricted to exactly the two columns
-- Publish/Hide ever touch. This means that even a bug in application code
-- (or a hand-crafted request against the same session) cannot rewrite
-- author_name / content / rating / consent through this grant — Postgres
-- rejects it at the column level, independently of anything the app code
-- does or doesn't send.
grant update (status, published_at) on public.reviews to authenticated;
grant delete on public.reviews to authenticated;
