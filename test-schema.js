import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data: users, error: err1 } = await supabase.from('users').select('*').limit(1);
  console.log('Users columns:', users && users[0] ? Object.keys(users[0]) : err1 || 'Empty table');

  const { data: groups, error: err2 } = await supabase.from('groups').select('*').limit(1);
  console.log('Groups columns:', groups && groups[0] ? Object.keys(groups[0]) : err2 || 'Empty table');
}

test();
