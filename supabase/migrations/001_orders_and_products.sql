create extension if not exists pgcrypto;

create table if not exists public.products (
  id text primary key,
  name text not null,
  price numeric(12,2) not null check (price >= 0),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  address text not null,
  city text not null,
  province text,
  postal_code text,
  delivery_note text,
  items jsonb not null,
  subtotal numeric(12,2) not null check (subtotal >= 0),
  delivery_fee numeric(12,2) not null check (delivery_fee >= 0),
  total_amount numeric(12,2) not null check (total_amount >= 0),
  payment_method text not null check (payment_method in ('cod', 'online')),
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'failed', 'cancelled', 'cod_pending')),
  marx_transaction_id bigint,
  marx_merchant_rid text unique,
  marx_gateway_code text,
  marx_response jsonb,
  email_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_marx_transaction_id_idx on public.orders (marx_transaction_id);
create index if not exists orders_created_at_idx on public.orders (created_at desc);

alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Orders and product prices are accessed by the Edge Functions with the service role.
-- No public INSERT/UPDATE/SELECT policies are intentionally created for orders.
-- This prevents a browser customer from directly changing an order or payment status.

insert into public.products (id, name, price) values
  ('e1', 'cinnamon castile soap', 1750),
  ('e2', 'cinnamon hair conditioner', 1850),
  ('e3', 'cinnamon shampoo', 1950),
  ('e5', 'Doggy soap', 1000),
  ('e4', 'Dog natral shampoo', 1850),
  ('e6', 'Lemon hair conditioner', 1850),
  ('c1', 'lemongrass castile soap', 1750),
  ('c2', 'lemongrass shampoo', 1950),
  ('c3', 'Moringa Night Cream ', 2750),
  ('c4', 'Moringa Day cream ', 2750),
  ('c6', 'moringa hair conditioner', 1850),
  ('c7', 'moringa liquid soap', 1750),
  ('c8', 'moringa shampoo', 1950),
  ('c9', 'Neem', 1000),
  ('c10', 'Saffran hair conditioner', 1850),
  ('c11', 'Saffran shampoo', 1950),
  ('s2', 'Moringa Soap', 1000),
  ('s3', 'Lemongrass Soap', 1000),
  ('s4', 'Aloevera Soap', 1000),
  ('s5', 'Cassia Alata Soap', 1000),
  ('s6', 'Goat Milk Soap', 1000),
  ('s7', 'Cinnamon Soap', 1000),
  ('s8', 'Activated Charcoal Soap', 1000),
  ('m1', 'cinnamon body massage oil', 2950),
  ('m2', 'relaxa body massage oil', 2950)
on conflict (id) do update set name = excluded.name, price = excluded.price, active = true, updated_at = now();
