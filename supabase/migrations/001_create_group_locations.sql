-- Create group_locations table for storing member locations
-- Run this in Supabase SQL Editor

create table group_locations (
  id uuid default gen_random_uuid() primary key,
  group_code text not null,
  user_name text not null,
  latitude double precision not null,
  longitude double precision not null,
  updated_at timestamp with time zone default now(),
  unique(group_code, user_name)
);

-- Enable row level security but allow all operations with anon key
alter table group_locations enable row level security;

create policy "Allow all operations" on group_locations
  for all using (true) with check (true);
