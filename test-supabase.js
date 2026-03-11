import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data: users, error: err1 } = await supabase.from('users').upsert({ wallet_address: '0x1234567890123456789012345678901234567890', last_seen: new Date().toISOString() }, { onConflict: 'wallet_address' }).select();
  console.log('Users error:', err1);
  console.log('Users data:', users);

  const { data: groups, error: err2 } = await supabase.from('groups').insert({
    contract_address: '0xabc_' + Date.now(),
    name: 'test',
    description: 'test',
    creator_address: '0x1234567890123456789012345678901234567890',
    contribution_amount: '10',
    cycle_duration: 7,
  }).select();
  console.log('Groups error:', err2);
  console.log('Groups data:', groups);
}

test();
