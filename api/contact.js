/**
 * Vercel Serverless Function — POST /api/contact
 *
 * Handles contact form submissions from the website.
 *   1. Validates all required fields.
 *   2. Writes the record to Supabase (with a server-only service role key).
 *   3. Appends a row to the configured Google Sheet.
 *
 * Required environment variables (set in Vercel dashboard):
 *   SUPABASE_URL                  — Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY     — Server-only Supabase service role key
 *   GOOGLE_SHEET_ID               — Google Sheet ID (from the URL)
 *   GOOGLE_SERVICE_ACCOUNT_EMAIL  — Service account email
 *   GOOGLE_SERVICE_ACCOUNT_KEY    — Service account private key (base64-encoded PEM)
 */

import { appendToSheet, SHEET_TABS } from './_lib/sheets.js';
import { createRecord }              from './_lib/supabase.js';
import { notifyNewContact }          from './_lib/contact-notification.js';

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

  // ── Supabase write ────────────────────────────────────────────────────────
  let record;
  try {
    record = await createRecord('contacts', {
      name,
      email,
      phone,
      company,
      marketing_challenges,
      preferred_contact,
      message,
    });
  } catch (supabaseErr) {
    console.error('[contact] Supabase write failed:', supabaseErr?.message ?? supabaseErr);
    return res.status(502).json({ error: 'Failed to save your message. Please try again.' });
  }

  // These integrations are best-effort; saving the contact is the primary operation.
  const createdAt = record.created_at;
  const sheetWrite = appendToSheet(SHEET_TABS.CONTACTS, [
    createdAt,
    name,
    email,
    phone,
    company || '',
    marketing_challenges,
    preferred_contact,
    message,
  ]);
  const notification = notifyNewContact({
    id: record.id,
    name,
    email,
    phone,
    company,
    marketing_challenges,
    preferred_contact,
    message,
    created_at: createdAt,
  });
  await Promise.all([sheetWrite, notification]);

  return res.status(201).json({ ok: true, id: record.id });
}
