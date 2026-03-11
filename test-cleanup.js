import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.from('groups').delete().like('contract_address', '0xabc_%');
  console.log('Error:', error);
  console.log('Deleted Test Data');
}

test();
