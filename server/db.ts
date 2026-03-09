import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@shared/schema';

// Required for neon-http
neonConfig.fetchConnectionCache = true;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to add it to your .env file?",
  );
}

export const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
