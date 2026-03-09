import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function checkSchema() {
  try {
    await client.connect();
    
    const usersRes = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'users';");
    console.log('Users columns:', usersRes.rows.map(r => r.column_name));

    const groupsRes = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'groups';");
    console.log('Groups columns:', groupsRes.rows.map(r => r.column_name));

  } catch (err) {
    console.error('Connection error', err.stack);
  } finally {
    await client.end();
  }
}

checkSchema();
