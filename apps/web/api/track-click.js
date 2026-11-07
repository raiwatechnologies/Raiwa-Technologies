/**
 * Vercel Serverless Function — POST /api/track-click
 *
 * Logs a WhatsApp button click event.
 *   1. Writes the event to PocketBase `whatsapp_clicks` collection.
 *   2. Appends a row to the Google Sheet (WhatsApp Clicks tab).
 *
 * This endpoint is fire-and-forget from the browser — the WhatsApp link
 * opens regardless of whether this call succeeds.
 *
 * Required environment variables: same as /api/contact
 */

import { appendToSheet, SHEET_TABS } from './_lib/sheets.js';
import { pbCreate }                  from './_lib/pocketbase.js';

const trim = (v) => (typeof v === 'string' ? v.trim() : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body    = req.body ?? {};
  const page    = trim(body.page)    || 'unknown';
  const service = trim(body.service) || '';
  const source  = trim(body.source)  || 'unknown';   // e.g. floating_button | service_cta | contact_page
  const now     = new Date().toISOString();

  // PocketBase write (best-effort)
  pbCreate('whatsapp_clicks', { page, service, source }).catch((err) =>
    console.error('[track-click] PocketBase write failed:', err?.message ?? err)
  );

  // Google Sheets append (best-effort)
  appendToSheet(SHEET_TABS.WA_CLICKS, [now, page, service, source]).catch((err) =>
    console.error('[track-click] Sheets append failed:', err?.message ?? err)
  );

  // Always return 200 immediately — the browser doesn't need to wait
  return res.status(200).json({ ok: true });
}
