import { loadEnvFile } from 'node:process';
import { existsSync } from 'node:fs';

if (existsSync('.env.local')) loadEnvFile('.env.local');
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error('Supabase connection settings are missing. Pull Vercel development environment variables first.');
const endpoints = ['/auth/v1/settings'];
for (const endpoint of endpoints) {
  const response = await fetch(new URL(endpoint, url), {
    headers: { apikey: key },
    signal: AbortSignal.timeout(15000),
  });
  console.log(`${endpoint}: HTTP ${response.status}`);
  if (!response.ok) process.exitCode = 1;
}
