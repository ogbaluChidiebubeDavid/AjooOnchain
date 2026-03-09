-- Enable UUID extension for unique identifiers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    wallet_address VARCHAR(42) UNIQUE NOT NULL, -- Original EOA
    smart_account_address VARCHAR(42) UNIQUE,   -- ERC-4337 Smart Account
    username VARCHAR(50),
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(20),
    date_of_birth DATE,                         -- Used for automated "Happy Birthday" triggers
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- GROUPS TABLE
CREATE TABLE groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    contract_address VARCHAR(42) UNIQUE,        -- The deployed AjooGroup.sol address on Avalanche
    contribution_amount DECIMAL(18, 4) NOT NULL,
    cycle_duration_days INTEGER NOT NULL,
    target_savings_goal VARCHAR(255),           -- E.g., "Festive Items", "Rent", "New Car"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- GROUP MEMBERS
-- Maps users to groups and defines their payout rotation index
CREATE TABLE group_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rotation_index INTEGER NOT NULL,            -- Order in the payout list (0 = First on List, etc.)
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(group_id, user_id),
    UNIQUE(group_id, rotation_index)            -- Ensures no two users share the same spot
);

-- CONTRIBUTIONS TABLE
-- Powered by Alchemy Webhooks listening to 'DepositMade' events
CREATE TABLE contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    cycle_number INTEGER NOT NULL,
    amount DECIMAL(18, 4) NOT NULL,
    transaction_hash VARCHAR(66) UNIQUE,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED')),
    contributed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- PAYOUTS TABLE
-- Powered by Alchemy Webhooks listening to 'PayoutDistributed' events
CREATE TABLE payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    cycle_number INTEGER NOT NULL,
    principal_amount DECIMAL(18, 4) NOT NULL,
    interest_shared DECIMAL(18, 4) NOT NULL,    -- Aave Yield shared
    transaction_hash VARCHAR(66) UNIQUE,
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- WEBHOOK EVENTS
-- Logs raw events from the RPC provider before Edge Function processing
CREATE TABLE contract_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contract_address VARCHAR(42) NOT NULL,
    event_type VARCHAR(50) NOT NULL,            -- e.g., 'DepositMade', 'PayoutDistributed'
    transaction_hash VARCHAR(66) NOT NULL,
    payload JSONB NOT NULL,
    processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
