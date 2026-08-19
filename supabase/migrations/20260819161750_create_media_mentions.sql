-- Public mentions are collected by a server-side worker and only become
-- visible to visitors after a reviewer publishes them.
create table public.media_mentions (
  id uuid primary key default gen_random_uuid(),
  source_url text not null unique,
  canonical_url text not null,
  source_name text not null,
  platform text not null default 'web',
  author_name text,
  author_role text,
  title text,
  quote text,
  summary text,
  mention_type text not null default 'mention'
    check (mention_type in ('testimonial', 'news', 'award', 'mention')),
  related_entities text[] not null default '{}',
  occurred_at timestamptz,
  status text not null default 'pending'
    check (status in ('pending', 'published', 'rejected')),
  moderation_note text,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  published_at timestamptz,
  collector text not null default 'rss',
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index media_mentions_publication_idx
  on public.media_mentions (status, published_at desc nulls last);
create index media_mentions_entities_idx
  on public.media_mentions using gin (related_entities);
create index media_mentions_occurred_at_idx
  on public.media_mentions (occurred_at desc nulls last);

revoke all on public.media_mentions from anon, authenticated;
grant select (id, source_url, source_name, platform, author_name, author_role,
  title, quote, summary, mention_type, related_entities, occurred_at, published_at)
  on public.media_mentions to anon;
grant select, insert, update, delete on public.media_mentions to authenticated;
grant all on public.media_mentions to service_role;

alter table public.media_mentions enable row level security;

create policy "Published mentions are public"
  on public.media_mentions for select
  to anon
  using (status = 'published');

create policy "Editors can read all mentions"
  on public.media_mentions for select
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'editor'));

create policy "Editors can add mentions"
  on public.media_mentions for insert
  to authenticated
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'editor'));

create policy "Editors can update mentions"
  on public.media_mentions for update
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'editor'))
  with check ((select auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'editor'));

create policy "Editors can delete mentions"
  on public.media_mentions for delete
  to authenticated
  using ((select auth.jwt() -> 'app_metadata' ->> 'role') in ('admin', 'editor'));
