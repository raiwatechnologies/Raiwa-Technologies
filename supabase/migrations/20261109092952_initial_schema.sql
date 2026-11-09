create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(btrim(name)) > 0),
  email text not null check (email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  phone text not null check (length(phone) >= 7),
  company text not null default '',
  marketing_challenges text not null check (length(btrim(marketing_challenges)) > 0),
  preferred_contact text not null default 'Email',
  message text not null check (length(btrim(message)) >= 10),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.whatsapp_clicks (
  id uuid primary key default gen_random_uuid(),
  page text not null default 'unknown',
  service text not null default '',
  source text not null default 'unknown',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contacts_created_at_idx
  on public.contacts (created_at desc);

create index if not exists whatsapp_clicks_created_at_idx
  on public.whatsapp_clicks (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists contacts_set_updated_at on public.contacts;
create trigger contacts_set_updated_at
  before update on public.contacts
  for each row execute function public.set_updated_at();

drop trigger if exists whatsapp_clicks_set_updated_at on public.whatsapp_clicks;
create trigger whatsapp_clicks_set_updated_at
  before update on public.whatsapp_clicks
  for each row execute function public.set_updated_at();

alter table public.contacts enable row level security;
alter table public.whatsapp_clicks enable row level security;

revoke all on table public.contacts, public.whatsapp_clicks from public, anon, authenticated;
grant all on table public.contacts, public.whatsapp_clicks to service_role;
revoke all on function public.set_updated_at() from public, anon, authenticated;
grant execute on function public.set_updated_at() to service_role;
