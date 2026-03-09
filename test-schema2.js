import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data: groups, error: err2 } = await supabase.from('groups').insert({
    contract_address: '0xabc_' + Date.now(),
    name: 'test',
    description: 'test',
    creator_address: '0x1234567890123456789012345678901234567890',
    contribution_amount: '10',
    cycle_duration: 7,
    cycle_duration_days: 7,
  }).select();
  console.log('Groups error:', err2);
  console.log('Groups data:', groups);
}

test();
