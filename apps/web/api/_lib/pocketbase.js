/**
 * Minimal PocketBase REST client for Vercel Serverless Functions.
 *
 * We cannot use the full PocketBase JS SDK here because Vercel serverless
 * functions don't share process state between invocations, so the auth token
 * must be fetched on every cold start.  This lightweight wrapper does just that.
 *
 * Required env vars:
 *   PB_URL               — e.g. https://pb.yourdomain.com
 *   PB_SUPERUSER_EMAIL
 *   PB_SUPERUSER_PASSWORD
 */

let _cachedToken = null;
let _tokenExpiry = 0; // ms since epoch

/**
 * Returns a valid superuser auth token, re-authenticating if needed.
 */
async function getSuperuserToken() {
  const now = Date.now();
  // Tokens last 7 days; refresh 10 min early
  if (_cachedToken && now < _tokenExpiry - 10 * 60 * 1000) {
    return _cachedToken;
  }

  const pbUrl    = process.env.PB_URL;
  const email    = process.env.PB_SUPERUSER_EMAIL;
  const password = process.env.PB_SUPERUSER_PASSWORD;

  if (!pbUrl || !email || !password) {
    throw new Error(
      'PocketBase env vars missing: PB_URL, PB_SUPERUSER_EMAIL, PB_SUPERUSER_PASSWORD'
    );
  }

  const resp = await fetch(
    `${pbUrl}/api/collections/_superusers/auth-with-password`,
    {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ identity: email, password }),
    }
  );

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`PocketBase auth failed (${resp.status}): ${text}`);
  }

  const data = await resp.json();
  _cachedToken = data.token;
  // PocketBase token TTL is in the JWT — default 7 days.  Cache for 6 days.
  _tokenExpiry = now + 6 * 24 * 60 * 60 * 1000;
  return _cachedToken;
}

/**
 * Creates a record in a PocketBase collection.
 * @param {string} collection
 * @param {Record<string, unknown>} data
 * @returns {Promise<Record<string, unknown>>} The created record
 */
export async function pbCreate(collection, data) {
  const pbUrl = process.env.PB_URL;
  if (!pbUrl) throw new Error('PB_URL env var is not set');

  const token = await getSuperuserToken();

  const resp = await fetch(`${pbUrl}/api/collections/${collection}/records`, {
    method:  'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization:  token,
    },
    body: JSON.stringify(data),
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`PocketBase create failed (${resp.status}): ${text}`);
  }

  return resp.json();
}
