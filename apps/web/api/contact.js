/**
 * Vercel Serverless Function — POST /api/contact
 *
 * Handles contact form submissions from the website.
 *   1. Validates all required fields.
 *   2. Writes the record to PocketBase (as superuser).
 *   3. Appends a row to the configured Google Sheet.
 *
 * Required environment variables (set in Vercel dashboard):
 *   PB_URL                        — PocketBase base URL, e.g. https://pb.yourdomain.com
 *   PB_SUPERUSER_EMAIL            — PocketBase superuser email
 *   PB_SUPERUSER_PASSWORD         — PocketBase superuser password
 *   GOOGLE_SHEET_ID               — Google Sheet ID (from the URL)
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  — Service account email
 *   GOOGLE_SERVICE_ACCOUNT_KEY    — Service account private key (base64-encoded PEM)
 */

import { appendToSheet, SHEET_TABS } from './_lib/sheets.js';
import { pbCreate }                  from './_lib/pocketbase.js';

const trim = (v) => (typeof v === 'string' ? v.trim() : '');

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body ?? {};

  const name               = trim(body.name);
  const email              = trim(body.email);
  const phone              = trim(body.phone);
  const company            = trim(body.company);
  const marketing_challenges = trim(body.marketing_challenges);
  const preferred_contact  = trim(body.preferred_contact) || 'Email';
  const message            = trim(body.message);

  // ── Validation ───────────────────────────────────────────────────────────
  const required = { name, email, phone, marketing_challenges, message };
  for (const [field, value] of Object.entries(required)) {
    if (!value) {
      return res.status(400).json({ error: `Missing required field: ${field}` });
    }
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (phone.length < 7) {
    return res.status(400).json({ error: 'Phone number too short' });
  }

  if (message.length < 10) {
    return res.status(400).json({ error: 'Message too short' });
  }

  // ── PocketBase write ─────────────────────────────────────────────────────
  let recordId = null;
  try {
    const record = await pbCreate('contacts', {
      name,
      email,
      phone,
      company,
      marketing_challenges,
      preferred_contact,
      message,
    });
    recordId = record.id;
  } catch (pbErr) {
    console.error('[contact] PocketBase write failed:', pbErr?.message ?? pbErr);
    // Return error so the form can show a meaningful message
    return res.status(502).json({ error: 'Failed to save your message. Please try again.' });
  }

  // ── Google Sheets append (non-blocking — don't fail the request if Sheets is down) ──
  const now = new Date().toISOString();
  appendToSheet(SHEET_TABS.CONTACTS, [
    now,
    name,
    email,
    phone,
    company || '',
    marketing_challenges,
    preferred_contact,
    message,
  ]).catch((err) =>
    console.error('[contact] Sheets append failed:', err?.message ?? err)
  );

  return res.status(201).json({ ok: true, id: recordId });
}
