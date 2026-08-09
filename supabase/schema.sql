-- Supabase Schema for Daily Client Service & Payment Register

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Extends Supabase Auth users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  role text check (role in ('admin', 'staff')) default 'staff',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS for profiles
alter table profiles enable row level security;

-- Profiles RLS Policies
create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- 2. Services Master Table
create table services_master (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text,
  price numeric not null default 0,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS for services_master
alter table services_master enable row level security;

-- Services RLS Policies
create policy "Services are viewable by everyone." on services_master for select using (true);
create policy "Only admins can insert services." on services_master for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Only admins can update services." on services_master for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- Insert some default services
insert into services_master (name, category, price) values
('Haircut - Men', 'Hair', 300),
('Haircut - Women', 'Hair', 600),
('Hair Color', 'Hair', 1500),
('Facial - Basic', 'Face', 1200),
('Manicure', 'Nails', 500),
('Pedicure', 'Nails', 600),
('Spa - Full Body', 'Body', 2500);

-- 3. Daily Register Table
create table daily_register (
  id uuid default uuid_generate_v4() primary key,
  client_name text not null,
  client_phone text,
  service_name text not null,
  amount numeric not null,
  payment_mode text check (payment_mode in ('Cash', 'UPI', 'Card', 'Other')) not null,
  notes text,
  registered_by uuid references profiles(id),
  visit_date date default current_date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS for daily_register
alter table daily_register enable row level security;

-- Daily Register RLS Policies
create policy "Staff and Admins can view daily register." on daily_register for select using (
  auth.role() = 'authenticated'
);
create policy "Staff and Admins can insert daily register." on daily_register for insert with check (
  auth.role() = 'authenticated'
);
create policy "Only admins can update daily register." on daily_register for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Only admins can delete daily register." on daily_register for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
