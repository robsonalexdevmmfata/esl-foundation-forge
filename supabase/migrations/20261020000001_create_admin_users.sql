-- Create admin_users table for administrative authentication
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  role text not null default 'admin',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create index for faster username lookups
create index if not exists admin_users_username_idx
  on public.admin_users (username);

-- Create index for active status
create index if not exists admin_users_active_idx
  on public.admin_users (active);

-- Insert default admin user (password: Serras123@)
-- Password hash generated with bcrypt rounds=10
insert into public.admin_users (username, password_hash, role, active)
values (
  'gestaoesl',
  '$2b$10$e0UA1f.Q7J0I2Vb6qjBKru8VxdiNd7L5RKE2MP3k.gZaZzt6L8f2.',
  'admin',
  true
)
on conflict (username) do update
set
  password_hash = excluded.password_hash,
  role = excluded.role,
  active = excluded.active,
  updated_at = now();

-- Add comment to table
comment on table public.admin_users is 'Administrative users for dashboard authentication';
