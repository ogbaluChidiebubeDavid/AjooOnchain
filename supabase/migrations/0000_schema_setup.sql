-- 1. Ensure the users table has the required Web3 columns
CREATE TABLE IF NOT EXISTS users (
  wallet_address text primary key
);

ALTER TABLE users ADD COLUMN IF NOT EXISTS last_seen timestamp with time zone default now();
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS zk_proof_metadata jsonb;
ALTER TABLE users ADD COLUMN IF NOT EXISTS username text;

-- 2. Ensure the groups table has the required columns
CREATE TABLE IF NOT EXISTS groups (
  id uuid primary key default gen_random_uuid()
);

ALTER TABLE groups ADD COLUMN IF NOT EXISTS contract_address text unique;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS name text not null;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS creator_address text references users(wallet_address);
ALTER TABLE groups ADD COLUMN IF NOT EXISTS contribution_amount text;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS cycle_duration int;
ALTER TABLE groups ADD COLUMN IF NOT EXISTS created_at timestamp with time zone default now();

-- 3. Ensure the group_members table exists
CREATE TABLE IF NOT EXISTS group_members (
  group_id uuid references groups(id),
  user_address text references users(wallet_address),
  joined_at timestamp with time zone default now(),
  primary key (group_id, user_address)
);

-- 4. THIS IS THE MAGIC COMMAND: It forces Supabase to refresh its API cache!
NOTIFY pgrst, 'reload schema';
