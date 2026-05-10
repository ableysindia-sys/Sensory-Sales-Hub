import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

const url = process.env.DATABASE_URL;
// Cloud SQL via Unix socket (/cloudsql/...) and localhost need no SSL.
// All other remote hosts (Neon, Replit, etc.) need SSL but the managed
// certs aren't in Node's default CA bundle, so we skip verification.
const isUnixSocket = url.includes("/cloudsql/") || url.includes("localhost") || url.includes("127.0.0.1");
const ssl = isUnixSocket ? false : { rejectUnauthorized: false };

export const pool = new Pool({ connectionString: url, ssl });
export const db = drizzle(pool, { schema });
