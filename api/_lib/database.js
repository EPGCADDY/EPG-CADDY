import { neon } from "@neondatabase/serverless";

let sqlClient = null;

export function databaseUrlForEnvironment(env = process.env) {
  const lab = env.VERCEL_PROJECT_ID === 'prj_0KNTWUoiCiA3amKZQPDNNkWYFDbp' || env.GSC_ENVIRONMENT === 'lab';
  if (!lab) return env.DATABASE_URL;
  const value = env.GSC_LAB_DATABASE_URL;
  if (!value) return undefined;
  const allowed = ['ep-fragrant-pine-av6xi8hy.c-11.us-east-1.aws.neon.tech', 'ep-fragrant-pine-av6xi8hy-pooler.c-11.us-east-1.aws.neon.tech'];
  let host;
  try { host = new URL(value).hostname; } catch { host = ''; }
  if (!allowed.includes(host)) {
    const error = new Error('LAB_DATABASE_ENDPOINT_INVALID');
    error.code = 'LAB_DATABASE_ENDPOINT_INVALID';
    throw error;
  }
  return value;
}

export function getDatabase() {
  const databaseUrl = databaseUrlForEnvironment();
  if (!databaseUrl) {
    const error = new Error("DATABASE_NOT_CONFIGURED");
    error.code = "DATABASE_NOT_CONFIGURED";
    throw error;
  }
  if (!sqlClient) sqlClient = neon(databaseUrl);
  return sqlClient;
}

export function databaseConfigured() {
  return Boolean(databaseUrlForEnvironment());
}
