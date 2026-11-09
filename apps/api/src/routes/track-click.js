import express from 'express';
import logger from '../utils/logger.js';
import { createRecord } from '../../../../api/_lib/supabase.js';
import { appendToSheet, SHEET_TABS } from '../../../../api/_lib/sheets.js';

const router = express.Router();
const asTrimmedString = (value) => (typeof value === 'string' ? value.trim() : '');

router.post('/', async (req, res) => {
  const body = req.body ?? {};
  const page = asTrimmedString(body.page) || 'unknown';
  const service = asTrimmedString(body.service);
  const source = asTrimmedString(body.source) || 'unknown';

  try {
    const record = await createRecord('whatsapp_clicks', { page, service, source });
    await appendToSheet(SHEET_TABS.WA_CLICKS, [
      record.created_at,
      page,
      service,
      source,
    ]);
  } catch (error) {
    logger.error('Supabase click write failed:', error?.message ?? error);
    return res.status(502).json({ error: 'Failed to record click' });
  }

  return res.status(200).json({ ok: true });
});

export default router;
