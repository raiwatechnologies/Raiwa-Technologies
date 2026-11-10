/**
 * Google Sheets API Client for Vercel Serverless Functions
 * Uses Node's built-in `crypto` for RS256 JWT service account authentication.
 * No external dependencies required!
 *
 * Required environment variables (optional until Google Sheet is created):
 *   GOOGLE_SHEET_ID               — The ID from the spreadsheet URL
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  — e.g. service-account@project.iam.gserviceaccount.com
 *   GOOGLE_SERVICE_ACCOUNT_KEY    — The private_key PEM (replace \n or base64)
 */

import crypto from 'node:crypto';

export const SHEET_TABS = {
  CONTACTS: 'Contact Submissions',
  WA_CLICKS: 'WhatsApp Clicks',
};

let cachedAccessToken = null;
let tokenExpiry = 0;

/**
 * Obtain an OAuth2 access token for Google Sheets using Service Account credentials.
 */
async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedAccessToken && now < tokenExpiry - 60) {
    return cachedAccessToken;
  }

  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!clientEmail || !privateKey) {
    return null; // Not configured yet
  }

  // Handle keys that are base64 encoded or have escaped newlines
  if (!privateKey.includes('-----BEGIN PRIVATE KEY-----')) {
    try {
      privateKey = Buffer.from(privateKey, 'base64').toString('utf8');
    } catch {
      // not base64
    }
  }
  privateKey = privateKey.replace(/\\n/g, '\n');

  const header = {
    alg: 'RS256',
    typ: 'JWT',
  };

  const claimSet = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  };

  const base64Url = (obj) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const unsignedToken = `${base64Url(header)}.${base64Url(claimSet)}`;

  const signer = crypto.createSign('RSA-SHA256');
  signer.update(unsignedToken);
  const signature = signer
    .sign(privateKey, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  const jwt = `${unsignedToken}.${signature}`;

  const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!tokenResp.ok) {
    const errorText = await tokenResp.text().catch(() => '');
    throw new Error(`Google Auth failed: ${tokenResp.status} ${errorText}`);
  }

  const tokenData = await tokenResp.json();
  cachedAccessToken = tokenData.access_token;
  tokenExpiry = now + (tokenData.expires_in || 3600);
  return cachedAccessToken;
}

/**
 * Append a row of values to a specific sheet/tab.
 * @param {string} tabName
 * @param {Array<string|number>} rowValues
 */
export async function appendToSheet(tabName, rowValues) {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) {
    // Graceful skip if Google Sheet is not yet configured
    return;
  }

  try {
    const token = await getAccessToken();
    if (!token) {
      return;
    }

    const encodedTab = encodeURIComponent(tabName);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodedTab}!A1:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        values: [rowValues],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      console.warn(`[Google Sheets] Append returned ${res.status}: ${errText}`);
    }
  } catch (err) {
    console.warn('[Google Sheets] Append error:', err?.message ?? err);
  }
}
