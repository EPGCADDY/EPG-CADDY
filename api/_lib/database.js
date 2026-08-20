import { neon } from "@neondatabase/serverless";

let sqlClient = null;

export function getDatabase() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    const error = new Error("DATABASE_NOT_CONFIGURED");
    error.code = "DATABASE_NOT_CONFIGURED";
    throw error;
  }
  if (!sqlClient) sqlClient = neon(databaseUrl);
  return sqlClient;
}

export function databaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}
