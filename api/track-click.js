/**
 * Vercel Serverless Function — POST /api/track-click
 *
 * Logs a WhatsApp button click event.
 *   1. Writes the event to Supabase `whatsapp_clicks` table.
 *   2. Appends a row to the Google Sheet (WhatsApp Clicks tab).
 *
 * This endpoint is fire-and-forget from the browser — the WhatsApp link
 * opens regardless of whether this call succeeds.
 *
 * Required environment variables: same as /api/contact
 */

import { appendToSheet, SHEET_TABS } from './_lib/sheets.js';
import { createRecord }              from './_lib/supabase.js';

const trim = (v) => (typeof v === 'string' ? v.trim() : '');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body    = req.body ?? {};
  const page    = trim(body.page)    || 'unknown';
  const service = trim(body.service) || '';
  const source  = trim(body.source)  || 'unknown';   // e.g. floating_button | service_cta | contact_page
  let record;
  try {
    record = await createRecord('whatsapp_clicks', { page, service, source });
  } catch (supabaseErr) {
    console.error('[track-click] Supabase write failed:', supabaseErr?.message ?? supabaseErr);
    return res.status(502).json({ error: 'Failed to record click' });
  }

  await appendToSheet(SHEET_TABS.WA_CLICKS, [record.created_at, page, service, source]);

  return res.status(200).json({ ok: true });
}
