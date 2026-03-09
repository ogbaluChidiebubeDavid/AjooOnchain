import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.from('groups').select('*').order('created_at', { ascending: false }).limit(5);
  console.log('Error:', error);
  console.log('Recent Data:', JSON.stringify(data, null, 2));
}

test();
