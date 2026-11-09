import express from 'express';
import logger from '../utils/logger.js';
import { createRecord } from '../../../../api/_lib/supabase.js';
import { notifyNewContact } from '../../../../api/_lib/contact-notification.js';
import { appendToSheet, SHEET_TABS } from '../../../../api/_lib/sheets.js';

const router = express.Router();

const asTrimmedString = (value) => (typeof value === 'string' ? value.trim() : '');

// POST /contacts - Create a new contact
// `company` and `preferred_contact` are optional (matching the contact form and the database schema).
router.post('/', async (req, res) => {
  const body = req.body ?? {};

  const name = asTrimmedString(body.name);
  const email = asTrimmedString(body.email);
  const phone = asTrimmedString(body.phone);
  const company = asTrimmedString(body.company);
  const marketing_challenges = asTrimmedString(body.marketing_challenges);
  const preferred_contact = asTrimmedString(body.preferred_contact) || 'Email';
  const message = asTrimmedString(body.message);

  const requiredFields = { name, email, phone, marketing_challenges, message };

  for (const [field, value] of Object.entries(requiredFields)) {
    if (!value) {
      return res.status(400).json({
        error: `Missing or empty required field: ${field}`,
      });
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  if (phone.length < 7) {
    return res.status(400).json({ error: 'Phone number too short' });
  }

  if (message.length < 10) {
    return res.status(400).json({ error: 'Message too short' });
  }

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
  } catch (error) {
    logger.error('Supabase contact write failed:', error?.message ?? error);
    return res.status(502).json({ error: 'Failed to save your message. Please try again.' });
  }

  logger.info(`Contact created: ${record.id}`);

  const createdAt = record.created_at;
  await Promise.all([
    appendToSheet(SHEET_TABS.CONTACTS, [
      createdAt,
      name,
      email,
      phone,
      company,
      marketing_challenges,
      preferred_contact,
      message,
    ]),
    notifyNewContact({
      id: record.id,
      name,
      email,
      phone,
      company,
      marketing_challenges,
      preferred_contact,
      message,
      created_at: createdAt,
    }),
  ]);

  res.status(201).json({ id: record.id });
});

// Contact records contain personal information; never expose a public list endpoint.

export default router;
