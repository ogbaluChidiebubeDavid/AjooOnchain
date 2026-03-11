import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.from('groups').delete().eq('contract_address', 'UNKNOWN_ADDRESS');
  console.log('Error:', error);
  console.log('Deleted Data:', data);
}

test();
