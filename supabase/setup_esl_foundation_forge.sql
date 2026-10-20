create table if not exists public.site_content (
  id integer primary key default 1,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_content_singleton check (id = 1)
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  telefone text,
  servico text,
  mensagem text,
  origem text not null default 'site',
  status text not null default 'novo',
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

create index if not exists leads_status_idx
  on public.leads (status);

create table if not exists public.site_config (
  id integer primary key default 1,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint site_config_singleton check (id = 1)
);

create table if not exists public.clientes (
  id text primary key default gen_random_uuid()::text,
  nome text not null,
  whatsapp text not null default '',
  email text not null default '',
  setor text not null default '',
  valor numeric(14, 2) not null default 0 check (valor >= 0),
  status text not null default 'Em negociação',
  data date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists clientes_data_idx
  on public.clientes (data desc);

create index if not exists clientes_status_idx
  on public.clientes (status);

create table if not exists public.projetos (
  id text primary key default gen_random_uuid()::text,
  nome text not null,
  cliente text not null,
  valor numeric(14, 2) not null default 0 check (valor >= 0),
  status text not null default 'Em execução',
  progresso integer not null default 0 check (progresso between 0 and 100),
  inicio date not null default current_date,
  prazo date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projetos_inicio_idx
  on public.projetos (inicio desc);

create index if not exists projetos_status_idx
  on public.projetos (status);

insert into public.site_content (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;

insert into public.site_config (id, data)
values (1, '{}'::jsonb)
on conflict (id) do nothing;
