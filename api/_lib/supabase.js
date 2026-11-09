import { createClient } from '@supabase/supabase-js';

let client;

function getClient() {
  if (client) return client;

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured');
  }

  client = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
  return client;
}

const allowedTables = new Set(['contacts', 'whatsapp_clicks']);

export async function createRecord(table, values) {
  if (!allowedTables.has(table)) {
    throw new Error(`Unsupported Supabase table: ${table}`);
  }

  const { data, error } = await getClient()
    .from(table)
    .insert(values)
    .select('id, created_at')
    .single();

  if (error) {
    throw new Error(`Supabase insert into ${table} failed: ${error.message}`, { cause: error });
  }

  return data;
}
